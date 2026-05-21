import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Sun, Shield, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const benefits = [
  {
    icon: Sparkles,
    title: 'Stronger, fuller hair',
    summary: 'Less breakage, more shine — from the inside out.',
    body: '5,000 mcg of pure Biotin (Vitamin B7) supports keratin infrastructure — the protein your hair is literally made of. Paired with Folate for healthy follicle cell turnover, it helps your hair grow back the way you remember it: thicker at the root, softer to the touch, and far less of it left behind on your pillow.',
  },
  {
    icon: Sun,
    title: 'Radiant, glowing skin',
    summary: 'A real glow — not a filter.',
    body: 'Vitamin D3 plays a quiet but essential role in skin renewal and barrier function. When paired with Folate, it supports the cell cycle that keeps your skin looking clear, even-toned, and alive. This is the kind of glow that shows up in the mirror at 7 a.m. — no Instagram lighting required.',
  },
  {
    icon: Shield,
    title: 'Resilient nails that actually grow',
    summary: 'No more splits, peels, or stubborn brittleness.',
    body: 'High-dose Biotin is the most-researched nutrient for nail thickness and resilience. Daily use is shown to help nails grow longer without snapping mid-week — so you finally stop hiding your hands.',
  },
  {
    icon: Heart,
    title: 'A daily act of self-respect',
    summary: 'Three seconds. One choice. For you.',
    body: 'The hardest part of self-care isn\'t the ingredient — it\'s remembering. One strip on your tongue, no water, no pills, no excuses. It\'s the smallest possible promise you can keep with yourself, every single morning.',
  },
];

export const HsnLifeChangingBenefits = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Life-changing benefits
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Become your most radiant self
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Four reasons women across the US make NEUVIE part of their morning ritual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              const isOpen = openIndex === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    'text-left rounded-2xl border p-5 transition-all bg-card',
                    isOpen ? 'border-primary shadow-md' : 'border-border hover:border-primary/40'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-foreground">{b.title}</h3>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 text-muted-foreground transition-transform flex-shrink-0',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{b.summary}</p>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-sm text-foreground/80 leading-relaxed mt-3 overflow-hidden"
                          >
                            {b.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-muted-foreground text-center mt-6 italic">
            *These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </section>
  );
};
