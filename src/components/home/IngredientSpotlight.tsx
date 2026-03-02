import { motion } from 'framer-motion';

interface Ingredient {
  emoji: string;
  name: string;
  benefit: string;
}

const ingredients: Ingredient[] = [
  { emoji: '🍄', name: "Lion's Mane", benefit: 'Focus*' },
  { emoji: '🍄', name: 'Cordyceps', benefit: 'Energy*' },
  { emoji: '🌙', name: 'Melatonin', benefit: 'Sleep*' },
  { emoji: '✨', name: 'Collagen', benefit: 'Beauty*' },
  { emoji: '💊', name: 'B12', benefit: 'Vitality*' },
  { emoji: '🌿', name: 'Ashwagandha', benefit: 'Calm*' },
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
          <h2 className="font-body text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
            Inside the Strips
          </h2>
          <p className="text-muted-foreground">
            Premium ingredients, clinically dosed for real results.
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
                <span className="text-2xl md:text-3xl">{ingredient.emoji}</span>
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
