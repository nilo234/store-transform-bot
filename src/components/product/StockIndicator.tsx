import { Check, Truck } from 'lucide-react';

export const StockIndicator = () => {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1.5 text-primary">
        <Check className="h-4 w-4" />
        <span className="font-medium">In Stock</span>
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Truck className="h-4 w-4" />
        <span>Ships within 1–2 business days</span>
      </div>
    </div>
  );
};
