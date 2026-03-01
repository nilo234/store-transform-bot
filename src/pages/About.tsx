import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Check, Leaf, Heart, Award, Users } from 'lucide-react';
import { PageMeta } from '@/components/seo';

const values = [
  {
    icon: Leaf,
    title: 'Premium Ingredients',
    description: 'We source only the finest natural ingredients from trusted suppliers worldwide. Every ingredient is verified for purity and potency.',
  },
  {
    icon: Award,
    title: 'Science-Backed Formulas',
    description: 'Our strips are developed by experts using clinically studied dosages. No fillers, no fluff—just purposeful ingredients.',
  },
  {
    icon: Heart,
    title: 'Quality First',
    description: 'Every batch is third-party tested for purity, potency, and safety. We exceed industry standards because you deserve the best.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Your wellness journey is our priority. We stand behind every product with our 14-day money-back guarantee.',
  },
];

const stats = [
  { number: '50,000+', label: 'Happy Customers' },
  { number: '99%', label: 'Satisfaction Rate' },
  { number: '13', label: 'Premium Strips' },
  { number: '14 Days', label: 'Money-Back Guarantee' },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="About NEUVIE™ – Our Story & Mission"
        description="Learn how NEUVIE™ is transforming wellness with fast-dissolving oral strips. Premium ingredients, third-party tested, trusted by 50,000+ customers worldwide."
      />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ABOUT NEUVIE
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                We believe wellness should be simple, effective, and fit seamlessly into your life. That's why we created fast-dissolving oral strips with science-backed ingredients—supplements you can take anywhere, anytime.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  OUR STORY
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Neuvie was born from a simple frustration: supplements are inconvenient. Pills are hard to swallow, powders are messy, and most products are filled with unnecessary additives.
                  </p>
                  <p>
                    We set out to create a better way. Our fast-dissolving oral strips deliver premium, science-backed ingredients in a format that fits your lifestyle. No water needed. No pills to choke on. Just place a strip on your tongue and go.
                  </p>
                  <p>
                    Today, Neuvie offers 13 unique strips—from Energy and Focus to Sleep and Beauty—each formulated to support your wellness goals. Trusted by over 50,000 customers, we're showing that effective supplementation doesn't have to be complicated.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-muted/60 to-muted/30 rounded-3xl aspect-square flex items-center justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-8xl">💊</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-display text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                  <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container-wide">
            <motion.h2 
              className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              OUR VALUES
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-card rounded-2xl p-8 text-center shadow-soft"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.h2 
                className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                OUR COMMITMENT TO YOU
              </motion.h2>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {[
                  'Third-party tested for purity and potency',
                  'Clinically studied ingredient dosages',
                  'Fast-dissolving oral strip format',
                  'No artificial colors or preservatives',
                  'Non-GMO and ethically sourced ingredients',
                  '14-day money-back guarantee — no questions asked',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-soft">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
