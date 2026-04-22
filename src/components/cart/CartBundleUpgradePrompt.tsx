import { useMemo } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { bundles, productInfo } from '@/data/bundles';
import { toast } from 'sonner';

/**
 * Cart Drawer Upgrade Prompt:
 * If the user has only single (non-bundle) items, surface the best matching
 * bundle as a one-click upgrade. Pure AOV play — directly inspired by the
 * first $146 bundle order behavior.
 */
export function CartBundleUpgradePrompt() {
  const items = useCartStore((s) => s.items);
  const addBundle = useCartStore((s) => s.addBundle);
  const isLoading = useCartStore((s) => s.isLoading);

  const standaloneVariantIds = useMemo(
    () => items.filter((i) => !i.bundleId).map((i) => i.variantId),
    [items]
  );

  // Find the bundle that contains the most cart items (best message-match)
  const bestBundle = useMemo(() => {
    if (standaloneVariantIds.length === 0) return null;

    const scored = bundles
      .map((b) => {
        const overlap = b.variantIds.filter((v) => standaloneVariantIds.includes(v)).length;
        return { bundle: b, overlap };
      })
      .filter((s) => s.overlap > 0)
      .sort((a, b) => {
        // Prefer highest overlap, then highest savings
        if (b.overlap !== a.overlap) return b.overlap - a.overlap;
        return b.bundle.savings - a.bundle.savings;
      });

    return scored[0]?.bundle ?? null;
  }, [standaloneVariantIds]);

  // Hide if cart already has a bundle, or no upgrade-bundle exists
  const hasBundle = items.some((i) => i.bundleId);
  if (hasBundle || !bestBundle || standaloneVariantIds.length === 0) return null;

  // Build a synthetic CartItem[] for addBundle — re-uses an existing cart item's
  // product object as a placeholder when we don't have the full Shopify product.
  const handleUpgrade = async () => {
    const placeholderProduct = items[0]?.product;
    if (!placeholderProduct) return;

    const bundleItems: Omit<CartItem, 'lineId'>[] = bestBundle.variantIds.map((vid) => {
      const info = productInfo[vid] ?? { title: 'NEUVIE Strip', price: '34.99' };
      return {
        product: placeholderProduct,
        variantId: vid,
        variantTitle: info.title,
        price: { amount: info.price, currencyCode: 'USD' },
        quantity: 1,
        selectedOptions: [],
        bundleId: bestBundle.id,
        bundleName: bestBundle.name,
        bundleDiscountCode: bestBundle.discountCode,
      };
    });

    await addBundle(bundleItems, bestBundle.discountCode);
    toast.success('Upgraded to bundle!', {
      description: `${bestBundle.name} added · Save $${bestBundle.savings.toFixed(2)}`,
      position: 'top-center',
    });
  };

  return (
    <div className="mt-4 rounded-xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-primary/5 to-background p-3 md:p-4">
      <div className="flex items-start gap-2.5 mb-2.5">
        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-4 w-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
            Upgrade & Save {bestBundle.discountPercent}%
          </p>
          <p className="text-sm font-semibold text-foreground leading-tight mt-0.5">
            Make it a routine: {bestBundle.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add {bestBundle.products.length} strips for ${bestBundle.salePrice.toFixed(2)} ·
            Save ${bestBundle.savings.toFixed(2)} vs. buying separately
          </p>
        </div>
      </div>
      <Button
        onClick={handleUpgrade}
        disabled={isLoading}
        size="sm"
        className="w-full h-10 text-xs md:text-sm font-semibold bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5"
      >
        Add {bestBundle.packSize} Bundle to Cart
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
