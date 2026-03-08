import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Shield, Leaf, FlaskConical, Award, Check, ExternalLink } from 'lucide-react';
import { PageMeta } from '@/components/seo';

// Proven Purity sections
const puritySections = [
  { 
    icon: Leaf, 
    title: 'SOURCING', 
    description: 'Every ingredient is traceable and verified before it enters a formula. We work with suppliers we trust — and test everything independently before we use it.' 
  },
  { 
    icon: FlaskConical, 
    title: 'EFFICACY', 
    description: 'We formulate at dosages that are studied to work — not just enough to put on the label. Bioavailable forms, meaningful amounts, and no unnecessary extras.' 
  },
  { 
    icon: Shield, 
    title: 'QUALITY', 
    description: 'Every batch is independently tested by third-party labs for purity, potency, and safety. What the label says is exactly what you get. No exceptions.' 
  },
];

// Product test cards
const testCards = [
  { name: 'Energy Strips', status: 'Passed', date: 'Dec 2024', researchUrl: 'https://www.tandfonline.com/doi/abs/10.1080/10408398.2020.1781051' },
  { name: 'Mushroom Focus', status: 'Passed', date: 'Dec 2024', researchUrl: 'https://pubmed.ncbi.nlm.nih.gov/38004235/' },
  { name: 'Sleep Strips', status: 'Passed', date: 'Dec 2024', researchUrl: 'https://pubmed.ncbi.nlm.nih.gov/31619178/' },
  { name: 'Hair, Skin & Nails', status: 'Passed', date: 'Dec 2024', researchUrl: 'https://pubmed.ncbi.nlm.nih.gov/28701385/' },
];

// Quality badges
const qualityBadges = [
  'Ethically Sourced',
  'Third-Party Tested',
  'Non-GMO',
  'No Artificial Colors',
  'Clinically Dosed',
  'Fast-Dissolving',
];

