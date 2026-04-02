import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const setCartOpen = useCartStore((s) => s.setOpen);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetchProducts(1).then((p) => {
      if (p.length > 0) setProduct(p[0]);
    });
  }, []);

  if (!visible || !product) return null;

  const variant = product.node.variants.edges[0]?.node;
  if (!variant) return null;

  const price = parseFloat(variant.price.amount);
  const compareAt = (product.node as any).compareAtPriceRange?.maxVariantPrice
    ? parseFloat((product.node as any).compareAtPriceRange.maxVariantPrice.amount)
    : null;

  const handleBuy = async () => {
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    setCartOpen(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary text-primary-foreground shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate opacity-80">
            {product.node.title}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold">${price.toFixed(2)}</span>
            {compareAt && compareAt > price && (
              <span className="text-xs line-through opacity-60">
                ${compareAt.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <Button
          onClick={handleBuy}
          disabled={isLoading}
          className="flex-shrink-0 h-10 px-5 text-sm font-bold rounded-lg"
          style={{ background: '#FF4D6D', color: '#fff' }}
        >
          <ShoppingCart className="h-4 w-4 mr-1.5" />
          Jetzt kaufen
        </Button>
      </div>
    </div>
  );
}
