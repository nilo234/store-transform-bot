import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface BundleUpsellProps {
  currentProductHandle?: string;
}

const bundles = [
  {
    name: "Daily Wellness Bundle",
    description: "Energy + Immunity + Focus",
    products: ["Energy", "Immunity", "Mushroom Focus"],
    originalPrice: 44.97,
    salePrice: 34.99,
    savings: "22%",
  },
  {
    name: "Complete Health Bundle",
    description: "Full spectrum wellness",
    products: ["Energy", "Sleep", "Immunity", "Probiotic"],
    originalPrice: 59.96,
    salePrice: 44.99,
    savings: "25%",
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
              Save More
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-4">
              Bundle & Save Up To 25%
            </h2>
            <p className="text-muted-foreground">
              Get more value with our curated wellness bundles
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
                    {bundle.savings} OFF
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
                    View Bundle
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/bundles" className="text-primary hover:underline font-medium">
              View All Bundles →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
