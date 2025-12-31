import { motion } from 'framer-motion';
import { Target, Brain, Zap, Heart } from 'lucide-react';

interface ClinicalResultsProps {
  productType?: string;
}

const clinicalData: Record<string, { title: string; stats: Array<{ icon: any; label: string; percentage: number }> }> = {
  mushroom: {
    title: "Clinically shown to support cognitive function*",
    stats: [
      { icon: Target, label: "Improved focus", percentage: 78 },
      { icon: Brain, label: "Mental clarity", percentage: 74 },
      { icon: Zap, label: "Sustained energy", percentage: 70 },
    ]
  },
  energy: {
    title: "Clinically shown to support natural energy*",
    stats: [
      { icon: Zap, label: "Energy boost", percentage: 82 },
      { icon: Target, label: "Better focus", percentage: 76 },
      { icon: Heart, label: "Reduced fatigue", percentage: 71 },
    ]
  },
  sleep: {
    title: "Clinically shown to support restful sleep*",
    stats: [
      { icon: Heart, label: "Sleep quality", percentage: 85 },
      { icon: Brain, label: "Relaxation", percentage: 79 },
      { icon: Zap, label: "Morning energy", percentage: 72 },
    ]
  },
  default: {
    title: "Clinically shown to support your wellness*",
    stats: [
      { icon: Heart, label: "Overall wellness", percentage: 80 },
      { icon: Target, label: "Effectiveness", percentage: 76 },
      { icon: Zap, label: "Energy levels", percentage: 72 },
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
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              {data.title}
            </h2>
            <p className="text-muted-foreground">
              Results observed after 60 days of consistent use
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
            *Based on customer surveys. Individual results may vary. See our Science page for more information.
          </p>
        </div>
      </div>
    </section>
  );
};
