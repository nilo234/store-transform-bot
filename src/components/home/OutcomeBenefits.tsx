import { motion } from 'framer-motion';
import { Battery, Moon, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const outcomes = [
  {
    icon: Battery,
    title: 'Wake Up Energized',
    description: 'Replace the coffee crash with clean, sustained energy that lasts all day — no jitters, no afternoon slump.',
    cta: 'Shop Energy',
    link: '/product/energy-strips-2',
  },
  {
    icon: Moon,
    title: 'Sleep Deeper Tonight',
    description: 'Fall asleep faster and wake up feeling restored. Our sleep strips help you build a bedtime ritual that actually works.',
    cta: 'Shop Sleep',
    link: '/product/sleep-strips-1',
  },
  {
    icon: Sparkles,
    title: 'Glow From the Inside',
    description: 'Stronger nails, clearer skin, healthier hair — powered by biotin, collagen peptides, and vitamins your body absorbs in seconds.',
    cta: 'Shop Beauty',
    link: '/product/hair-skin-and-nails-strips',
  },
];

export function OutcomeBenefits() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container-wide">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3">
            What changes when you start?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real outcomes from a 3-second daily ritual.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              className="text-center p-8 rounded-2xl bg-background border border-border/40 hover:shadow-card transition-all duration-500 flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <outcome.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl mb-3">{outcome.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{outcome.description}</p>
              <Link to={outcome.link}>
                <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm font-semibold gap-1">
                  {outcome.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
