import { Clock, Flame, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function CartUrgencyBanner() {
  const [viewerCount, setViewerCount] = useState(23);

  // Simulate real-time viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(15, Math.min(45, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 space-y-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 text-destructive">
        <Flame className="w-4 h-4" />
        <span className="text-sm font-semibold">High Demand Alert</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{viewerCount} people viewing</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>127 sold today</span>
        </div>
      </div>
    </motion.div>
  );
}
