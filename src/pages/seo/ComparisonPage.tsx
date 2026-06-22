import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, X, Minus, ShieldCheck, Truck, Flag, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PageMeta } from '@/components/seo';
import { COMPARISONS } from './comparisons';
import NotFound from '@/pages/NotFound';

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = COMPARISONS.find((c) => c.slug === slug);
  if (!data) return <NotFound />;

  const canonical = `https://tryneuvie.com/compare/${data.slug}`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tryneuvie.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://tryneuvie.com/guides' },
      { '@type': 'ListItem', position: 3, name: data.h1, item: canonical },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.h1,
    description: data.description,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: 'Neuvie Nutrition' },
    publisher: { '@id': 'https://tryneuvie.com/#organization' },
    mainEntityOfPage: canonical,
  };

  const winnerIcon = (w?: 'neuvie' | 'competitor' | 'tie', side: 'neuvie' | 'competitor' = 'neuvie') => {
    if (!w || w === 'tie') return <Minus className="h-4 w-4 text-muted-foreground" />;
    return w === side ? <Check className="h-4 w-4 text-accent" /> : <X className="h-4 w-4 text-muted-foreground/50" />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageMeta title={data.title} description={data.description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        <section className="bg-secondary/40 border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl text-center">
            <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/guides" className="hover:text-primary">Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-primary">{data.h1}</span>
            </nav>
            <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight mb-4">{data.h1}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">{data.summary}</p>
            <Button asChild size="lg" className="font-semibold">
              <Link to="/shop">Shop Neuvie Strips <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-muted-foreground">
              <li className="flex items-center justify-center gap-2"><Flag className="h-3.5 w-3.5 text-accent" /> Made in USA</li>
              <li className="flex items-center justify-center gap-2"><Leaf className="h-3.5 w-3.5 text-accent" /> No Added Sugar</li>
              <li className="flex items-center justify-center gap-2"><Truck className="h-3.5 w-3.5 text-accent" /> Free Shipping $50+</li>
              <li className="flex items-center justify-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-accent" /> 30-Day Guarantee</li>
            </ul>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl space-y-12">
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed">{data.intro}</p>

          {/* Comparison table */}
          <section>
            <h2 className="font-display text-3xl text-primary mb-6">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40">
                  <tr>
                    <th className="text-left p-3 font-semibold text-primary w-1/4">Feature</th>
                    <th className="text-left p-3 font-semibold text-primary">Neuvie</th>
                    <th className="text-left p-3 font-semibold text-primary">{data.competitor}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
                      <td className="p-3 font-medium border-t border-border align-top">{r.feature}</td>
                      <td className="p-3 border-t border-border align-top">
                        <div className="flex items-start gap-2">
                          {winnerIcon(r.winner, 'neuvie')}
                          <span>{r.neuvie}</span>
                        </div>
                      </td>
                      <td className="p-3 border-t border-border align-top">
                        <div className="flex items-start gap-2">
                          {winnerIcon(r.winner, 'competitor')}
                          <span>{r.competitor}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Verdict */}
          <section className="bg-accent/10 border border-accent/30 rounded-lg p-6 md:p-8">
            <h2 className="font-display text-2xl text-primary mb-3">The Honest Verdict</h2>
            <p className="text-foreground/90 leading-relaxed">{data.verdict}</p>
          </section>

          {/* Best for */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="font-display text-xl text-primary mb-4">Pick Neuvie if you're…</h3>
              <ul className="space-y-2">
                {data.bestFor.neuvie.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h3 className="font-display text-xl text-primary mb-4">Pick {data.competitor} if you're…</h3>
              <ul className="space-y-2">
                {data.bestFor.competitor.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" /> <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-display text-3xl text-primary mb-6">FAQ</h2>
            <div className="space-y-6">
              {data.faqs.map((f, i) => (
                <div key={i} className="border-b border-border pb-6 last:border-0">
                  <h3 className="font-semibold text-lg text-primary mb-2">{f.q}</h3>
                  <p className="text-foreground/90 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl mb-3">Try Neuvie risk-free</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              30-day money-back guarantee. Free US shipping on orders $50+. Made in an FDA-registered facility.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/shop">Shop Neuvie <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </section>

          {/* Other comparisons */}
          <nav aria-label="Other comparisons" className="border-t border-border pt-8">
            <h2 className="font-display text-2xl text-primary mb-4">Compare Other Brands</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {COMPARISONS.filter((c) => c.slug !== data.slug).map((c) => (
                <li key={c.slug}>
                  <Link to={`/compare/${c.slug}`} className="text-primary hover:underline">
                    Neuvie vs {c.competitor}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/guides" className="text-primary hover:underline">All Wellness Guides</Link>
              </li>
            </ul>
          </nav>

          <p className="text-xs text-muted-foreground italic pt-6 border-t border-border">
            *Comparison based on publicly available product information at the time of writing. Brand names and
            trademarks are property of their respective owners. Neuvie is not affiliated with or endorsed by{' '}
            {data.competitor}. Pricing varies by retailer and promotion.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
