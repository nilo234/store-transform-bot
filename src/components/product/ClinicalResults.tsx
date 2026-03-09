import { motion } from 'framer-motion';
import { Target, Brain, Zap, Heart } from 'lucide-react';

interface ClinicalResultsProps {
  productType?: string;
}

const clinicalData: Record<string, { title: string; stats: Array<{ icon: any; label: string; percentage: number }> }> = {
  mushroom: {
    title: "What people felt after choosing themselves for 60 days*",
    stats: [
      { icon: Target, label: "Felt sharper and more present in their day", percentage: 78 },
      { icon: Brain, label: "Noticed clearer, calmer thinking", percentage: 74 },
      { icon: Zap, label: "Felt more steady energy without the crash", percentage: 70 },
    ]
  },
  energy: {
    title: "What people felt after choosing themselves for 60 days*",
    stats: [
      { icon: Zap, label: "Felt energized without relying on caffeine alone", percentage: 82 },
      { icon: Target, label: "Stayed focused on what matters longer", percentage: 76 },
      { icon: Heart, label: "Felt less drained by the afternoon", percentage: 71 },
    ]
  },
  sleep: {
    title: "What people felt after choosing rest for 60 days*",
    stats: [
      { icon: Heart, label: "Fell asleep easier and woke up feeling cared for", percentage: 85 },
      { icon: Brain, label: "Felt calmer and more at peace before bed", percentage: 79 },
      { icon: Zap, label: "Woke up feeling like they actually rested", percentage: 72 },
    ]
  },
  default: {
    title: "What people felt after showing up for themselves for 60 days*",
    stats: [
      { icon: Heart, label: "Felt a real difference in how they show up each day", percentage: 80 },
      { icon: Target, label: "Made it a part of their self-care ritual", percentage: 76 },
      { icon: Zap, label: "Felt more consistent, grounded energy", percentage: 72 },
    ]
  }
};

export const ClinicalResults = ({ productType = "default" }: ClinicalResultsProps) => {
  const data = clinicalData[productType] || clinicalData.default;

  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl mb-4" style={{ letterSpacing: '-0.02em' }}>
              {data.title}
            </h2>
            <p className="text-muted-foreground">
              Real people. Real consistency. Real results from showing up for themselves every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-2xl p-6 text-center border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.percentage}%
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            *Based on self-reported customer surveys. Individual results may vary. These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </section>
  );
};
