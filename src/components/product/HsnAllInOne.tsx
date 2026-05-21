import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const points = [
  'Replaces 3 separate beauty supplements',
  'No pills, no powders, no water needed',
  '3-second dissolve on your tongue — orange flavor',
  'Up to 5× faster absorption than capsules',
  'Travel-ready: one slim pouch, 30 days of you',
];

export const HsnAllInOne = () => {
  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              All-in-one beauty ritual
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
              One strip. The work of a whole shelf.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Most women juggle three or four bottles to get what one NEUVIE strip delivers — Biotin for hair and nails, Folate for cell renewal, and Vitamin D3 for skin vitality. We made it small enough to live in your purse, fast enough to take while you brush your teeth, and clean enough that you actually want to.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
                  </span>
                  <span className="text-sm text-foreground/85">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/40 flex items-center justify-center overflow-hidden">
              <div className="text-center px-8">
                <p className="font-display text-6xl md:text-7xl text-primary">3s</p>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  to dissolve
                </p>
                <div className="my-6 h-px w-16 bg-border mx-auto" />
                <p className="font-display text-5xl md:text-6xl text-primary">5×</p>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  faster absorption*
                </p>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground text-center mt-3 italic">
              *vs. traditional capsule delivery.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
