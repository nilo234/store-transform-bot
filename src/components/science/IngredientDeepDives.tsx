import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type ImpactLevel = 'Low' | 'Medium' | 'High' | 'Very High';

const impactValue: Record<ImpactLevel, number> = {
  Low: 25,
  Medium: 50,
  High: 75,
  'Very High': 100,
};

interface DeepDive {
  name: string;
  details: string;
  origin: string;
  mechanism: string;
  benefits: string[];
  impact: Array<{ label: string; level: ImpactLevel }>;
  foundIn: Array<{ name: string; handle: string }>;
}

const ingredients: DeepDive[] = [
  {
    name: 'Collagen Peptides',
    details:
      'Marine-derived collagen peptides support skin elasticity, hydration, hair strength, and nail integrity. Hydrolyzed for optimal absorption — the same peptides used in wellness routines for centuries.',
    origin: 'Sustainably sourced marine collagen',
    mechanism:
      'Broken down into bioavailable amino acids that stimulate collagen synthesis in skin fibroblasts and the dermal layer.',
    benefits: ['Skin elasticity', 'Hydration', 'Hair & nail strength', 'Anti-aging support'],
    impact: [
      { label: 'Skin', level: 'Very High' },
      { label: 'Hair', level: 'High' },
      { label: 'Joints', level: 'Medium' },
    ],
    foundIn: [
      { name: 'Beauty + Collagen Strips', handle: 'beauty-collagen-gummies' },
      { name: 'Hair, Skin & Nails Strips', handle: 'hair-skin-nails-gummies' },
    ],
  },
  {
    name: 'Biotin (5,000 mcg)',
    details:
      'A water-soluble B-vitamin (B7) critical for keratin infrastructure — the protein that gives hair, skin, and nails their strength.',
    origin: 'Naturally found in eggs, nuts, and seeds; synthesized to a pure, supplement-grade form.',
    mechanism:
      'Supports keratin synthesis and acts as a cofactor in fatty acid metabolism and glucose production.',
    benefits: ['Hair growth', 'Nail strength', 'Skin health', 'Energy metabolism'],
    impact: [
      { label: 'Hair', level: 'Very High' },
      { label: 'Nails', level: 'Very High' },
      { label: 'Skin', level: 'High' },
    ],
    foundIn: [{ name: 'Hair, Skin & Nails Strips', handle: 'hair-skin-nails-gummies' }],
  },
  {
    name: 'L-Theanine',
    details:
      'An amino acid found naturally in green tea leaves. Promotes calm without sedation — and works synergistically with caffeine for focused, jitter-free energy.',
    origin: 'East Asia (Camellia sinensis)',
    mechanism:
      'Crosses the blood-brain barrier, supports GABA, serotonin, and dopamine activity, and promotes alpha brain waves linked to relaxed focus.',
    benefits: ['Calm focus', 'Stress resilience', 'Sleep support', 'Cognitive clarity'],
    impact: [
      { label: 'Focus', level: 'Very High' },
      { label: 'Stress', level: 'High' },
      { label: 'Sleep', level: 'Medium' },
    ],
    foundIn: [
      { name: 'Energy Strips', handle: 'energy-gummies' },
      { name: 'Cognitive Relax Strips', handle: 'cognitive-relax-gummies' },
    ],
  },
  {
    name: 'Natural Caffeine',
    details:
      'Sourced from green tea or guarana — clean energy without synthetic additives or jitter-inducing compounds.',
    origin: 'Green tea leaves and guarana (Brazil)',
    mechanism:
      'Blocks adenosine receptors, increases dopamine and norepinephrine, and enhances neural activity.',
    benefits: ['Energy', 'Alertness', 'Physical performance', 'Mood lift'],
    impact: [
      { label: 'Energy', level: 'Very High' },
      { label: 'Alertness', level: 'Very High' },
      { label: 'Mood', level: 'Medium' },
    ],
    foundIn: [{ name: 'Energy Strips', handle: 'energy-gummies' }],
  },
  {
    name: 'Probiotics (L. acidophilus)',
    details:
      'Live beneficial bacteria that support gut microbiome balance. L. acidophilus is one of the most clinically researched probiotic strains.',
    origin: 'Lab-cultured from fermented food origins for supplement precision',
    mechanism:
      'Colonizes the gut lining, competes with harmful bacteria, and supports intestinal barrier integrity and immune signaling.',
    benefits: ['Gut balance', 'Immune support', 'Digestion', 'Microbiome diversity'],
    impact: [
      { label: 'Gut', level: 'Very High' },
      { label: 'Digestion', level: 'Very High' },
      { label: 'Immunity', level: 'High' },
    ],
    foundIn: [
      { name: 'Probiotic + Metabolism Strips', handle: 'probiotic-metabolism-gummies' },
      { name: 'Digestive + Gut Health Strips', handle: 'digestive-gummies' },
    ],
  },
  {
    name: 'Ashwagandha (KSM-66)',
    details:
      'An adaptogenic root used in Ayurvedic medicine for over 3,000 years. KSM-66 is the most clinically studied, full-spectrum extract available.',
    origin: 'India, North Africa, and the Mediterranean',
    mechanism:
      'Supports HPA axis regulation; withanolides modulate the cortisol response and inflammation pathways.',
    benefits: ['Stress resilience', 'Cortisol balance', 'Cognitive clarity', 'Hormonal balance'],
    impact: [
      { label: 'Stress', level: 'Very High' },
      { label: 'Cortisol', level: 'Very High' },
      { label: 'Focus', level: 'High' },
    ],
    foundIn: [{ name: 'Cognitive Relax Strips', handle: 'cognitive-relax-gummies' }],
  },
  {
    name: 'Vitamin C',
    details:
      'An essential antioxidant vitamin — critical for immune defense, collagen synthesis, and neutralizing free radicals.',
    origin: 'Acerola cherry (natural) or pharmaceutical-grade ascorbic acid',
    mechanism:
      'Neutralizes free radicals, acts as a cofactor in collagen biosynthesis, and stimulates immune cell production.',
    benefits: ['Immune defense', 'Collagen synthesis', 'Skin brightness', 'Antioxidant protection'],
    impact: [
      { label: 'Immunity', level: 'Very High' },
      { label: 'Collagen', level: 'High' },
      { label: 'Skin', level: 'High' },
    ],
    foundIn: [{ name: 'Beauty + Collagen Strips', handle: 'beauty-collagen-gummies' }],
  },
  {
    name: 'Zinc',
    details:
      'An essential trace mineral involved in 300+ enzymatic processes. Critical for immune function, skin repair, and hormone regulation.',
    origin: 'Natural mineral sources, chelated for absorption',
    mechanism:
      'Supports T-cell immune function, DNA synthesis, skin barrier repair, and hormone regulation.',
    benefits: ['Immune function', 'Skin health', 'Hormone balance', 'Wound healing'],
    impact: [
      { label: 'Immunity', level: 'Very High' },
      { label: 'Skin', level: 'High' },
      { label: 'Hormones', level: 'Medium' },
    ],
    foundIn: [{ name: 'Hair, Skin & Nails Strips', handle: 'hair-skin-nails-gummies' }],
  },
  {
    name: 'Melatonin',
    details:
      'A naturally occurring hormone that regulates the body\u2019s sleep-wake cycle and circadian rhythm.',
    origin: 'Synthesized to match the body\u2019s natural melatonin structure',
    mechanism:
      'Binds to melatonin receptors in the brain, signals the body to prepare for sleep, and regulates circadian rhythm.',
    benefits: ['Sleep onset', 'Sleep quality', 'Circadian regulation', 'Jet lag support'],
    impact: [
      { label: 'Sleep Onset', level: 'Very High' },
      { label: 'Sleep Quality', level: 'Very High' },
      { label: 'Circadian', level: 'High' },
    ],
    foundIn: [{ name: 'Sleep Strips', handle: 'sleep-gummies' }],
  },
  {
    name: 'Vitamin B12 (Methylcobalamin)',
    details:
      'An essential B vitamin in its most bioavailable form. Critical for energy metabolism, nerve function, and mood.',
    origin: 'Methylcobalamin — superior absorption versus cyanocobalamin',
    mechanism:
      'Cofactor in ATP energy production, myelin sheath maintenance, red blood cell formation, and DNA synthesis.',
    benefits: ['Energy metabolism', 'Nerve health', 'Mood support', 'Brain function'],
    impact: [
      { label: 'Energy', level: 'Very High' },
      { label: 'Nerve', level: 'High' },
      { label: 'Mood', level: 'High' },
    ],
    foundIn: [{ name: 'Energy Strips', handle: 'energy-gummies' }],
  },
];

