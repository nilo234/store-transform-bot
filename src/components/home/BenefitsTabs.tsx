import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Shield, Heart, Zap, ChevronDown } from 'lucide-react';

interface Benefit {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    id: 'focus',
    icon: <Brain className="h-6 w-6" />,
    title: 'Supports Focus & Memory*',
    subtitle: 'Cognitive Enhancement',
    description: "Our Mushroom Focus and Cognitive Relax strips contain Lion's Mane and L-Theanine—compounds proven to support concentration, memory function, and mental clarity. Perfect for work, study, or creative tasks.",
  },
  {
    id: 'energy',
    icon: <Zap className="h-6 w-6" />,
    title: 'Natural Energy Boost*',
    subtitle: 'Clean, Crash-Free Energy',
    description: "Our Energy Strips combine caffeine with L-Theanine for smooth, sustained energy without the jitters or crash. Plus, B12 for cellular energy production. Take on-the-go whenever you need a pick-me-up.",
  },
  {
    id: 'immune',
    icon: <Shield className="h-6 w-6" />,
    title: 'Immune System Support*',
    subtitle: 'Daily Defense',
    description: "From Iron Strips to Bone Support with Vitamin D3 and K2, our range provides essential nutrients for immune function. Our Digestive strips also support gut health—where 70% of your immune system lives.",
  },
  {
    id: 'beauty',
    icon: <Heart className="h-6 w-6" />,
    title: 'Beauty From Within*',
    subtitle: 'Hair, Skin & Nails',
    description: "Our Beauty + Collagen and Hair, Skin & Nails strips deliver biotin (5000mcg), collagen peptides, and vitamin E for stronger nails, healthier hair, and radiant skin. Results you can see and feel.",
  },
];

export function BenefitsTabs() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container-wide">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            BENEFITS OF NEUVIE STRIPS
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Science-backed ingredients for real, noticeable results. Tap to learn more.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setActiveId(activeId === benefit.id ? null : benefit.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 ${
                  activeId === benefit.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card hover:bg-card/80 shadow-soft'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activeId === benefit.id 
                    ? 'bg-primary-foreground/20' 
                    : 'bg-primary/10'
                }`}>
                  <span className={activeId === benefit.id ? 'text-primary-foreground' : 'text-primary'}>
                    {benefit.icon}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg">{benefit.title}</h3>
                  <p className={`text-sm ${
                    activeId === benefit.id 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {benefit.subtitle}
                  </p>
                </div>
                
                <ChevronDown 
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                    activeId === benefit.id ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {activeId === benefit.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-4 bg-card/50 rounded-b-2xl -mt-2 border-t-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          className="text-center text-xs text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          *These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </motion.p>
      </div>
    </section>
  );
}
