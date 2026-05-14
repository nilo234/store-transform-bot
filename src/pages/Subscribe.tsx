import { Link } from 'react-router-dom';
import { Wallet, Truck, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How does Subscribe & Save work?', a: 'Pick your strip, choose your delivery frequency, and we ship it auto each cycle at 20% off the one-time price. Free shipping always included.' },
  { q: 'When am I charged?', a: 'You\'re charged on the day each order ships. You\'ll get an email reminder 3 days before every renewal.' },
  { q: 'Can I skip or pause a delivery?', a: 'Yes — log in or email hello@tryneuvie.com any time before your next renewal date.' },
  { q: 'How do I cancel?', a: 'Cancel anytime via the link in your order email or by emailing hello@tryneuvie.com. No fees, no hoops.' },
  { q: 'Can I change my product?', a: 'Yes. Swap to any other strip at any time from your subscription dashboard.' },
];

const benefits = [
  { icon: Wallet, title: 'Save 20%', text: 'Lower price every order, automatic.' },
  { icon: Truck, title: 'Free Shipping Always', text: 'No minimum required on subscription orders.' },
  { icon: X, title: 'Cancel Anytime', text: 'No commitment. No fees. Total flexibility.' },
];

export default function Subscribe() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="Subscribe & Save 20% | NEUVIE™" description="Save 20% on every NEUVIE order with Subscribe & Save. Free shipping. Cancel anytime." />
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-primary text-primary-foreground text-center">
          <div className="container-wide max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>Subscribe & Save 20%</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">Auto-delivered every month. No commitment. Free shipping every order.</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Link to="/shop">Browse Strips →</Link></Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container-wide max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="text-center bg-card border border-border/30 rounded-2xl p-8 shadow-soft">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container-wide max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-10" style={{ letterSpacing: '-0.02em' }}>Frequently Asked</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`} className="bg-card border border-border/30 rounded-xl px-5">
                  <AccordionTrigger className="font-display text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
