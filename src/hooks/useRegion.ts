import { useCallback } from 'react';
import { formatPrice as formatPriceLib, type RegionCode } from '@/lib/region';

/**
 * US-only region hook. GBP/UK support removed — kept as a thin wrapper
 * so existing components (`isUK`, `formatPrice`) continue to compile.
 */
export function useRegion() {
  const formatPrice = useCallback(
    (amount: number | string, opts?: { minimumFractionDigits?: number }) =>
      formatPriceLib(amount, opts),
    []
  );

  return {
    region: 'US' as RegionCode,
    currency: 'USD' as const,
    symbol: '$',
    isUK: false,
    isUS: true,
    formatPrice,
  };
}
