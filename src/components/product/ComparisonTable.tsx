import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComparisonTableProps {
  onCtaClick?: () => void;
}

export const ComparisonTable = ({ onCtaClick }: ComparisonTableProps) => {
  const comparisons = [
    { feature: "Tastes great", neuvie: true, others: false },
    { feature: "Fast-dissolving (seconds)", neuvie: true, others: false },
    { feature: "No water needed", neuvie: true, others: false },
    { feature: "Made in USA", neuvie: true, others: "varies" },
    { feature: "Pocket-sized & portable", neuvie: true, others: false },
    { feature: "No bitter aftertaste", neuvie: true, others: false },
    { feature: "High bioavailability", neuvie: true, others: "varies" },
    { feature: "Vegan & gluten-free", neuvie: true, others: "varies" },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Look Forward to Your Supplements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most capsules and powders are easy to skip, hard to swallow, and leave a bad taste. 
              Neuvie Strips are made to delight.
            </p>
          </motion.div>

          <motion.div 
            className="bg-card rounded-2xl overflow-hidden border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="grid grid-cols-3 bg-muted/50">
              <div className="p-4 font-medium text-muted-foreground">Feature</div>
              <div className="p-4 text-center font-semibold text-primary border-x border-border/50">
                Neuvie Strips
              </div>
              <div className="p-4 text-center font-medium text-muted-foreground">
                Pills & Powders
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 ${index !== comparisons.length - 1 ? 'border-b border-border/50' : ''}`}
              >
                <div className="p-4 text-sm text-foreground">{row.feature}</div>
                <div className="p-4 flex justify-center items-center border-x border-border/50 bg-primary/5">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div className="p-4 flex justify-center items-center">
                  {row.others === true ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : row.others === false ? (
                    <X className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <span className="text-xs text-muted-foreground">varies</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {onCtaClick && (
            <div className="text-center mt-8">
              <Button onClick={onCtaClick} className="btn-primary" size="lg">
                Try Neuvie Risk-Free →
              </Button>
              <p className="text-xs text-muted-foreground mt-2">14-Day Money-Back Guarantee</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
