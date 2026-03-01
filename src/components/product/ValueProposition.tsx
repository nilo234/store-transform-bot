import { Package, Truck, Gift, RefreshCw, BookOpen, Shield, Zap } from 'lucide-react';

interface ValuePropositionProps {
  servings?: number;
  subscriptionPrice?: string;
}

export const ValueProposition = ({ servings = 30, subscriptionPrice = "$12.99" }: ValuePropositionProps) => {
  const perks = [
    {
      icon: Package,
      title: `${servings} Strips Per Pack`,
      subtitle: "30-day supply"
    },
    {
      icon: Truck,
      title: "FREE US Shipping",
      subtitle: "On orders $50+"
    },
    {
      icon: Gift,
      title: "FREE Mystery Gifts",
      subtitle: "With subscription"
    },
    {
      icon: Zap,
      title: "5x Faster Absorption",
      subtitle: "vs. pills & capsules"
    },
    {
      icon: RefreshCw,
      title: "Subscribe & Save 20%",
      subtitle: `Auto-refill at ${subscriptionPrice}`
    },
    {
      icon: Shield,
      title: "14-Day Guarantee",
      subtitle: "Full refund, no questions"
    }
  ];

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-foreground">Here's what you'll get:</h4>
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