function ImpactBar({ label, level }: { label: string; level: ImpactLevel }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{level}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${impactValue[level]}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function IngredientDeepDives() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-wide">
        <motion.div
          className="text-center mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
            Straight from nature
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
            The science behind every NEUVIE strip
          </h2>
          <p className="text-muted-foreground text-lg">
            Ten clinically studied ingredients — origin, mechanism, and what they actually do for you.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {ingredients.map((ing, index) => (
            <motion.article
              key={ing.name}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: Math.min(index * 0.04, 0.3) }}
            >
              <header className="mb-5">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-accent mb-2">
                  Ingredient {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-foreground">{ing.name}</h3>
              </header>

              <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Details</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ing.details}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Origin</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ing.origin}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5">Mechanism of Work</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ing.mechanism}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Benefits</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ing.benefits.map((b) => (
                        <span
                          key={b}
                          className="text-xs bg-secondary/60 px-2.5 py-1 rounded-full text-foreground font-medium"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Impact Level</p>
                    <div className="space-y-2.5">
                      {ing.impact.map((i) => (
                        <ImpactBar key={i.label} label={i.label} level={i.level} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Found In</p>
                    <div className="flex flex-wrap gap-2">
                      {ing.foundIn.map((p) => (
                        <Link
                          key={p.handle}
                          to={`/product/${p.handle}`}
                          className="text-xs border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1.5 rounded-full font-medium"
                        >
                          {p.name} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
