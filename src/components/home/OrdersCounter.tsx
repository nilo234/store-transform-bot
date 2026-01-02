import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package } from 'lucide-react';

export function OrdersCounter() {
  const [ordersToday, setOrdersToday] = useState(247);

  // Simulate orders incrementing
  useEffect(() => {
    const interval = setInterval(() => {
      setOrdersToday(prev => prev + Math.floor(Math.random() * 3));
    }, 30000); // Add 0-2 orders every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <Package className="w-4 h-4 text-accent" />
      </div>
      <span className="text-sm font-semibold text-foreground">
        <span className="text-accent">{ordersToday.toLocaleString()}</span> orders today
      </span>
      <TrendingUp className="w-4 h-4 text-accent" />
    </motion.div>
  );
}
