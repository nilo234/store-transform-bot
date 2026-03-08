import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct, optimizeShopifyImage } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

export function CartUpsell() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { items, addItem } = useCartStore();

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts(8);
      setProducts(data);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  // Filter out products already in cart
  const cartVariantIds = items.map(item => item.variantId);
  const upsellProducts = products.filter(product => {
    const firstVariant = product.node.variants?.edges?.[0]?.node;
    return firstVariant && !cartVariantIds.includes(firstVariant.id);
  }).slice(0, 3);

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

    toast.success(`${product.node.title} added to cart!`, {
      position: 'top-center',
    });
  };

  if (isLoading || upsellProducts.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <h4 className="text-sm font-semibold text-foreground mb-3">
        Customers Also Bought
      </h4>
      <div className="space-y-3">
        {upsellProducts.map((product) => {
          const price = parseFloat(product.node.priceRange?.minVariantPrice?.amount || '0');
          const originalPrice = 49.99;
          const image = product.node.images?.edges?.[0]?.node;

          return (
            <div
              key={product.node.id}
              className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg"
            >
              <div className="w-12 h-12 bg-background rounded-md overflow-hidden flex-shrink-0">
                {image && (
                  <img
                    src={optimizeShopifyImage(image.url, 100)}
                    alt={image.altText || product.node.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.node.title}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-primary">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 flex-shrink-0"
                onClick={() => handleQuickAdd(product)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
