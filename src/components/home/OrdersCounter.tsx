import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function OrdersCounter() {
  return (
    <motion.div 
      className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-1.5">
        <Users className="w-4 h-4 text-accent" />
      </div>
      <span className="text-sm font-semibold text-foreground">
        Join <span className="text-accent">50,000+</span> daily routines
      </span>
    </motion.div>
  );
}
