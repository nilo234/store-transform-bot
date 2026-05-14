import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Subscriptions() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Magic link sent! Check your email to manage your subscriptions.");
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="Manage Subscriptions | NEUVIE™" description="Pause, skip, change frequency, or cancel your NEUVIE subscription anytime." />
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container-wide max-w-md mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>Manage Your NEUVIE Subscription</h1>
            <p className="text-muted-foreground mb-10">Enter your email and we'll send you a secure link to your subscription dashboard.</p>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <Input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
              <Button type="submit" className="w-full" size="lg">Access My Subscriptions →</Button>
            </form>
            <div className="mt-12 bg-card border border-border/30 rounded-2xl p-6 text-left">
              <h2 className="font-display text-xl mb-4">From your dashboard you can:</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Pause a delivery</li>
                <li>• Skip the next shipment</li>
                <li>• Change product</li>
                <li>• Change delivery frequency</li>
                <li>• Cancel anytime — no fees</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground mt-6">Need help? <a href="mailto:hello@tryneuvie.com" className="text-accent hover:underline">hello@tryneuvie.com</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
