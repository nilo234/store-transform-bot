import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import { BundleCard } from './BundleCard';
import { bundles } from '@/data/bundles';

export function BundleSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 via-background to-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-wide">
              Limited Time Offer
            </span>
          </motion.div>

          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            BUNDLES — SAVE UP TO 20%
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Stack your wellness routine with our curated bundles. More strips, more savings.
          </motion.p>
        </div>

        {/* Bundle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bundles.map((bundle, index) => (
            <BundleCard key={bundle.id} bundle={bundle} index={index} />
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Free Shipping $50+
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> 14-Day Guarantee
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Bundle & Save More
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
