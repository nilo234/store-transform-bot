import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhyNowMicroCopy } from '@/components/product/WhyNowMicroCopy';
import { useRegion } from '@/hooks/useRegion';

interface StickyAddToCartProps {
  productTitle: string;
  price: number;
  originalPrice: number;
  onAddToCart: () => void;
  isSubscription?: boolean;
  /** Ref to the original Add to Cart button to observe */
  addToCartRef?: React.RefObject<HTMLElement>;
  /** Number of strips per pack — used to compute per-strip cost. Defaults to 30. */
  stripsPerPack?: number;
}

export function StickyAddToCart({
  productTitle,
  price,
  originalPrice,
  onAddToCart,
  isSubscription = false,
  addToCartRef,
  stripsPerPack = 30,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    
    const observers: IntersectionObserver[] = [];

    // Observe original Add to Cart button
    if (addToCartRef?.current) {
      const buttonObserver = new IntersectionObserver(
        ([entry]) => {
          // Show sticky when original button is NOT visible
          setIsVisible(!entry.isIntersecting);
        },
        { threshold: 0 }
      );
      buttonObserver.observe(addToCartRef.current);
      observers.push(buttonObserver);
    } else {
      // Fallback to scroll position
      const handleScroll = () => setIsVisible(window.scrollY > 600);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Hide when footer is visible
    if (footer) {
      const footerObserver = new IntersectionObserver(
        ([entry]) => setFooterVisible(entry.isIntersecting),
        { threshold: 0 }
      );
      footerObserver.observe(footer);
      observers.push(footerObserver);
    }

    return () => observers.forEach(o => o.disconnect());
  }, [addToCartRef]);

  const show = isVisible && !footerVisible;
  const { formatPrice, symbol } = useRegion();

  // Per-strip cost in minor units — e.g. $29.99 / 30 strips
  const perStripCents = stripsPerPack > 0 ? Math.round((price / stripsPerPack) * 100) : 0;
  const perStripLabel = perStripCents > 0
    ? (perStripCents >= 100
        ? `${formatPrice(perStripCents / 100)}/strip`
        : `${perStripCents}¢/strip`)
    : null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom)]"
        >
          <div className="container-wide py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Product Info - Desktop */}
              <div className="hidden sm:block flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{productTitle}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-primary">{formatPrice(price)}</span>
                  {originalPrice > price && (
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
                  )}
                  {perStripLabel && (
                    <span className="text-xs font-semibold text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
                      {perStripLabel}
                    </span>
                  )}
                  <span className="text-xs font-medium text-muted-foreground">
                    {isSubscription ? '(Subscribe & Save)' : '(One-Time)'}
                  </span>
                </div>
              </div>

              {/* Mobile Price */}
              <div className="sm:hidden flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-bold text-lg text-primary leading-none">{formatPrice(price)}</span>
                  {perStripLabel && (
                    <span className="text-[11px] font-semibold text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap">
                      {perStripLabel}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {isSubscription ? 'Subscribe & Save' : 'One-Time'}
                </span>
              </div>

              {/* Add to Cart Button */}
              <Button 
                onClick={onAddToCart}
                className="btn-primary gap-2 h-11 px-6 sm:px-8"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isSubscription ? 'Subscribe & Save' : 'Add to Cart'}
                </span>
                <span className="sm:hidden">Add to Cart</span>
              </Button>
            </div>
            <WhyNowMicroCopy compact />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