// All 13 products with their ingredients
const ingredientBreakdown = [
  {
    product: 'Hangover Strips',
    icon: '\u{1F379}',
    ingredients: [
      { name: 'Curcumin (Curcuma Longa)', benefit: 'Supports healthy inflammatory response and liver function' },
      { name: 'Date Extract', benefit: 'Rich in antioxidants, supports natural recovery processes' },
      { name: 'Grape Seed Extract', benefit: 'Antioxidant that helps protect cells from oxidative stress' },
      { name: 'Andrographis', benefit: 'Traditional herb supporting liver function and immune health' },
      { name: 'Phyllanthus', benefit: 'Ayurvedic herb traditionally used for liver support' },
    ],
  },
  {
    product: 'Bone Support Strips',
    icon: '\u{1F9B4}',
    ingredients: [
      { name: 'Vitamin D3 (2000 IU)', benefit: 'Essential for calcium absorption and bone mineralization' },
      { name: 'Vitamin K2 (MK-7) (200 mcg)', benefit: 'Directs calcium to bones and teeth, supports arterial health' },
    ],
  },
  {
    product: 'Cognitive Relax Strips',
    icon: '\u{1F9D8}',
    ingredients: [
      { name: 'L-Theanine (50 mg)', benefit: 'Promotes calm focus without drowsiness, found naturally in green tea' },
      { name: 'GABA (25 mg)', benefit: 'Neurotransmitter that supports relaxation and reduces nervous tension' },
      { name: 'Vitamin B6 (8 mg)', benefit: 'Essential for neurotransmitter synthesis and nervous system function' },
    ],
  },
  {
    product: 'Mushroom Focus Strips',
    icon: '\u{1F344}',
    ingredients: [
      { name: "Lion's Mane (50 mg)", benefit: 'Supports cognitive function, memory, and nerve growth factor production' },
      { name: 'Cordyceps (25 mg)', benefit: 'Traditional adaptogen supporting energy metabolism and endurance' },
      { name: 'Maitake (25 mg)', benefit: 'Rich in beta-glucans, supports immune function and metabolic health' },
      { name: 'Shiitake (20 mg)', benefit: 'Contains lentinan for immune support and antioxidant protection' },
    ],
  },
  {
    product: 'Libido Support Strips',
    icon: '\u{1F525}',
    ingredients: [
      { name: 'Cordyceps Militaris (50 mg)', benefit: 'Traditionally used to support vitality, stamina, and energy' },
      { name: 'Shilajit (50 mg)', benefit: 'Mineral-rich compound supporting testosterone and cellular energy' },
      { name: 'Oyster Peptide (20 mg)', benefit: 'Marine-derived zinc source supporting reproductive health' },
    ],
  },
  {
    product: 'Probiotic + Metabolism Strips',
    icon: '\u{1F9A0}',
    ingredients: [
      { name: 'Bifidobacterium lactis (10B CFU)', benefit: 'Clinically studied probiotic supporting gut health and digestion' },
      { name: 'Polydextrose (30 mg)', benefit: 'Prebiotic fiber that feeds beneficial gut bacteria' },
    ],
  },
  {
    product: 'Beauty + Collagen Strips',
    icon: '\u2728',
    ingredients: [
      { name: 'Collagen Peptides (100 mg)', benefit: 'Building blocks for skin elasticity, hydration, and firmness' },
      { name: 'Vitamin E (6 mg)', benefit: 'Antioxidant protecting skin cells from oxidative damage' },
    ],
  },
  {
    product: 'Hair, Skin & Nails Strips',
    icon: '\u{1F487}',
    ingredients: [
      { name: 'Biotin (5000 mcg)', benefit: 'Essential B-vitamin for keratin production and healthy hair growth' },
      { name: 'Folate (400 mcg)', benefit: 'Supports cell division and tissue growth for skin renewal' },
      { name: 'Vitamin D3 (200 mcg)', benefit: 'Supports hair follicle cycling and skin cell regeneration' },
    ],
  },
  {
    product: 'Digestive + Gut Health Strips',
    icon: '\u{1F33F}',
    ingredients: [
      { name: 'Bacillus Coagulans (10B CFU)', benefit: 'Spore-forming probiotic with enhanced survivability and gut colonization' },
      { name: 'Protease (10 mg)', benefit: 'Enzyme breaking down proteins for improved nutrient absorption' },
      { name: 'Papain (10 mg)', benefit: 'Natural enzyme from papaya supporting protein digestion' },
      { name: 'Bromelain (10 mg)', benefit: 'Pineapple-derived enzyme aiding digestion and reducing bloating' },
    ],
  },
  {
    product: 'Appetite Balance Strips',
    icon: '\u2696\uFE0F',
    ingredients: [
      { name: 'Chromium (75 mcg)', benefit: 'Essential mineral supporting healthy blood sugar metabolism' },
      { name: 'Molybdenum (100 mcg)', benefit: 'Trace mineral supporting enzyme activity and metabolic processes' },
      { name: 'Saffron Extract (10 mg)', benefit: 'Clinically studied for mood support and appetite regulation' },
    ],
  },
  {
    product: 'Iron Strips',
    icon: '\u{1F4AA}',
    ingredients: [
      { name: 'Iron (Ferric Saccharate) (19 mg)', benefit: 'Highly absorbable form supporting red blood cell production' },
      { name: 'Folate (400 mcg)', benefit: 'Works synergistically with iron for healthy cell formation' },
    ],
  },
  {
    product: 'Energy Strips',
    icon: '\u26A1',
    ingredients: [
      { name: 'Caffeine (50 mg)', benefit: 'Natural stimulant for alertness and physical performance' },
      { name: 'L-Theanine (30 mg)', benefit: 'Smooths caffeine response, prevents jitters and crash' },
      { name: 'Vitamin B12 (50 mcg)', benefit: 'Essential for energy metabolism and neurological function' },
    ],
  },
  {
    product: 'Sleep Strips',
    icon: '\u{1F319}',
    ingredients: [
      { name: 'Melatonin (5 mg)', benefit: 'Hormone regulating sleep-wake cycle, reduces time to fall asleep' },
      { name: 'Valerian Extract (10 mg)', benefit: 'Traditional herb promoting relaxation and sleep quality' },
      { name: 'Chamomile (5 mg)', benefit: 'Calming botanical supporting restful, restorative sleep' },
      { name: 'Lavender (5 mg)', benefit: 'Aromatherapeutic herb reducing anxiety and promoting calm' },
      { name: 'Hibiscus (5 mg)', benefit: 'Antioxidant-rich flower supporting relaxation' },
    ],
  },
];

