import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Shield, Leaf, FlaskConical, Award, Check, ExternalLink } from 'lucide-react';

// Proven Purity sections - TryAuri Style
const puritySections = [
  { 
    icon: Leaf, 
    title: 'SOURCING', 
    description: 'We source only the finest ingredients from trusted, ethical suppliers around the world. Every ingredient is traceable and verified for purity.' 
  },
  { 
    icon: FlaskConical, 
    title: 'EFFICACY', 
    description: 'Our formulas are developed by experts using clinically studied dosages. We use bioavailable forms for maximum absorption and effectiveness.' 
  },
  { 
    icon: Shield, 
    title: 'QUALITY', 
    description: 'Every batch is third-party tested for purity, potency, and safety. We exceed industry standards to ensure you get the best.' 
  },
];

// Product test cards - TryAuri Style
const testCards = [
  { name: 'Digestive + Gut Health', status: 'Passed', date: 'Dec 2024' },
  { name: 'Hair, Skin & Nails', status: 'Passed', date: 'Dec 2024' },
  { name: 'Mushroom Focus', status: 'Passed', date: 'Dec 2024' },
  { name: 'Cognitive Relax', status: 'Passed', date: 'Dec 2024' },
];

// Quality badges - TryAuri Style
const qualityBadges = [
  'Ethically Sourced',
  'Satisfaction Guaranteed',
  'Maximum Quality',
  'Third-Party Tested',
  'Non-GMO',
  'Free from Heavy Metals',
];

// Ingredients breakdown - TryAuri Style
const ingredientBreakdown = [
  {
    product: 'Digestive + Gut Health',
    ingredients: ['Probiotics', 'Digestive Enzymes', 'Ginger Root'],
    icon: '🦠',
  },
  {
    product: 'Hair, Skin & Nails',
    ingredients: ['Biotin', 'Vitamin C', 'Vitamin E'],
    icon: '✨',
  },
  {
    product: 'Mushroom Focus',
    ingredients: ["Lion's Mane", 'Reishi', 'Cordyceps'],
    icon: '🍄',
  },
  {
    product: 'Cognitive Relax',
    ingredients: ['L-Theanine', 'Ashwagandha', 'GABA'],
    icon: '🧘',
  },
  {
    product: 'Bone Support',
    ingredients: ['Vitamin D3', 'Vitamin K2', 'Calcium'],
    icon: '🦴',
  },
  {
    product: 'Hangover Relief',
    ingredients: ['Milk Thistle', 'Ginger', 'Electrolytes'],
    icon: '💧',
  },
];

export default function Science() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - TryAuri Style */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide text-center">
            <motion.h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
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
              Find out how we transform cutting-edge science into powerful supplements through research, quality, and innovation.
            </motion.p>
          </div>
        </section>

        {/* Proven Purity Section - TryAuri Style */}
        <section className="py-20">
          <div className="container-wide">
            <motion.h2 
              className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              PROVEN PURITY
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
                  <h3 className="font-display font-bold text-xl mb-4">{section.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{section.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Third-Party Testing Section - TryAuri Style */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                PURE INGREDIENTS
              </h2>
              <p className="text-muted-foreground text-lg">
                Every product is third-party tested for purity and potency.
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
                    <span className="text-xs text-primary font-medium flex items-center gap-1 cursor-pointer hover:text-accent transition-colors">
                      View Certificate
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Badges Section - TryAuri Style */}
        <section className="py-20">
          <div className="container-wide">
            <motion.h2 
              className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
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

        {/* Ingredient Breakdown Section - TryAuri Style */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                DIRECT FROM MOTHER NATURE
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Each product is carefully formulated with premium, science-backed ingredients.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredientBreakdown.map((item, index) => (
                <motion.div 
                  key={item.product} 
                  className="bg-card rounded-2xl p-6 shadow-soft"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{item.icon}</span>
                    <h4 className="font-semibold text-foreground">{item.product}</h4>
                  </div>
                  <div className="space-y-2">
                    {item.ingredients.map((ingredient) => (
                      <div key={ingredient} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - TryAuri Style */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <motion.h2 
              className="font-display text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Backed by Science, Trusted by Thousands
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Explore our clinical studies and research documentation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-10 text-lg font-semibold rounded-lg">
                VIEW RESEARCH
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
