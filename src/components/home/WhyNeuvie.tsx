import { motion } from 'framer-motion';
import { Check, Sparkles, Shield, Leaf, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const certifications = [
  { icon: '🌿', label: 'Non-GMO' },
  { icon: '✅', label: 'Third-Party Tested' },
  { icon: '🧪', label: 'Clinically Dosed' },
  { icon: '🇺🇸', label: 'Made in USA' },
];

const features = [
  {
    icon: Leaf,
    title: 'Premium Sourcing',
    description: 'We source the highest quality ingredients from trusted suppliers worldwide. Every ingredient is traceable and verified for purity.',
  },
  {
    icon: FlaskConical,
    title: 'Science-Backed',
    description: 'Our strips are formulated with clinically studied dosages. No fillers, no fluff—just ingredients proven to work.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Every batch is independently tested for purity, potency, and safety. We exceed industry standards, guaranteed.',
  },
];

export function WhyNeuvie() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              WHY NEUVIE?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe wellness should be simple, effective, and fit seamlessly into your life. 
              Our fast-dissolving oral strips deliver premium, science-backed ingredients in a format 
              that goes wherever you go. No water. No pills. Just results.
            </p>
            
            {/* Feature list */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link to="/science">
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Learn About Our Science
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Right: Visual + Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Visual card */}
            <div className="bg-gradient-to-br from-muted/60 to-muted/30 rounded-3xl p-8 md:p-12 mb-8">
              <div className="text-center mb-8">
                <span className="text-6xl mb-4 block">💊</span>
                <h3 className="font-display font-bold text-2xl mb-2">13 Premium Strips</h3>
                <p className="text-muted-foreground">For every wellness need</p>
              </div>
              
              {/* All products */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  'Energy', 'Sleep', 'Focus', 
                  'Beauty', 'Hair', 'Gut',
                  'Iron', 'Bone', 'Hangover'
                ].map((product) => (
                  <div 
                    key={product}
                    className="bg-background/80 backdrop-blur-sm rounded-xl p-3 text-center shadow-soft"
                  >
                    <span className="text-xs font-medium text-muted-foreground">{product}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Certifications */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <p className="text-sm font-semibold text-center text-muted-foreground mb-4">
                All our products are...
              </p>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div 
                    key={cert.label}
                    className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3"
                  >
                    <span className="text-xl">{cert.icon}</span>
                    <span className="text-sm font-medium">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
