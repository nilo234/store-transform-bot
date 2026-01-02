import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StickyAddToCartProps {
  productTitle: string;
  price: number;
  originalPrice: number;
  onAddToCart: (quantity: number) => void;
  isSubscription?: boolean;
}

export function StickyAddToCart({
  productTitle,
  price,
  originalPrice,
  onAddToCart,
  isSubscription = false,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past hero (approx 600px)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const savings = originalPrice - price;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl"
        >
          <div className="container-wide py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Product Info */}
              <div className="hidden sm:block flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{productTitle}</h4>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">${price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
                    SAVE ${savings.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Mobile Price */}
              <div className="sm:hidden">
                <span className="font-bold text-lg text-primary">${price.toFixed(2)}</span>
              </div>

              {/* Quantity & Add Button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-muted rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button 
                  onClick={() => onAddToCart(quantity)}
                  className="btn-primary gap-2 h-11 px-6"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {isSubscription ? 'Subscribe' : 'Add to Cart'}
                  </span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
