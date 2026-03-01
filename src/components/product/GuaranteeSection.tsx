import { motion } from 'framer-motion';
import { Shield, RotateCcw, Mail, CheckCircle2 } from 'lucide-react';

export const GuaranteeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              14-Day Money-Back Guarantee
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We'd be shocked if you didn't love Neuvie Strips. But in the unlikely event you're not 
              100% satisfied, we'll refund your first order — no questions asked.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Risk-Free Trial</p>
                <p className="text-xs text-muted-foreground">14 days to decide</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Free Returns</p>
                <p className="text-xs text-muted-foreground">US customers</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">24hr Support</p>
                <p className="text-xs text-muted-foreground">hello@neuvie.com</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Valid for 14 days on your first order. Contact us at{' '}
              <a href="mailto:hello@neuvie.com" className="text-primary hover:underline">
                hello@neuvie.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
