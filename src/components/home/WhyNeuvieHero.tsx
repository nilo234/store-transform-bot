import { motion } from 'framer-motion';
import { Zap, Leaf, Sparkles, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: '5x Faster Absorption',
    description: 'Our oral strips dissolve in seconds and absorb directly — faster than any traditional capsule or powder.',
  },
  {
    icon: Leaf,
    title: '13 Active Formulas',
    description: 'Every strip is precisely formulated with scientifically selected ingredients that work together.',
  },
  {
    icon: Sparkles,
    title: '3-Second Daily Routine',
    description: 'No water. No pills. No routine to maintain. Just one effortless moment that fits any lifestyle.',
  },
  {
    icon: Heart,
    title: 'Built Around You',
    description: 'NEUVIE was created for people who prioritize themselves without making it a full-time job.',
  },
];

export function WhyNeuvieHero() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container-wide">
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-5">
            Why NEUVIE?
          </h2>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Because your wellbeing can't wait.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-primary-foreground/[0.07] border border-primary-foreground/10 rounded-2xl p-7 text-center hover:bg-primary-foreground/[0.12] transition-all duration-500 hover:-translate-y-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <benefit.icon className="w-9 h-9 text-primary-foreground/80 mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-lg text-primary-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-primary-foreground/85 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
