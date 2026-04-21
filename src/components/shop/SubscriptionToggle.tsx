import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw, Package, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PurchaseType = 'one-time' | 'subscribe';

interface SubscriptionOption {
  frequency: string;
  label: string;
  discount: number;
}

const subscriptionOptions: SubscriptionOption[] = [
  { frequency: 'monthly', label: 'Every Month', discount: 20 },
  { frequency: 'bimonthly', label: 'Every 2 Months', discount: 15 },
  { frequency: 'quarterly', label: 'Every 3 Months', discount: 10 },
];

interface SubscriptionToggleProps {
  basePrice: number;
  onSelectionChange: (selection: {
    type: PurchaseType;
    frequency?: string;
    discount: number;
    finalPrice: number;
  }) => void;
}

export function SubscriptionToggle({ basePrice, onSelectionChange }: SubscriptionToggleProps) {
  // Subscribe & Save is the DEFAULT — proven to lift LTV by 30–40% on supplement DTC sites
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('subscribe');
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');

  const currentOption = subscriptionOptions.find(o => o.frequency === selectedFrequency) || subscriptionOptions[0];
  const discountAmount = purchaseType === 'subscribe' ? currentOption.discount : 0;
  const finalPrice = basePrice * (1 - discountAmount / 100);

  // Sync the default selection with the parent on mount so price/CTA match the UI
  useEffect(() => {
    onSelectionChange({
      type: 'subscribe',
      frequency: 'monthly',
      discount: currentOption.discount,
      finalPrice: basePrice * (1 - currentOption.discount / 100),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePrice]);

  const handleTypeChange = (type: PurchaseType) => {
    setPurchaseType(type);
    const discount = type === 'subscribe' ? currentOption.discount : 0;
    const price = basePrice * (1 - discount / 100);
    onSelectionChange({
      type,
      frequency: type === 'subscribe' ? selectedFrequency : undefined,
      discount,
      finalPrice: price,
    });
  };

  const handleFrequencyChange = (frequency: string) => {
    setSelectedFrequency(frequency);
    const option = subscriptionOptions.find(o => o.frequency === frequency) || subscriptionOptions[0];
    onSelectionChange({
      type: 'subscribe',
      frequency,
      discount: option.discount,
      finalPrice: basePrice * (1 - option.discount / 100),
    });
  };

  return (
    <div className="space-y-4">
      {/* Purchase Type Toggle */}
      <div className="grid grid-cols-2 gap-3">
        {/* One-Time Purchase */}
        <button
          onClick={() => handleTypeChange('one-time')}
          className={cn(
            "relative p-4 rounded-xl border-2 transition-all duration-300 text-left",
            purchaseType === 'one-time'
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/50"
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
              purchaseType === 'one-time'
                ? "border-primary bg-primary"
                : "border-muted-foreground"
            )}>
              {purchaseType === 'one-time' && (
                <Check className="h-3 w-3 text-primary-foreground" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">One-Time</span>
              </div>
              <p className="text-lg font-bold text-foreground mt-1">
                ${basePrice.toFixed(2)}
              </p>
            </div>
          </div>
        </button>

        {/* Subscribe & Save */}
        <button
          onClick={() => handleTypeChange('subscribe')}
          className={cn(
            "relative p-4 rounded-xl border-2 transition-all duration-300 text-left overflow-hidden",
            purchaseType === 'subscribe'
              ? "border-accent bg-accent/5"
              : "border-border hover:border-muted-foreground/50"
          )}
        >
          {/* Best Value Badge */}
          <div className="absolute -top-px -right-px">
            <div className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg">
              BEST VALUE
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
              purchaseType === 'subscribe'
                ? "border-accent bg-accent"
                : "border-muted-foreground"
            )}>
              {purchaseType === 'subscribe' && (
                <Check className="h-3 w-3 text-accent-foreground" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-accent" />
                <span className="font-semibold">Subscribe & Save</span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-accent">
                   ${finalPrice.toFixed(2)}
                 </span>
                 <span className="text-sm text-muted-foreground line-through">
                   ${basePrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3 text-accent" />
                <span className="text-xs font-medium text-accent">
                  Save {discountAmount}%
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Frequency Options - Only shown for subscriptions */}
      <AnimatePresence>
        {purchaseType === 'subscribe' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-muted/50 rounded-xl space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Delivery Frequency:
              </p>
              <div className="space-y-2">
                {subscriptionOptions.map((option) => (
                  <button
                    key={option.frequency}
                    onClick={() => handleFrequencyChange(option.frequency)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg border transition-all",
                      selectedFrequency === option.frequency
                        ? "border-accent bg-accent/10"
                        : "border-border bg-background hover:border-muted-foreground/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        selectedFrequency === option.frequency
                          ? "border-accent bg-accent"
                          : "border-muted-foreground"
                      )}>
                        {selectedFrequency === option.frequency && (
                          <Check className="h-2.5 w-2.5 text-accent-foreground" />
                        )}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                    <span className={cn(
                      "text-sm font-bold px-2 py-0.5 rounded-full",
                      selectedFrequency === option.frequency
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      Save {option.discount}%
                    </span>
                  </button>
                ))}
              </div>

              {/* Subscription Benefits */}
              <div className="pt-3 border-t border-border space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Subscription Benefits
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Free shipping on every order',
                    'Cancel anytime, no commitment',
                    'Skip or reschedule deliveries',
                    'Exclusive subscriber discounts',
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
