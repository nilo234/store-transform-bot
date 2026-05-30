import { useState, useMemo } from 'react';
import { Plus, Check, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, type CartItem } from '@/stores/cartStore';
import { useRegion } from '@/hooks/useRegion';
import { toast } from 'sonner';
import { shopifyVariants, productInfo } from '@/data/bundles';

interface FrequentlyBoughtTogetherProps {
  currentVariantId: string;
  currentTitle: string;
  currentPrice: number;
  currentImage: string;
}

// Curated pairs — best-selling complementary combos
const FBT_PAIRS: Record<string, string[]> = {
  [shopifyVariants.energy]: [shopifyVariants.sleep, shopifyVariants.hangover],
  [shopifyVariants.sleep]: [shopifyVariants.cognitiveRelax, shopifyVariants.energy],
  [shopifyVariants.hangover]: [shopifyVariants.energy, shopifyVariants.digestive],
  [shopifyVariants.beautyCollagen]: [shopifyVariants.hairSkinNails, shopifyVariants.probiotic],
  [shopifyVariants.hairSkinNails]: [shopifyVariants.beautyCollagen, shopifyVariants.probiotic],
  [shopifyVariants.probiotic]: [shopifyVariants.digestive, shopifyVariants.beautyCollagen],
  [shopifyVariants.digestive]: [shopifyVariants.probiotic, shopifyVariants.appetite],
  [shopifyVariants.mushroomFocus]: [shopifyVariants.energy, shopifyVariants.cognitiveRelax],
  [shopifyVariants.cognitiveRelax]: [shopifyVariants.sleep, shopifyVariants.mushroomFocus],
  [shopifyVariants.libidoSupport]: [shopifyVariants.energy, shopifyVariants.hairSkinNails],
  [shopifyVariants.iron]: [shopifyVariants.energy, shopifyVariants.beautyCollagen],
  [shopifyVariants.boneSupport]: [shopifyVariants.beautyCollagen, shopifyVariants.iron],
  [shopifyVariants.appetite]: [shopifyVariants.digestive, shopifyVariants.energy],
};

const FALLBACK_PAIR = [shopifyVariants.energy, shopifyVariants.sleep];
const BUNDLE_DISCOUNT = 0.15; // 15% off when buying all three

export function FrequentlyBoughtTogether({
  currentVariantId,
  currentTitle,
  currentPrice,
  currentImage,
}: FrequentlyBoughtTogetherProps) {
  const { formatPrice } = useRegion();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [adding, setAdding] = useState(false);

  const pairIds = useMemo(() => {
    const pair = FBT_PAIRS[currentVariantId] ?? FALLBACK_PAIR;
    return pair.filter((id) => id !== currentVariantId).slice(0, 2);
  }, [currentVariantId]);

  // Default: all three checked
  useMemo(() => {
    setSelected({
      __current: true,
      ...Object.fromEntries(pairIds.map((id) => [id, true])),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVariantId]);

  if (pairIds.length < 2) return null;

  const items = [
    { id: '__current', variantId: currentVariantId, title: currentTitle, price: currentPrice, image: currentImage },
    ...pairIds.map((vid) => ({
      id: vid,
      variantId: vid,
      title: productInfo[vid]?.title ?? 'Wellness Strip',
      price: parseFloat(productInfo[vid]?.price ?? '29.99'),
      image: currentImage, // shared luxury placeholder; PDP image is consistent on-brand
    })),
  ];

  const selectedItems = items.filter((it) => selected[it.id]);
  const subtotal = selectedItems.reduce((s, it) => s + it.price, 0);
  const bundlePrice = selectedItems.length === 3 ? subtotal * (1 - BUNDLE_DISCOUNT) : subtotal;
  const savings = subtotal - bundlePrice;

  const handleAdd = async () => {
    if (selectedItems.length === 0) return;
    setAdding(true);
    try {
      for (const it of selectedItems) {
        await addItem({
          product: {
            node: {
              id: `fbt-${it.variantId}`,
              title: it.title,
              description: '',
              handle: '',
              priceRange: { minVariantPrice: { amount: it.price.toString(), currencyCode: 'USD' } },
              images: { edges: [{ node: { url: it.image, altText: it.title } }] },
              variants: { edges: [] },
              options: [],
            },
          },
          variantId: it.variantId,
          variantTitle: 'Default',
          price: { amount: it.price.toString(), currencyCode: 'USD' },
          quantity: 1,
          selectedOptions: [],
        });
      }
      toast.success(`${selectedItems.length} items added to cart`);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
          Frequently bought together
        </h2>
        <p className="text-muted-foreground mb-6">
          Customers who chose this strip also love these — save 15% when you grab all three.
        </p>

        <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6">
            {items.map((it, idx) => (
              <div key={it.id} className="flex items-center gap-3 md:gap-4">
                <label className="relative cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!selected[it.id]}
                    onChange={(e) => setSelected((s) => ({ ...s, [it.id]: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-background border-2 border-border peer-checked:border-primary overflow-hidden transition-all">
                    <img
                      src={it.image}
                      alt={it.title}
                      loading="lazy"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-border peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-all">
                    {selected[it.id] && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                  </div>
                  <p className="mt-2 text-xs md:text-sm font-medium text-foreground line-clamp-2 max-w-[7rem] text-center">
                    {it.title.replace(/ Strips?$/i, '')}
                  </p>
                  <p className="text-xs text-muted-foreground text-center">{formatPrice(it.price)}</p>
                </label>
                {idx < items.length - 1 && (
                  <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            <div className="text-center md:text-left">
              {savings > 0 && (
                <p className="text-sm text-muted-foreground line-through">{formatPrice(subtotal)}</p>
              )}
              <p className="font-display text-2xl text-foreground">
                {formatPrice(bundlePrice)}
                {savings > 0 && (
                  <span className="ml-2 text-sm font-sans text-accent font-semibold">
                    Save {formatPrice(savings)}
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Free US shipping on orders $50+
              </p>
            </div>
            <Button
              onClick={handleAdd}
              disabled={adding || isLoading || selectedItems.length === 0}
              size="lg"
              className="btn-primary min-w-[12rem]"
            >
              {adding || isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add {selectedItems.length} to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
