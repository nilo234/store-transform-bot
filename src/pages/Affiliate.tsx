import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Affiliate() {
  const [form, setForm] = useState({ name: '', email: '', platform: '', reach: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application received! We'll review and reply within 3 business days.");
    setForm({ name: '', email: '', platform: '', reach: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="Affiliate Program | NEUVIE™" description="Earn 15% commission on every sale you drive. 30-day cookie. Monthly PayPal payouts." />
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-secondary/30 text-center">
          <div className="container-wide max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>Earn with NEUVIE</h1>
            <p className="text-lg text-muted-foreground">15% commission on every sale you drive.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-wide max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-card border border-border/30 rounded-xl p-6 text-center">
              <div className="font-display text-3xl text-accent mb-1">15%</div>
              <div className="text-sm text-muted-foreground">Per Sale</div>
            </div>
            <div className="bg-card border border-border/30 rounded-xl p-6 text-center">
              <div className="font-display text-3xl text-accent mb-1">30-Day</div>
              <div className="text-sm text-muted-foreground">Cookie</div>
            </div>
            <div className="bg-card border border-border/30 rounded-xl p-6 text-center">
              <div className="font-display text-3xl text-accent mb-1">Monthly</div>
              <div className="text-sm text-muted-foreground">PayPal Payouts</div>
            </div>
          </div>

          <div className="container-wide max-w-2xl mx-auto bg-card border border-border/30 rounded-2xl p-8 shadow-soft">
            <h2 className="font-display text-2xl mb-6 text-center">Apply Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <Input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              <Input placeholder="Platform (Instagram, TikTok, YouTube, blog…)" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} required />
              <Input placeholder="Monthly audience reach" value={form.reach} onChange={e => setForm({ ...form, reach: e.target.value })} required />
              <Textarea placeholder="Tell us about your audience and content" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              <Button type="submit" className="w-full" size="lg">Apply Now →</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
