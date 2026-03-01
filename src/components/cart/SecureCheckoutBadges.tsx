import { Shield, Lock, CreditCard } from 'lucide-react';

export function SecureCheckoutBadges() {
  return (
    <div className="space-y-3">
      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span className="text-xs font-medium">SSL Secure</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-medium">256-bit Encryption</span>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="flex items-center justify-center gap-3">
        <div className="bg-muted/50 rounded px-2 py-1">
          <span className="text-xs font-bold text-muted-foreground">VISA</span>
        </div>
        <div className="bg-muted/50 rounded px-2 py-1">
          <span className="text-xs font-bold text-muted-foreground">MC</span>
        </div>
        <div className="bg-muted/50 rounded px-2 py-1">
          <span className="text-xs font-bold text-muted-foreground">AMEX</span>
        </div>
        <div className="bg-muted/50 rounded px-2 py-1">
          <span className="text-xs font-bold text-muted-foreground">PayPal</span>
        </div>
        <div className="bg-muted/50 rounded px-2 py-1">
          <span className="text-xs font-bold text-muted-foreground">Apple Pay</span>
        </div>
      </div>
      
      {/* Guarantee */}
      <p className="text-center text-xs text-muted-foreground">
        ✓ 14-Day Money-Back Guarantee • ✓ Free Returns
      </p>
    </div>
  );
}
