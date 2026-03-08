import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Shield, Leaf, Sparkles } from 'lucide-react';

interface Ingredient {
  name: string;
  benefit: string;
  category: string;
  icon: any;
}

interface IngredientSpotlightProps {
  ingredients?: Ingredient[];
  productHandle?: string;
}

const ingredientsByProduct: Record<string, Ingredient[]> = {
  mushroom: [
    { name: "Lion's Mane", benefit: "The clarity you want on your best days — available on all of them", category: "FOCUS", icon: Brain },
    { name: "Cordyceps", benefit: "Steady energy that carries you through without a crash", category: "ENERGY", icon: Zap },
    { name: "Maitake", benefit: "Quietly supports your immune system, every single day", category: "IMMUNITY", icon: Shield },
    { name: "Shiitake", benefit: "Rich in antioxidants that help protect at the cellular level", category: "WELLNESS", icon: Heart },
  ],
  energy: [
    { name: "Vitamin B12", benefit: "The baseline that keeps everything else going", category: "ENERGY", icon: Zap },
    { name: "Green Tea Extract", benefit: "Sustained focus without the jittery edge", category: "FOCUS", icon: Brain },
    { name: "Iron", benefit: "Supports oxygen flow so you feel less drained", category: "VITALITY", icon: Heart },
  ],
  sleep: [
    { name: "Melatonin", benefit: "The off-switch your brain needs at the end of the day", category: "SLEEP", icon: Sparkles },
    { name: "L-Theanine", benefit: "Calm without drowsiness — just a quieter mind", category: "CALM", icon: Leaf },
    { name: "Magnesium", benefit: "Helps your muscles and nervous system unwind", category: "RECOVERY", icon: Heart },
  ],
  cognitive: [
    { name: "L-Theanine", benefit: "Focused calm when your brain won't stop racing", category: "CALM", icon: Leaf },
    { name: "GABA", benefit: "Supports your body's natural response to stress", category: "BALANCE", icon: Heart },
    { name: "Vitamin B6", benefit: "Keeps your nervous system running smoothly", category: "NERVE", icon: Brain },
  ],
  default: [
    { name: "Purposeful ingredients", benefit: "Every ingredient earns its place — nothing is there for show", category: "QUALITY", icon: Sparkles },
    { name: "Fast-dissolving format", benefit: "Absorbs in seconds so your body can get to work", category: "DELIVERY", icon: Zap },
    { name: "Natural flavors", benefit: "Tastes like something you'd actually choose", category: "PURE", icon: Leaf },
  ],
};

export const IngredientSpotlight = ({ ingredients, productHandle }: IngredientSpotlightProps) => {
  const displayIngredients = ingredients || ingredientsByProduct[productHandle || 'default'] || ingredientsByProduct.default;

  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-body text-2xl md:text-3xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
              What\u2019s inside \u2014 and why it matters
            </h2>
            <p className="text-muted-foreground">
              Every ingredient is here for a reason. No fillers. No fluff.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayIngredients.map((ingredient, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {ingredient.category}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <ingredient.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
