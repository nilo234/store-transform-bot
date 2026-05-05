// US-only region module. GBP/UK support has been removed.
// All exports are kept for backwards compatibility with existing imports.

export type RegionCode = 'US';
export type CurrencyCode = 'USD';

interface RegionConfig {
  country: RegionCode;
  currency: CurrencyCode;
  symbol: string;
  locale: string;
}

const US_CONFIG: RegionConfig = {
  country: 'US',
  currency: 'USD',
  symbol: '$',
  locale: 'en-US',
};

export const USD_TO_GBP = 1; // legacy export — no longer used

export function getRegion(): RegionCode {
  return 'US';
}

export function setRegion(_region: RegionCode): void {
  // no-op — only US is supported
}

export async function autoDetectRegionFromIP(): Promise<void> {
  // no-op — region detection removed
}

export function getRegionConfig(_region?: RegionCode): RegionConfig {
  return US_CONFIG;
}

export function getCurrency(): CurrencyCode {
  return 'USD';
}

export function getCurrencySymbol(): string {
  return '$';
}

export function formatPrice(
  amount: number | string,
  opts?: { region?: RegionCode; minimumFractionDigits?: number; sourceCurrency?: CurrencyCode }
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (!Number.isFinite(num)) return '$0.00';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: opts?.minimumFractionDigits ?? 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `$${num.toFixed(2)}`;
  }
}

export function formatShopifyMoney(amount: string | number, _currencyCode?: string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (!Number.isFinite(num)) return '$0.00';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `$${num.toFixed(2)}`;
  }
}
