// Region & currency detection for US / UK markets
// Lightweight client-side detection — no external API calls.

export type RegionCode = 'US' | 'GB';
export type CurrencyCode = 'USD' | 'GBP';

interface RegionConfig {
  country: RegionCode;
  currency: CurrencyCode;
  symbol: string;
  locale: string;
}

const CONFIG: Record<RegionCode, RegionConfig> = {
  US: { country: 'US', currency: 'USD', symbol: '$', locale: 'en-US' },
  GB: { country: 'GB', currency: 'GBP', symbol: '£', locale: 'en-GB' },
};

// Static USD → GBP conversion rate. All hardcoded prices in the app are
// authored in USD; when the active region is GB we convert them at display time.
// Keep this conservative and easy to update.
export const USD_TO_GBP = 0.79;

function convertUsdToGbp(amountUsd: number): number {
  // Round to nearest .X9 for retail-friendly pricing (e.g. 34.99 → 27.99)
  const raw = amountUsd * USD_TO_GBP;
  const rounded = Math.round(raw) - 0.01;
  return rounded > 0 ? rounded : Math.round(raw * 100) / 100;
}

const STORAGE_KEY = 'neuvie-region';

// Conservative UK detection: timezone OR explicit en-GB locale
function detectFromBrowser(): RegionCode {
  if (typeof window === 'undefined') return 'US';

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz === 'Europe/London' || tz === 'Europe/Belfast' || tz === 'Europe/Jersey' || tz === 'Europe/Guernsey' || tz === 'Europe/Isle_of_Man') {
      return 'GB';
    }

    const langs = (navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language || 'en-US']);
    for (const lang of langs) {
      const lower = lang.toLowerCase();
      if (lower === 'en-gb' || lower.startsWith('en-gb-')) return 'GB';
    }
  } catch {
    // ignore
  }

  return 'US';
}

let cached: RegionCode | null = null;

export function getRegion(): RegionCode {
  if (cached) return cached;

  if (typeof window !== 'undefined') {
    try {
      const override = window.localStorage.getItem(STORAGE_KEY);
      if (override === 'US' || override === 'GB') {
        cached = override;
        return cached;
      }
    } catch {
      // ignore
    }
  }

  cached = detectFromBrowser();
  return cached;
}

export function setRegion(region: RegionCode): void {
  cached = region;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, region);
    } catch {
      // ignore
    }
    // Force a refresh so Shopify queries re-fetch in the new currency context
    window.dispatchEvent(new CustomEvent('neuvie:region-change', { detail: region }));
  }
}

export function getRegionConfig(region?: RegionCode): RegionConfig {
  return CONFIG[region ?? getRegion()];
}

export function getCurrency(): CurrencyCode {
  return getRegionConfig().currency;
}

export function getCurrencySymbol(): string {
  return getRegionConfig().symbol;
}

// Format a numeric price using the active region's currency.
// Use this everywhere instead of hardcoding "$" in the UI.
export function formatPrice(amount: number | string, opts?: { region?: RegionCode; minimumFractionDigits?: number }): string {
  const cfg = getRegionConfig(opts?.region);
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (!Number.isFinite(num)) return `${cfg.symbol}0.00`;
  try {
    return new Intl.NumberFormat(cfg.locale, {
      style: 'currency',
      currency: cfg.currency,
      minimumFractionDigits: opts?.minimumFractionDigits ?? 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `${cfg.symbol}${num.toFixed(2)}`;
  }
}

// Format a price coming from Shopify (already in the correct currency).
export function formatShopifyMoney(amount: string | number, currencyCode?: string): string {
  const cfg = currencyCode === 'GBP'
    ? CONFIG.GB
    : currencyCode === 'USD'
      ? CONFIG.US
      : getRegionConfig();
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (!Number.isFinite(num)) return `${cfg.symbol}0.00`;
  try {
    return new Intl.NumberFormat(cfg.locale, {
      style: 'currency',
      currency: cfg.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `${cfg.symbol}${num.toFixed(2)}`;
  }
}
