import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Bundle } from '@/data/bundles';

interface BundleCardProps {
  bundle: Bundle;
  index?: number;
}

// Countdown timer component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-destructive">
      <Clock className="h-3.5 w-3.5" />
      <span>
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export function BundleCard({ bundle, index = 0 }: BundleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Create a bundle cart item
    addItem({
      product: {
        node: {
          id: `bundle-${bundle.id}`,
          title: `${bundle.name} ${bundle.emoji}`,
          description: bundle.tagline,
          handle: bundle.id,
          priceRange: {
            minVariantPrice: {
              amount: bundle.salePrice.toString(),
              currencyCode: 'USD',
            },
          },
          images: { edges: [] },
          variants: {
            edges: [
              {
                node: {
                  id: `bundle-variant-${bundle.id}`,
                  title: bundle.packSize,
                  price: {
                    amount: bundle.salePrice.toString(),
                    currencyCode: 'USD',
                  },
                  availableForSale: true,
                  selectedOptions: [{ name: 'Pack', value: bundle.packSize }],
                },
              },
            ],
          },
          options: [{ name: 'Pack', values: [bundle.packSize] }],
        },
      },
      variantId: `bundle-variant-${bundle.id}`,
      variantTitle: bundle.packSize,
      price: {
        amount: bundle.salePrice.toString(),
        currencyCode: 'USD',
      },
      quantity: 1,
      selectedOptions: [{ name: 'Pack', value: bundle.packSize }],
    });

    toast.success('Bundle added to cart!', {
      description: `${bundle.name} - ${bundle.packSize}`,
      position: 'top-center',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div
        className="relative bg-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-elevated h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header with Badge */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-6 pb-4">
          {/* Badges Row */}
          <div className="flex items-start justify-between mb-3">
            {/* Pack Size Badge */}
            <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" />
              {bundle.packSize}
            </div>

            {/* Special Badge */}
            {bundle.badge && (
              <span className="bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm animate-pulse">
                {bundle.badge}
              </span>
            )}
          </div>

          {/* Bundle Name with Emoji */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{bundle.emoji}</span>
            <h3 className="font-display text-lg font-bold text-foreground leading-tight">
              {bundle.name}
            </h3>
          </div>

          {/* Countdown Timer */}
          <CountdownTimer />
        </div>

        {/* Products List */}
        <div className="px-6 py-4 flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Includes:
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {bundle.products.map((product, i) => (
              <span
                key={i}
                className="text-xs bg-muted/80 px-2.5 py-1 rounded-full text-foreground font-medium"
              >
                • {product}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            "{bundle.tagline}"
          </p>
        </div>

        {/* Price Section */}
        <div className="px-6 pb-4">
          <div className="bg-muted/50 rounded-xl p-4 mb-4">
            {/* Savings Badge */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-bold">
                SAVE ${bundle.savings} | {bundle.discountPercent}% OFF
              </span>
            </div>

            {/* Prices */}
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-sm text-muted-foreground line-through">
                ${bundle.originalPrice.toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-primary">
                ${bundle.salePrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.div
            animate={{
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Bundle to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
