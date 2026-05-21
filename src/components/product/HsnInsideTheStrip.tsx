import { motion } from 'framer-motion';

const ingredients = [
  {
    name: 'Biotin',
    dose: '5,000 mcg',
    tag: 'Hair & Nails*',
    body: 'The cornerstone B-vitamin for keratin production — the protein that builds your hair and nails. Clinically researched dose for visible strength.',
    emoji: '🌿',
  },
  {
    name: 'Folate (B9)',
    dose: '400 mcg',
    tag: 'Cell Renewal*',
    body: 'Supports healthy cell division — the engine behind fresh skin, new hair growth, and the glow you see in the mirror.',
    emoji: '🍃',
  },
  {
    name: 'Vitamin D3',
    dose: '200 mcg',
    tag: 'Skin Vitality*',
    body: 'The "sunshine vitamin" that supports skin barrier function and an even, healthy complexion — without ever leaving the house.',
    emoji: '☀️',
  },
];

export const HsnInsideTheStrip = () => {
  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Inside the strip
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Three actives. Zero filler.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Clinically meaningful doses — not pixie dust. Every milligram on the label is in the strip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="aspect-square w-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
                  {ing.emoji}
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {ing.tag}
                  </p>
                  <h3 className="font-display text-xl mt-1 text-foreground">{ing.name}</h3>
                  <p className="text-sm font-semibold text-primary mt-1">{ing.dose}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{ing.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground text-center mt-6 italic">
            *These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </section>
  );
};
