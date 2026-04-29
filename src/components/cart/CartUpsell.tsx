import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct, optimizeShopifyImage, sanitizeTitle } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { useRegion } from '@/hooks/useRegion';

// Category mapping for smart recommendations
const PRODUCT_CATEGORIES: Record<string, string[]> = {
  performance: ['energy', 'mushroom', 'focus', 'caffeine', 'cognitive'],
  beauty: ['beauty', 'collagen', 'hair', 'skin', 'nails', 'glow'],
  sleep: ['sleep', 'melatonin', 'relax', 'calm', 'cognitive relax'],
  wellness: ['probiotic', 'digestive', 'gut', 'iron', 'bone', 'appetite', 'immune'],
  recovery: ['hangover', 'recovery', 'libido'],
};

// Complementary categories: if user has X, suggest Y
const COMPLEMENTARY: Record<string, string[]> = {
  performance: ['sleep', 'wellness', 'recovery'],
  beauty: ['wellness', 'sleep'],
  sleep: ['performance', 'beauty', 'wellness'],
  wellness: ['beauty', 'performance'],
  recovery: ['performance', 'wellness', 'sleep'],
};

function detectCategory(title: string): string {
  const lower = title.toLowerCase();
  for (const [category, keywords] of Object.entries(PRODUCT_CATEGORIES)) {
    if (keywords.some(kw => lower.includes(kw))) return category;
  }
  return 'wellness';
}

function getComplementaryCategories(cartCategories: string[]): string[] {
  const seen = new Set<string>();
  for (const cat of cartCategories) {
    const complements = COMPLEMENTARY[cat] || [];
    for (const c of complements) {
      if (!cartCategories.includes(c)) seen.add(c);
    }
  }
  return Array.from(seen);
}

function scoreProduct(product: ShopifyProduct, complementaryCategories: string[]): number {
  const category = detectCategory(product.node.title);
  return complementaryCategories.indexOf(category) !== -1
    ? 10 - complementaryCategories.indexOf(category)
    : 0;
}

export function CartUpsell() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { items, addItem } = useCartStore();
  const { formatPrice } = useRegion();

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts(20);
      setProducts(data);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  const upsellProducts = useMemo(() => {
    if (products.length === 0 || items.length === 0) return [];

    // Detect what categories are already in the cart
    const cartCategories = items.map(item => detectCategory(item.product.node.title));
    const uniqueCartCategories = [...new Set(cartCategories)];
    const complementary = getComplementaryCategories(uniqueCartCategories);

    // Filter out products already in cart and bundle products
    const cartVariantIds = new Set(items.map(item => item.variantId));
    const available = products.filter(product => {
      const firstVariant = product.node.variants?.edges?.[0]?.node;
      if (!firstVariant || cartVariantIds.has(firstVariant.id)) return false;
      // Filter out bundle products (they have "pack" or "bundle" in title usually)
      const title = product.node.title.toLowerCase();
      if (title.includes('bundle') || title.includes('pack')) return false;
      return true;
    });

    // Score and sort by complementary relevance
    const scored = available.map(p => ({
      product: p,
      score: scoreProduct(p, complementary),
    }));
    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, 3).map(s => s.product);
  }, [products, items]);

  const handleQuickAdd = async (product: ShopifyProduct) => {
    const variant = product.node.variants?.edges?.[0]?.node;
    if (!variant) return;

    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success(`${sanitizeTitle(product.node.title)} added!`, {
      position: 'top-center',
    });
  };

  if (isLoading || upsellProducts.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <h4 className="text-sm font-semibold text-foreground mb-3">
        Complete Your Routine
      </h4>
      <div className="space-y-2.5">
        {upsellProducts.map((product) => {
          const price = parseFloat(product.node.priceRange?.minVariantPrice?.amount || '0');
          const image = product.node.images?.edges?.[0]?.node;

          return (
            <div
              key={product.node.id}
              className="flex items-center gap-3 p-2.5 bg-muted/50 rounded-xl border border-border/30"
            >
              <div className="w-12 h-12 bg-background rounded-lg overflow-hidden flex-shrink-0">
                {image && (
                  <img
                    src={optimizeShopifyImage(image.url, 100)}
                    alt={image.altText || product.node.title}
                    className="w-full h-full object-contain p-0.5"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{sanitizeTitle(product.node.title)}</p>
                <span className="text-sm font-semibold text-primary">
                  {formatPrice(price)}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 flex-shrink-0 text-xs font-medium"
                onClick={() => handleQuickAdd(product)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
