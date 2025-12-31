import { motion } from 'framer-motion';

interface StockIndicatorProps {
  percentSold?: number;
}

export const StockIndicator = ({ percentSold = 83 }: StockIndicatorProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-destructive font-medium">Low Stock</span>
        <span className="text-muted-foreground">{percentSold}% Sold</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentSold}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
