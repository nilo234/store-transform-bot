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
    { name: "Lion's Mane", benefit: "Supports mental clarity, focus, and memory function", category: "FOCUS", icon: Brain },
    { name: "Cordyceps", benefit: "Revered for supporting cellular energy and stamina", category: "ENERGY", icon: Zap },
    { name: "Maitake", benefit: "Contains beta-glucans that support immune health", category: "IMMUNITY", icon: Shield },
    { name: "Shiitake", benefit: "Rich in antioxidants for cellular protection", category: "WELLNESS", icon: Heart },
  ],
  energy: [
    { name: "Vitamin B12", benefit: "Essential for energy metabolism and red blood cell formation", category: "ENERGY", icon: Zap },
    { name: "Green Tea Extract", benefit: "Natural caffeine for sustained energy without jitters", category: "FOCUS", icon: Brain },
    { name: "Iron", benefit: "Supports oxygen transport and reduces fatigue", category: "VITALITY", icon: Heart },
  ],
  sleep: [
    { name: "Melatonin", benefit: "Helps regulate your natural sleep-wake cycle", category: "SLEEP", icon: Sparkles },
    { name: "L-Theanine", benefit: "Promotes relaxation without drowsiness", category: "CALM", icon: Leaf },
    { name: "Magnesium", benefit: "Supports muscle relaxation and nervous system", category: "RECOVERY", icon: Heart },
  ],
  cognitive: [
    { name: "L-Theanine", benefit: "Promotes calm focus without drowsiness", category: "CALM", icon: Leaf },
    { name: "GABA", benefit: "Supports your body's natural stress response", category: "BALANCE", icon: Heart },
    { name: "Vitamin B6", benefit: "Contributes to normal nervous system function", category: "NERVE", icon: Brain },
  ],
  default: [
    { name: "Premium Ingredients", benefit: "Carefully selected for maximum effectiveness", category: "QUALITY", icon: Sparkles },
    { name: "Fast-Dissolving Formula", benefit: "Rapid absorption for quick results", category: "DELIVERY", icon: Zap },
    { name: "Natural Flavors", benefit: "Delicious taste without artificial additives", category: "PURE", icon: Leaf },
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
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Inside the Strips
            </h2>
            <p className="text-muted-foreground">
              Powerful ingredients backed by science for your well-being
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
