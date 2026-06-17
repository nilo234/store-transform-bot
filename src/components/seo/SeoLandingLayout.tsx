import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, Truck, Flag, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PageMeta } from '@/components/seo';

export interface SeoSection {
  /** H2 headline (main keyword) */
  h2: string;
  /** 2–3 sentence intro */
  intro: string;
  /** 3 scannable benefit bullets */
  benefits: string[];
  /** Plain-language how-it-works paragraph */
  how: string;
  /** Soft bridge to Neuvie */
  bridge: string;
  /** Long-tail FAQ */
  faq: { q: string; a: string };
  /** Optional CTA target (defaults to /shop) */
  ctaHref?: string;
  /** Optional CTA label */
  ctaLabel?: string;
}

export interface SeoLandingProps {
  title: string;
  description: string;
  h1: string;
  lede: string;
  sections: SeoSection[];
  primaryCta?: { href: string; label: string };
}

export function SeoLandingLayout({
  title,
  description,
  h1,
  lede,
  sections,
  primaryCta = { href: '/shop', label: 'Shop the Collection' },
}: SeoLandingProps) {
  // FAQ JSON-LD for SERP rich results
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sections.map((s) => ({
      '@type': 'Question',
      name: s.faq.q,
      acceptedAnswer: { '@type': 'Answer', text: s.faq.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageMeta title={title} description={description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/40 border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-6">
              {h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {lede}
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link to={primaryCta.href}>
                {primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {/* Trust row */}
            <ul className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <li className="flex items-center justify-center gap-2"><Flag className="h-4 w-4 text-accent" /> Made in USA</li>
              <li className="flex items-center justify-center gap-2"><Leaf className="h-4 w-4 text-accent" /> Caffeine-Free</li>
              <li className="flex items-center justify-center gap-2"><Truck className="h-4 w-4 text-accent" /> Free Shipping $50+</li>
              <li className="flex items-center justify-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> 30-Day Guarantee</li>
            </ul>
          </div>
        </section>

        {/* SEO Sections */}
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-3xl space-y-16">
          {sections.map((s, i) => (
            <article key={i} className="prose-section">
              <h2 className="font-display text-3xl md:text-4xl text-primary mb-4 leading-tight">
                {s.h2}
              </h2>
              <p className="text-base md:text-lg text-foreground/90 mb-6 leading-relaxed">
                {s.intro}
              </p>

              <ul className="space-y-3 mb-6">
                {s.benefits.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>

              <p className="text-foreground/90 mb-4 leading-relaxed">
                <strong className="text-primary">How it works:</strong> {s.how}
              </p>

              <p className="text-foreground/90 mb-6 leading-relaxed">{s.bridge}</p>

              <div className="mb-8">
                <Button asChild variant="outline" className="font-medium">
                  <Link to={s.ctaHref ?? primaryCta.href}>
                    {s.ctaLabel ?? 'Explore Neuvie Strips'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-display text-xl text-primary mb-3">FAQ</h3>
                <p className="font-semibold text-foreground mb-2">{s.faq.q}</p>
                <p className="text-foreground/90 leading-relaxed">{s.faq.a}</p>
              </div>
            </article>
          ))}

          {/* Internal links */}
          <nav aria-label="Related pages" className="border-t border-border pt-10">
            <h2 className="font-display text-2xl text-primary mb-4">Related Reads</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <li><Link className="text-primary hover:underline" to="/caffeine-free-energy">Caffeine-Free Energy Supplements</Link></li>
              <li><Link className="text-primary hover:underline" to="/energy-without-stimulants">Natural Energy Without Stimulants</Link></li>
              <li><Link className="text-primary hover:underline" to="/caffeine-pill-alternatives">Alternatives to Caffeine Pills</Link></li>
              <li><Link className="text-primary hover:underline" to="/respiratory-drops">Respiratory & Lung Health Drops</Link></li>
              <li><Link className="text-primary hover:underline" to="/science">The Science Behind Neuvie</Link></li>
              <li><Link className="text-primary hover:underline" to="/shop">Shop All Strips</Link></li>
            </ul>
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
