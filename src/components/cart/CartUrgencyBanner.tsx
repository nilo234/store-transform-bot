import { Truck, Shield, RotateCcw } from 'lucide-react';

export function CartUrgencyBanner() {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-primary" />
          <span>Free shipping $50+</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5 text-primary" />
          <span>60-day guarantee</span>
        </div>
      </div>
    </div>
  );
}
