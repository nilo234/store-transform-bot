import { useEffect, useState, useCallback } from 'react';
import { getRegion, getRegionConfig, formatPrice as formatPriceLib, type RegionCode } from '@/lib/region';

/**
 * Reactive region hook. Re-renders when the user switches region
 * (via RegionSwitcher → window 'neuvie:region-change' event).
 */
export function useRegion() {
  const [region, setRegionState] = useState<RegionCode>(() => getRegion());

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as RegionCode | undefined;
      setRegionState(detail ?? getRegion());
    };
    window.addEventListener('neuvie:region-change', handler);
    return () => window.removeEventListener('neuvie:region-change', handler);
  }, []);

  const cfg = getRegionConfig(region);

  const formatPrice = useCallback(
    (amount: number | string, opts?: { minimumFractionDigits?: number }) =>
      formatPriceLib(amount, { region, ...opts }),
    [region]
  );

  return {
    region,
    currency: cfg.currency,
    symbol: cfg.symbol,
    isUK: region === 'GB',
    isUS: region === 'US',
    formatPrice,
  };
}
