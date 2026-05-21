import { Package, Truck, Zap, Shield } from 'lucide-react';
import { useRegion } from '@/hooks/useRegion';

interface ValuePropositionProps {
  servings?: number;
  /** Base USD price (kept for API compatibility). */
  basePrice?: number;
}

export const ValueProposition = ({ servings = 30 }: ValuePropositionProps) => {
  const { isUK, formatPrice } = useRegion();

  const perks = [
    {
      icon: Package,
      title: `${servings} strips per pack`,
      subtitle: "A full month's worth"
    },
    {
      icon: Truck,
      title: isUK ? 'International shipping' : 'Free US shipping',
      subtitle: isUK ? 'Calculated at checkout' : `On orders ${formatPrice(50)}+`
    },
    {
      icon: Zap,
      title: 'Absorbs in seconds',
      subtitle: 'Faster than pills or capsules'
    },
    {
      icon: Shield,
      title: '30-day guarantee',
      subtitle: 'Full refund, no questions'
    }
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-foreground">Here's what you get:</h4>
      <div className="grid grid-cols-2 gap-3">
        {perks.map((perk, index) => (
          <div key={index} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <perk.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight">{perk.title}</p>
              <p className="text-xs text-muted-foreground">{perk.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
