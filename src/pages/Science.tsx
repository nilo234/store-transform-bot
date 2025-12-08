import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Shield, Leaf, FlaskConical, Award } from 'lucide-react';

export default function Science() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">The Science Behind Neuvie</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find out how we transform cutting-edge science into powerful supplements through research, quality, and innovation.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container-wide grid md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Sourcing', desc: 'Ethically sourced, premium ingredients from trusted suppliers.' },
              { icon: FlaskConical, title: 'Efficacy', desc: 'Science-backed formulas designed for maximum absorption.' },
              { icon: Shield, title: 'Quality', desc: 'Third-party tested to ensure purity and potency.' },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-8 text-center shadow-soft">
                <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="py-16 bg-muted/30">
          <div className="container-wide text-center">
            <h2 className="font-display text-3xl font-bold mb-8">Quality Badges</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {['Ethically Sourced', 'Third-Party Tested', 'Non-GMO', 'Free from Heavy Metals', 'Maximum Quality', 'Satisfaction Guaranteed'].map((badge) => (
                <span key={badge} className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
                  <Award className="h-4 w-4 text-primary" /> {badge}
                </span>
              ))}
            </div>
            <Button className="btn-primary mt-12">View Research</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}