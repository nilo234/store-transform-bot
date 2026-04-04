import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ComparisonRow {
  feature: string;
  neuvie: boolean | string;
  traditional: boolean | string;
}

const comparisonData: ComparisonRow[] = [
  { feature: 'Fast-Dissolving Format', neuvie: true, traditional: false },
  { feature: 'Absorption Time', neuvie: '30 seconds', traditional: '30-60 minutes' },
  { feature: 'No Water Needed', neuvie: true, traditional: false },
  { feature: '5x Faster Absorption*', neuvie: true, traditional: false },
  { feature: 'Pocket-Friendly Packaging', neuvie: true, traditional: false },
  { feature: 'Third-Party Lab Tested', neuvie: true, traditional: 'Sometimes' },
  { feature: 'Great Taste', neuvie: true, traditional: false },
  { feature: '14-Day Money-Back Guarantee', neuvie: true, traditional: 'Varies' },
];

export function ComparisonAuriSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container-wide px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl mb-4" style={{ letterSpacing: '-0.02em' }}>
            WHY NEUVIE STRIPS?
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            See how our innovative oral strips compare to traditional supplements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
            <div className="text-left font-medium text-sm md:text-base text-muted-foreground">
              Feature
            </div>
            <div className="text-center">
              <span className="inline-block bg-primary text-primary-foreground px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold">
                Neuvie Strips
              </span>
            </div>
            <div className="text-center">
              <span className="inline-block bg-muted text-muted-foreground px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium">
                Traditional Pills
              </span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-3 gap-2 md:gap-4 items-center bg-card rounded-xl p-3 md:p-4"
              >
                <div className="text-xs md:text-sm font-medium">{row.feature}</div>
                <div className="flex justify-center">
                  {typeof row.neuvie === 'boolean' ? (
                    row.neuvie ? (
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                      </div>
                    )
                  ) : (
                    <span className="text-xs md:text-sm text-primary font-semibold">{row.neuvie}</span>
                  )}
                </div>
                <div className="flex justify-center">
                  {typeof row.traditional === 'boolean' ? (
                    row.traditional ? (
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                      </div>
                    )
                  ) : (
                    <span className="text-xs md:text-sm text-muted-foreground">{row.traditional}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8 md:mt-10"
          >
            <Link to="/shop">
              <Button className="btn-primary gap-2 h-12 md:h-14 px-8 text-base md:text-lg">
                Try Neuvie Risk-Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              60-Day Money-Back Guarantee • Free Shipping on $50+
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
