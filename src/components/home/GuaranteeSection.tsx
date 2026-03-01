import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GuaranteeSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-wide">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            14-DAY MONEY-BACK GUARANTEE
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            We'd be shocked if you didn't feel the effects and enjoy the benefits of Neuvie. 
            But in the highly unlikely event that you're not happy in any way — 
            <span className="text-foreground font-medium"> we'll give you every cent back</span>. 
            No hassle. No hoops to jump through.
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            You're protected by our <span className="font-semibold text-primary">14-Day Money-Back Guarantee</span>. 
            Email us at{' '}
            <a href="mailto:hello@neuvie.com" className="text-primary hover:underline">
              hello@neuvie.com
            </a>{' '}
            and we'll return every dollar you paid on your first order, less shipping costs.
          </p>

          <Link to="/shop">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 font-semibold rounded-lg">
              Shop Now Risk-Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
