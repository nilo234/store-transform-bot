import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container-wide max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">About Neuvie</h1>
          <p className="text-lg text-muted-foreground mb-6">
            At Neuvie, we believe that wellness should be simple, effective, and delicious. Our mission is to create premium supplements that help you feel your best every day.
          </p>
          <p className="text-muted-foreground mb-6">
            Every product is crafted with science-backed ingredients, third-party tested for purity, and designed for maximum absorption. We're committed to transparency, quality, and your satisfaction.
          </p>
          <p className="text-muted-foreground">
            Join thousands of customers who trust Neuvie for their daily wellness routine.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}