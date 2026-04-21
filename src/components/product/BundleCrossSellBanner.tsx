import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { bundles } from '@/data/bundles';

interface Props {
  /** Current product's Shopify variant ID (gid://shopify/ProductVariant/...) */
  currentVariantId?: string;
}

/**
 * Suggests the best bundle that contains the current product.
 * "Better Together — Save up to 20%" pattern to lift AOV on every PDP.
 */
export function BundleCrossSellBanner({ currentVariantId }: Props) {
  // Find the bundle that includes this product AND has the highest savings.
  const matchingBundles = bundles.filter(b =>
    currentVariantId ? b.variantIds.includes(currentVariantId) : true
  );

  // Prefer a 2–4 pack as the "starter" cross-sell (less commitment than 6-pack).
  const best =
    matchingBundles.find(b => b.products.length >= 2 && b.products.length <= 4) ||
    matchingBundles[0] ||
    bundles[0];

  if (!best) return null;

  return (
    <Link
      to="/bundles"
      className="block rounded-xl border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 p-4 hover:border-primary/60 hover:shadow-soft transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold tracking-wide uppercase text-primary mb-0.5">
            Better Together — Save {best.discountPercent}%
          </p>
          <p className="text-sm font-medium text-foreground truncate">
            Get this in the {best.name} ({best.packSize}) for ${best.salePrice.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            Save ${best.savings.toFixed(2)} vs buying separately
          </p>
        </div>
        <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
