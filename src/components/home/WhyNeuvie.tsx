import { motion } from 'framer-motion';
import { Check, Sparkles, Shield, Leaf, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import hairSkinNailsImg from '@/assets/neuvie-hair-skin-nails.png';

const certifications = [
  { icon: '🌿', label: 'Non-GMO' },
  { icon: '✅', label: 'Third-Party Tested' },
  { icon: '🧪', label: 'Clinically Dosed' },
  { icon: '🇺🇸', label: 'Made in USA' },
];

const features = [
  {
    icon: Leaf,
    title: 'Your body deserves the truth.',
    description: "Every ingredient is traceable, independently tested, and chosen because it works. Not because it's trendy — because your body is worth more than shortcuts.",
  },
  {
    icon: FlaskConical,
    title: 'Real dosages. Real results.',
    description: "We formulate at levels that are studied to make a difference. If it's in your strip, it's there because you deserve more than a label claim.",
  },
  {
    icon: Shield,
    title: 'Tested before it ever reaches you.',
    description: "Every batch goes through independent third-party testing. Because the things you put in your body should never be a question mark. Made in the USA. Always.",
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
              WHY NEUVIE?
            </span>
            <h2 className="font-body text-3xl md:text-4xl lg:text-5xl font-semibold mb-6" style={{ letterSpacing: '-0.02em' }}>
              Made for people who don't settle.
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed mb-8 space-y-2">
              <p>Most supplements end up forgotten in a drawer.</p>
              <p>Not because people stop caring about their health. Because the routine was too complicated to keep.</p>
              <p>Neuvie strips were built for the opposite.</p>
              <p>No water. No pills. 30 seconds.</p>
              <p className="font-medium text-foreground">Just you — taking care of you, every day.</p>
            </div>
            
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
                Read the science behind it →
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
            <div className="rounded-3xl overflow-hidden mb-8">
              <img 
                src={hairSkinNailsImg} 
                alt="Neuvie Hair, Skin and Nails Strips - Citrus Gleam" 
                className="w-full h-[400px] md:h-[500px] lg:h-auto object-cover object-center"
              />
            </div>
            
            {/* Certifications */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <p className="text-sm font-semibold text-center text-muted-foreground mb-4">
                Every strip we make is...
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
