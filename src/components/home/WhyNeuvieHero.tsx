import { motion } from 'framer-motion';
import { Zap, Leaf, Sparkles, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    emoji: '⚡',
    title: '5x Faster Absorption',
    description: 'Strips dissolve instantly on your tongue, bypassing the digestive system for rapid nutrient delivery.',
  },
  {
    icon: Leaf,
    emoji: '🌿',
    title: '13 Active Formulas',
    description: 'Scientifically combined ingredients at clinically studied dosages for maximum effect.',
  },
  {
    icon: Sparkles,
    emoji: '✨',
    title: 'Zero Effort Daily Ritual',
    description: '3 seconds is all it takes. No water, no pills, no planning. Just you — choosing yourself.',
  },
  {
    icon: Heart,
    emoji: '💛',
    title: 'Because You Deserve It',
    description: 'Wellness that fits your life, not the other way around. Built for real people with real days.',
  },
];

export function WhyNeuvieHero() {
  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container-wide">
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-5">
            Why NEUVIE? Because Your Wellbeing{' '}
            <span className="text-accent italic">Can't Wait.</span>
          </h2>
          <p className="text-background/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Most supplements take 45+ minutes to absorb. NEUVIE dissolves in 3 seconds and absorbs 
            up to 5x faster. No pills. No water. No excuses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-background/[0.07] border border-background/10 rounded-2xl p-7 text-center hover:bg-background/[0.12] transition-all duration-500 hover:-translate-y-1"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-4xl block mb-4">{benefit.emoji}</span>
              <h3 className="font-semibold text-lg text-background mb-2">{benefit.title}</h3>
              <p className="text-sm text-background/60 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
