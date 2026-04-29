import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRegion } from '@/hooks/useRegion';

interface BundleUpsellProps {
  currentProductHandle?: string;
}

const bundles = [
  {
    name: "The Deep Work Stack",
    description: "Focus + Energy + Calm",
    products: ["Mushroom Focus", "Energy", "Cognitive Relax"],
    originalPrice: 104.97,
    salePrice: 84.99,
    savings: "19%",
  },
  {
    name: "The Full You",
    description: "Full spectrum, one routine",
    products: ["Focus", "Energy", "Probiotic", "Sleep", "Beauty", "Iron"],
    originalPrice: 209.94,
    salePrice: 169.99,
    savings: "19%",
  },
];

export const BundleUpsell = ({ currentProductHandle }: BundleUpsellProps) => {
  const { formatPrice } = useRegion();
  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Better together
            </span>
            <h2 className="font-display text-2xl md:text-3xl mt-2 mb-4" style={{ letterSpacing: '-0.02em' }}>
              Build a routine that covers all the bases.
            </h2>
            <p className="text-muted-foreground">
              Combine strips and save up to 20% on curated bundles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundles.map((bundle, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{bundle.name}</h3>
                    <p className="text-sm text-muted-foreground">{bundle.description}</p>
                  </div>
                  <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded-full">
                    {bundle.savings} off
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {bundle.products.map((product, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{product} Strips</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-primary">{formatPrice(bundle.salePrice)}</span>
                  <span className="text-muted-foreground line-through">{formatPrice(bundle.originalPrice)}</span>
                </div>

                <Link to="/bundles">
                  <Button className="w-full btn-secondary" variant="outline">
                    See this bundle
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/bundles" className="text-primary hover:underline font-medium">
              Browse all bundles →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
