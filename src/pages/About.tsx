import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Check, Leaf, Heart, Award, Users } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We source only the finest natural ingredients, ensuring every product is free from artificial additives and harmful chemicals.',
  },
  {
    icon: Award,
    title: 'Science-Backed',
    description: 'Our formulas are developed by experts using clinically studied dosages for maximum effectiveness.',
  },
  {
    icon: Heart,
    title: 'Quality First',
    description: 'Every batch is third-party tested for purity, potency, and safety. We never compromise on quality.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Your wellness journey is our priority. We stand behind every product with our 60-day guarantee.',
  },
];

const stats = [
  { number: '50,000+', label: 'Happy Customers' },
  { number: '99%', label: 'Satisfaction Rate' },
  { number: '9', label: 'Premium Products' },
  { number: '60 Days', label: 'Money-Back Guarantee' },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - TryAuri Style */}
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
                At Neuvie, we believe that wellness should be simple, effective, and delicious. Our mission is to create premium supplements that help you feel your best every day.
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
                    Neuvie was born from a simple belief: everyone deserves access to premium, effective supplements that actually work.
                  </p>
                  <p>
                    We noticed that the supplement industry was full of products with questionable ingredients, ineffective dosages, and confusing labels. We set out to change that.
                  </p>
                  <p>
                    Today, Neuvie is trusted by over 50,000 customers who've discovered the difference that quality makes. Every product is crafted with science-backed ingredients, third-party tested for purity, and designed for maximum absorption.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-muted/60 to-muted/30 rounded-3xl aspect-square flex items-center justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-8xl">🌿</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section - TryAuri Style */}
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
                  'No artificial colors, flavors, or preservatives',
                  'Manufactured in GMP-certified facilities',
                  '60-day money-back guarantee',
                  'Responsive customer support team',
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
