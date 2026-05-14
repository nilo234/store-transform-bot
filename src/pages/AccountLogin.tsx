import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AccountLogin() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Customer accounts are managed through Shopify — you\'ll be redirected to complete login during checkout.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="My Account | NEUVIE™" description="Log in to your NEUVIE account to view orders, manage subscriptions, and track shipments." />
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container-wide max-w-md mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-2 text-center" style={{ letterSpacing: '-0.02em' }}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-muted-foreground text-center mb-8">{mode === 'login' ? 'Log in to view orders and subscriptions.' : 'Join NEUVIE to track orders and earn VIP rewards.'}</p>
            <form onSubmit={handleSubmit} className="bg-card border border-border/30 rounded-2xl p-8 shadow-soft space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <Button type="submit" className="w-full" size="lg">{mode === 'login' ? 'Login →' : 'Create Account →'}</Button>
              {mode === 'login' && <button type="button" className="text-sm text-muted-foreground hover:text-accent w-full text-center">Forgot password?</button>}
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-accent hover:underline font-semibold">
                {mode === 'login' ? 'Create Account' : 'Login'}
              </button>
            </p>
            <p className="text-center text-xs text-muted-foreground mt-8">
              Need to track an order? <Link to="/track" className="text-accent hover:underline">Track Order →</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
