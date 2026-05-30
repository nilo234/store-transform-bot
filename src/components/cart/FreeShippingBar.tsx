import { Truck, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRegion } from '@/hooks/useRegion';

interface FreeShippingBarProps {
  currentTotal: number;
  threshold?: number;
  /** @deprecated currency is now driven by useRegion() */
  currencySymbol?: string;
}

export function FreeShippingBar({ 
  currentTotal, 
  threshold = 50,
}: FreeShippingBarProps) {
  const { isUK, formatPrice } = useRegion();

  // No free-shipping promo for UK customers (US-only offer)
  if (isUK) return null;

  const remaining = threshold - currentTotal;
  const progress = Math.min((currentTotal / threshold) * 100, 100);
  const qualified = remaining <= 0;

  return (
    <div className={`rounded-xl p-4 border-2 transition-colors ${qualified ? 'bg-primary/5 border-primary' : 'bg-muted/40 border-border'}`}>
      {qualified ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-primary leading-tight">
              You've unlocked FREE US shipping!
            </p>
            <p className="text-xs text-muted-foreground leading-tight">
              We'll cover delivery on this order.
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">
                You're <span className="font-bold text-primary">{formatPrice(remaining)}</span> away from FREE shipping
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-tight">
            Free shipping on all US orders over {formatPrice(threshold)} — no code needed.
          </p>
        </>
      )}
    </div>
  );
}
