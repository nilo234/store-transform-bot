import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { bundles, productInfo, Bundle } from '@/data/bundles';
import { toast } from 'sonner';

/**
 * Cart Drawer Upgrade Prompt:
 * Surfaces up to 2 bundle suggestions matched to the SPECIFIC products in the cart.
 *
 * Matching logic (in priority order):
 *  1. Bundle must contain at least one cart product (direct match)
 *  2. Prefer highest overlap (most cart items already in the bundle)
 *  3. Then prefer the smallest pack size (lowest friction upgrade)
 *  4. Then highest absolute savings
 */
export function CartBundleUpgradePrompt() {
  const items = useCartStore((s) => s.items);
  const addBundle = useCartStore((s) => s.addBundle);
  const isLoading = useCartStore((s) => s.isLoading);

  const standaloneVariantIds = useMemo(
    () => items.filter((i) => !i.bundleId).map((i) => i.variantId),
    [items]
  );

  const matchedBundles = useMemo<Bundle[]>(() => {
    if (standaloneVariantIds.length === 0) return [];

    const scored = bundles
      .map((b) => {
        const overlap = b.variantIds.filter((v) => standaloneVariantIds.includes(v)).length;
        return { bundle: b, overlap, packCount: b.variantIds.length };
      })
      .filter((s) => s.overlap > 0)
      .sort((a, b) => {
        if (b.overlap !== a.overlap) return b.overlap - a.overlap;
        // smaller bundle = lower friction upgrade
        if (a.packCount !== b.packCount) return a.packCount - b.packCount;
        return b.bundle.savings - a.bundle.savings;
      });

    // Show top 2 — primary upgrade + a "go bigger" option
    return scored.slice(0, 2).map((s) => s.bundle);
  }, [standaloneVariantIds]);

  // Hide if cart already has a bundle, or no upgrade-bundle exists
  const hasBundle = items.some((i) => i.bundleId);
  if (hasBundle || matchedBundles.length === 0) return null;

  const handleUpgrade = async (bundle: Bundle) => {
    const placeholderProduct = items[0]?.product;
    if (!placeholderProduct) return;

    const bundleItems: Omit<CartItem, 'lineId'>[] = bundle.variantIds.map((vid) => {
      const info = productInfo[vid] ?? { title: 'NEUVIE Strip', price: '29.99' };
      return {
        product: placeholderProduct,
        variantId: vid,
        variantTitle: info.title,
        price: { amount: info.price, currencyCode: 'USD' },
        quantity: 1,
        selectedOptions: [],
        bundleId: bundle.id,
        bundleName: bundle.name,
        bundleDiscountCode: bundle.discountCode,
      };
    });

    await addBundle(bundleItems, bundle.discountCode);
    toast.success('Upgraded to bundle!', {
      description: `${bundle.name} added · Save $${bundle.savings.toFixed(2)}`,
      position: 'top-center',
    });
  };

  const primary = matchedBundles[0];
  const secondary = matchedBundles[1];

  // Build human-readable match reason from cart products
  const matchedProductNames = primary.variantIds
    .filter((v) => standaloneVariantIds.includes(v))
    .map((v) => productInfo[v]?.title.replace(' Strips', '') ?? '')
    .filter(Boolean);

  const matchReason =
    matchedProductNames.length > 0
      ? `Pairs perfectly with your ${matchedProductNames.slice(0, 2).join(' & ')}`
      : `Designed around what's in your cart`;

  return (
    <div className="mt-4 space-y-3">
      {/* Primary suggestion — full card */}
      <div className="rounded-xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-primary/5 to-background p-3 md:p-4">
        <div className="flex items-start gap-2.5 mb-2.5">
          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
              Upgrade & Save {primary.discountPercent}%
            </p>
            <p className="text-sm font-semibold text-foreground leading-tight mt-0.5">
              {primary.name}
            </p>
            <p className="text-[11px] text-accent/90 italic mt-0.5">{matchReason}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {primary.products.join(' + ')}
            </p>
            <p className="text-xs text-foreground mt-1">
              <span className="font-semibold">${primary.salePrice.toFixed(2)}</span>
              <span className="text-muted-foreground line-through ml-1.5">
                ${primary.originalPrice.toFixed(2)}
              </span>
              <span className="text-accent font-semibold ml-1.5">
                Save ${primary.savings.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleUpgrade(primary)}
            disabled={isLoading}
            size="sm"
            className="flex-1 h-10 text-xs md:text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5"
          >
            Add {primary.packSize} Bundle
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
          <Button asChild variant="outline" size="sm" className="h-10 px-3 text-xs">
            <Link to={`/bundles/${primary.id}`}>View</Link>
          </Button>
        </div>
      </div>

      {/* Secondary suggestion — compact row */}
      {secondary && (
        <button
          onClick={() => handleUpgrade(secondary)}
          disabled={isLoading}
          className="w-full text-left rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:bg-muted/40 transition-colors p-3 flex items-center gap-3 group disabled:opacity-50"
        >
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Package className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Or go bigger · Save {secondary.discountPercent}%
            </p>
            <p className="text-sm font-semibold text-foreground leading-tight truncate">
              {secondary.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {secondary.packSize} · ${secondary.salePrice.toFixed(2)} · Save ${secondary.savings.toFixed(2)}
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
        </button>
      )}
    </div>
  );
}
