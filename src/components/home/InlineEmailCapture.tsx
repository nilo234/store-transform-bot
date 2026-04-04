import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Loader2, Gift } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function InlineEmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    
    setStatus('loading');
    
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      await fetch(`${supabaseUrl}/functions/v1/klaviyo-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage_inline' }),
      });
    } catch {
      // Silent fail — still show success
    }
    
    setStatus('success');
    setEmail('');
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Check className="h-5 w-5 text-primary" />
        </div>
        <p className="font-semibold text-foreground">You're in! 💛</p>
        <p className="text-sm text-muted-foreground mt-1">Check your inbox for your 10% discount code.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border/40 rounded-2xl p-6 md:p-8 max-w-lg mx-auto"
    >
      <div className="flex items-center gap-2 mb-2 justify-center">
        <Gift className="h-4 w-4 text-accent" />
        <span className="text-sm font-semibold text-accent">Get 10% Off Your First Order</span>
      </div>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Join 10,000+ wellness lovers who start their day with NEUVIE.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 rounded-xl flex-1"
        />
        <Button 
          type="submit" 
          disabled={status === 'loading'}
          className="h-12 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shrink-0"
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
      <p className="text-[10px] text-muted-foreground text-center mt-2">No spam. Unsubscribe anytime.</p>
    </motion.div>
  );
}
