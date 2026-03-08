import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComparisonTableProps {
  onCtaClick?: () => void;
}

export const ComparisonTable = ({ onCtaClick }: ComparisonTableProps) => {
  const comparisons = [
    { feature: "Actually tastes good", neuvie: true, others: false },
    { feature: "Dissolves in seconds", neuvie: true, others: false },
    { feature: "No water needed", neuvie: true, others: false },
    { feature: "Made in the USA", neuvie: true, others: "varies" as string | boolean },
    { feature: "Fits in your pocket", neuvie: true, others: false },
    { feature: "No bitter aftertaste", neuvie: true, others: false },
    { feature: "Fast absorption", neuvie: true, others: "varies" as string | boolean },
    { feature: "Vegan & gluten-free", neuvie: true, others: "varies" as string | boolean },
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
            <h2 className="font-body text-2xl md:text-3xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
              You deserve a supplement you actually enjoy taking.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Most supplements end up forgotten — not because you don't care, but because the experience was never built for real life. Neuvie was.
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
              <div className="p-4 font-medium text-muted-foreground"></div>
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
                Try it risk-free
              </Button>
              <p className="text-xs text-muted-foreground mt-2">14-day money-back guarantee — no questions asked</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
