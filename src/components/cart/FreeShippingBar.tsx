import { Truck, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface FreeShippingBarProps {
  currentTotal: number;
  threshold?: number;
  currencySymbol?: string;
}

export function FreeShippingBar({ 
  currentTotal, 
  threshold = 50, 
  currencySymbol = '$' 
}: FreeShippingBarProps) {
  const remaining = threshold - currentTotal;
  const progress = Math.min((currentTotal / threshold) * 100, 100);
  const qualified = remaining <= 0;

  return (
    <div className="bg-muted/50 rounded-lg p-3">
      {qualified ? (
        <div className="flex items-center gap-2 text-primary">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold">
            🎉 You've unlocked FREE shipping!
          </span>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Add <span className="font-bold text-primary">{currencySymbol}{remaining.toFixed(2)}</span> for FREE shipping
              </span>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
