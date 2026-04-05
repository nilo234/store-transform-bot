import { motion } from 'framer-motion';
import { Brain, Zap, Moon, Sparkles, Pill, Leaf } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Ingredient {
  icon: LucideIcon;
  name: string;
  benefit: string;
}

const ingredients: Ingredient[] = [
  { icon: Brain, name: "Lion's Mane", benefit: 'Mental clarity you can feel*' },
  { icon: Zap, name: 'Cordyceps', benefit: 'Steady energy, no crash*' },
  { icon: Moon, name: 'Melatonin', benefit: 'The off-switch your brain needs*' },
  { icon: Sparkles, name: 'Collagen', benefit: 'What shows up on the outside*' },
  { icon: Pill, name: 'B12', benefit: 'The baseline that keeps everything else going*' },
  { icon: Leaf, name: 'Ashwagandha', benefit: 'Stress without the spiral*' },
];

export function IngredientSpotlight() {
  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container-wide">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-3" style={{ letterSpacing: '-0.02em' }}>
            Inside the Strips
          </h2>
          <p className="text-muted-foreground">
            Every ingredient earns its place. No fillers, no fluff.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-4xl mx-auto">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-2xl bg-card border border-border/50 flex items-center justify-center shadow-soft">
                <ingredient.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-sm md:text-base text-foreground">
                {ingredient.name}
              </h3>
              <p className="text-xs text-primary font-medium">{ingredient.benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
