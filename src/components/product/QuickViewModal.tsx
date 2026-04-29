import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, X, Star, Truck, Shield, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShopifyProduct, sanitizeTitle, sanitizeHandle } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { formatShopifyMoney } from '@/lib/region';

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({ product, open, onOpenChange }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const currencyCode = product.node.priceRange.minVariantPrice.currencyCode;
  const originalPrice = 49.99;
  const savings = originalPrice - price;
  const fmt = (n: number) => formatShopifyMoney(n, currencyCode);
  const images = product.node.images.edges;
  const firstVariant = product.node.variants.edges[0]?.node;

  const handleAddToCart = () => {
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success('Added to Cart!', {
      description: `${quantity}x ${sanitizeTitle(product.node.title)}`,
      position: 'top-center',
    });

    onOpenChange(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{sanitizeTitle(product.node.title)}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-b from-muted/50 to-card">
            {/* Sale Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1.5 rounded-full">
                SAVE {fmt(savings)}
              </span>
            </div>

            {/* Servings Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
                <span className="text-xl font-bold text-foreground">x30</span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Strips</p>
              </div>
            </div>

            {images[0] ? (
              <img
                src={images[0].node.url}
                alt={images[0].node.altText || product.node.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-8xl">💊</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9 (127 reviews)</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-2xl mb-2" style={{ letterSpacing: '-0.02em' }}>{sanitizeTitle(product.node.title)}</h2>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {product.node.description}
            </p>

            {/* Price Block */}
            <div className="bg-muted/30 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-primary">{fmt(price)}</span>
                <span className="text-lg text-muted-foreground line-through">{fmt(originalPrice)}</span>
              </div>
              <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                SAVE {fmt(savings)}
              </span>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap gap-3 mb-4">
              {[
                { icon: Truck, text: 'Free Shipping on $50+' },
                { icon: Shield, text: '14-Day Guarantee' },
                { icon: Check, text: 'Lab Tested' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <item.icon className="h-3.5 w-3.5 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary gap-2 h-12"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              {/* View Full Details */}
              <Link
                to={`/product/${sanitizeHandle(product.node.handle)}`}
                onClick={() => onOpenChange(false)}
                className="block text-center text-sm text-primary hover:underline font-medium"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
