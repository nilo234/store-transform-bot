import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BundleUpsellProps {
  currentProductHandle?: string;
}

const bundles = [
  {
    name: "Daily Wellness Bundle",
    description: "Energy + Immunity + Focus",
    products: ["Energy", "Immunity", "Mushroom Focus"],
    originalPrice: 104.97,
    salePrice: 84.99,
    savings: "19%",
  },
  {
    name: "Complete Health Bundle",
    description: "Full spectrum, one routine",
    products: ["Energy", "Sleep", "Immunity", "Probiotic"],
    originalPrice: 139.96,
    salePrice: 114.99,
    savings: "18%",
  },
];

export const BundleUpsell = ({ currentProductHandle }: BundleUpsellProps) => {
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
            <h2 className="font-body text-2xl md:text-3xl font-semibold mt-2 mb-4" style={{ letterSpacing: '-0.02em' }}>
              Build a routine that covers all the bases.
            </h2>
            <p className="text-muted-foreground">
              Combine strips and save up to 25% on curated bundles.
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
                  <span className="text-2xl font-bold text-primary">${bundle.salePrice.toFixed(2)}</span>
                  <span className="text-muted-foreground line-through">${bundle.originalPrice.toFixed(2)}</span>
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
