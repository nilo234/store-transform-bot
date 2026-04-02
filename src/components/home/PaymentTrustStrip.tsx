import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';
import { PaymentBadges } from '@/components/layout/PaymentBadges';

export function PaymentTrustStrip() {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 pt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <PaymentBadges />
      <div className="flex items-center gap-5 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" />
          <span className="text-[11px] font-medium">SSL Secured</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span className="text-[11px] font-medium">256-bit Encryption</span>
        </div>
      </div>
    </motion.div>
  );
}
