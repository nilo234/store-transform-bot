import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function TrackOrder() {
  const [orderNum, setOrderNum] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Tracking lookup coming soon — please check the shipment confirmation email we sent you, or email hello@tryneuvie.com.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="Track My Order | NEUVIE™" description="Track your NEUVIE order status. Enter your order number and email to see live tracking." />
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container-wide max-w-md mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>Track Your Order</h1>
            <p className="text-muted-foreground mb-10">Enter your order number and email to see your latest delivery status.</p>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <Input placeholder="Order number" value={orderNum} onChange={e => setOrderNum(e.target.value)} required />
              <Input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
              <Button type="submit" className="w-full" size="lg">Track Order →</Button>
            </form>
            <div className="mt-10 text-sm text-muted-foreground space-y-2">
              <p>Questions? <a href="mailto:hello@tryneuvie.com" className="text-accent hover:underline">hello@tryneuvie.com</a></p>
              <p><Link to="/shipping" className="text-primary hover:underline">View Shipping Info →</Link></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
