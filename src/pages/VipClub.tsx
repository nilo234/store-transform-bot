import { useState } from 'react';
import { Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const benefits = [
  '20% OFF instantly on first order',
  'Early access to new product launches',
  'Exclusive member-only drops',
  'Priority customer support',
  'Free shipping on every order',
];

export default function VipClub() {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    toast.success("You're in! Check your phone for your 20% off code.");
    setPhone('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="NEUVIE VIP Club — Get 20% OFF" description="Join the NEUVIE VIP Club and get 20% off your first order plus early access to new launches." />
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-primary text-primary-foreground">
          <div className="container-wide max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>Join the NEUVIE VIP Club</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">Get 20% OFF your first order — instantly.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <Input type="tel" placeholder="Your phone number" value={phone} onChange={e => setPhone(e.target.value)} required className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-xl flex-1" />
              <Button type="submit" className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground px-6 font-semibold rounded-xl">Join & Get 20% OFF →</Button>
            </form>
            <p className="text-xs text-primary-foreground/50 max-w-md mx-auto">Recurring automated marketing texts from NEUVIE. Reply STOP to unsubscribe. Msg & data rates may apply.</p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-wide max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-10" style={{ letterSpacing: '-0.02em' }}>Member Benefits</h2>
            <div className="space-y-4">
              {benefits.map(b => (
                <div key={b} className="flex items-center gap-4 bg-card border border-border/30 rounded-xl p-5 shadow-soft">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
