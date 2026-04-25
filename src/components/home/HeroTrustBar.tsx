import { Shield, Truck, Star, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const trustItems = [
  { icon: Shield, label: '14-Day Money Back' },
  { icon: Truck, label: 'Free US Shipping $50+' },
  { icon: Star, label: '2,400+ Verified Reviews' },
];

export function HeroTrustBar() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      {trustItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2.5 bg-card/60 backdrop-blur-sm border border-border/40 rounded-xl px-4 py-3"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <item.icon className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xs font-semibold text-foreground leading-tight">{item.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