export default function Science() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Science-Backed Supplement Strips \u2013 Research | NEUVIE\u2122"
        description="Clinically studied ingredients at effective dosages. Third-party tested for purity & potency. See the science behind NEUVIE\u2122 dissolving strips."
      />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide text-center">
            <motion.h1 
              className="font-body text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
              style={{ letterSpacing: '-0.02em' }}
              animate={{ opacity: 1, y: 0 }}
            >
              THE SCIENCE BEHIND NEUVIE
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Every ingredient is here for a reason. Clinically studied dosages, independently tested batches, and nothing you don't need. That's the standard — not the exception.
            </motion.p>
          </div>
        </section>

        {/* Proven Purity Section */}
        <section className="py-20">
          <div className="container-wide">
            <motion.h2 
              className="font-body text-3xl md:text-4xl font-semibold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              HOW WE DO THINGS
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {puritySections.map((section, index) => (
                <motion.div 
                  key={section.title} 
                  className="bg-card rounded-2xl p-8 text-center shadow-soft hover:shadow-card transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <section.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-body font-semibold text-xl mb-4" style={{ letterSpacing: '-0.02em' }}>{section.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{section.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Third-Party Testing Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-body text-3xl md:text-4xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
                THIRD-PARTY TESTED
              </h2>
              <p className="text-muted-foreground text-lg">
                Every batch is independently tested for purity, potency, and safety. Here are the results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testCards.map((card, index) => (
                <motion.div 
                  key={card.name} 
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Test Report</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                      {card.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{card.name}</h4>
                  <p className="text-xs text-muted-foreground">{card.date}</p>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <a href={card.researchUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-medium flex items-center gap-1 hover:text-accent transition-colors">
                      View Research
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Badges Section */}
        <section className="py-20">
          <div className="container-wide">
            <motion.h2 
              className="font-body text-3xl md:text-4xl font-semibold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              QUALITY STANDARDS
            </motion.h2>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {qualityBadges.map((badge) => (
                <span 
                  key={badge} 
                  className="flex items-center gap-2 bg-card px-5 py-3 rounded-full shadow-soft border border-border/50 text-sm font-medium"
                >
                  <Award className="h-4 w-4 text-primary" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* All 13 Products Ingredient Breakdown */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-body text-3xl md:text-4xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
                WHAT'S INSIDE EVERY STRIP
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                13 formulas. Every ingredient listed. Every dosage shown. Because you should know exactly what you're putting in your body.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredientBreakdown.map((item, index) => (
                <motion.div 
                  key={item.product} 
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-card transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl">{item.icon}</span>
                    <h4 className="font-body font-semibold text-foreground text-lg" style={{ letterSpacing: '-0.02em' }}>{item.product}</h4>
                  </div>
                  <div className="space-y-3">
                    {item.ingredients.map((ingredient) => (
                      <div key={ingredient.name} className="border-l-2 border-primary/30 pl-3">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-foreground text-sm">{ingredient.name}</span>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {ingredient.benefit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Research & References Section */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-body text-3xl md:text-4xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
                THE RESEARCH
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                We don't ask you to trust us. We ask you to trust the science. Here are the peer-reviewed studies behind our key ingredients.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { emoji: '\u{1F344}', name: "Lion's Mane", summary: "Supports cognitive function and nerve growth factor production. Studied for memory and focus benefits.", url: 'https://pubmed.ncbi.nlm.nih.gov/38004235/' },
                { emoji: '\u{1F319}', name: 'Melatonin', summary: "Regulates the sleep-wake cycle and may reduce time to fall asleep. One of the most widely studied sleep ingredients.", url: 'https://pubmed.ncbi.nlm.nih.gov/31619178/' },
                { emoji: '\u2728', name: 'Collagen & Biotin', summary: "Supports skin elasticity, hair strength, and nail growth. Peer-reviewed for beauty benefits.", url: 'https://pubmed.ncbi.nlm.nih.gov/28701385/' },
                { emoji: '\u{1F33F}', name: 'Ashwagandha', summary: "Adaptogenic herb studied for stress reduction, cortisol regulation, and mental well-being.", url: 'https://pubmed.ncbi.nlm.nih.gov/32021735/' },
                { emoji: '\u{1F344}', name: 'Cordyceps', summary: "Traditional mushroom studied for energy metabolism, endurance, and oxygen utilization.", url: 'https://pubmed.ncbi.nlm.nih.gov/35103413/' },
                { emoji: '\u26A1', name: 'Caffeine + L-Theanine', summary: "Synergistic combination studied for clean energy, sustained focus, and reduced jitter effects.", url: 'https://www.tandfonline.com/doi/abs/10.1080/10408398.2020.1781051' },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{item.emoji}</span>
                    <h4 className="font-body font-semibold text-lg text-foreground">{item.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{item.summary}</p>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-primary font-medium flex items-center gap-1 hover:text-accent transition-colors mt-auto"
                  >
                    View Study \u2192
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.p 
              className="text-xs text-muted-foreground text-center mt-10 max-w-3xl mx-auto italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              All cited research is independent third-party science. References are provided for transparency. Individual results may vary. These statements have not been evaluated by the FDA.
            </motion.p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <motion.h2 
              className="font-body text-3xl md:text-4xl font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              See what the right ingredients can do.
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Real dosages. Real testing. A format you'll actually use.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-10 text-lg font-semibold rounded-lg" asChild>
                <Link to="/shop">Find Your Strip \u2192</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
