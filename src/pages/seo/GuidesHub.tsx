import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Zap, Moon, Heart, Sparkles, Leaf, Wind, Droplet } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PageMeta } from '@/components/seo';
import { SEO_CLUSTERS } from './clusters';
import { COMPARISONS } from './comparisons';

const CATEGORIES: { key: string; label: string; icon: any; slugs: string[] }[] = [
  {
    key: 'energy',
    label: 'Energy & Focus',
    icon: Zap,
    slugs: [
      'caffeine-free-energy',
      'energy-without-stimulants',
      'caffeine-pill-alternatives',
      'caffeine-pills-alternative',
      'otc-stimulants-for-energy',
      'clean-energy-supplements',
      'non-caffeine-stimulants',
      'herbal-energy-supplement-without-stimulants',
      'focus-supplements-without-adderall',
      'nootropic-strips',
    ],
  },
  {
    key: 'sleep',
    label: 'Sleep & Calm',
    icon: Moon,
    slugs: [
      'natural-sleep-aid-without-melatonin',
      'melatonin-strips',
      'magnesium-for-sleep-and-anxiety',
    ],
  },
  {
    key: 'recovery',
    label: 'Recovery & Gut',
    icon: Heart,
    slugs: [
      'hangover-prevention-supplements',
      'best-supplements-for-gut-health',
      'probiotic-strips-for-bloating',
    ],
  },
  {
    key: 'beauty',
    label: 'Beauty & Vitality',
    icon: Sparkles,
    slugs: [
      'collagen-strips-for-skin',
      'biotin-strips-for-hair-growth',
      'iron-supplements-without-constipation',
      'natural-libido-boosters',
      'best-supplements-for-women-over-30',
    ],
  },
  {
    key: 'respiratory',
    label: 'Respiratory & Wellness',
    icon: Wind,
    slugs: [
      'respiratory-drops',
      'respiratory-tincture',
      'lung-cleanse-supplements',
      'immune-support-supplements',
    ],
  },
  {
    key: 'drops',
    label: 'Drops & Daily Health',
    icon: Droplet,
    slugs: [
      'methylene-blue-drops-benefits',
      'blood-sugar-support-supplements',
      'weight-loss-drops-natural',
    ],
  },
  {
    key: 'format',
    label: 'Format & Lifestyle',
    icon: Leaf,
    slugs: ['vitamin-strips-vs-pills', 'travel-supplements-no-water'],
  },
];

export default function GuidesHub() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Neuvie Wellness Guides',
    description:
      'A complete library of Neuvie wellness guides — caffeine-free energy, sleep, gut health, respiratory support, and more.',
    url: 'https://tryneuvie.com/guides',
    isPartOf: { '@id': 'https://tryneuvie.com/#website' },
    hasPart: SEO_CLUSTERS.map((c) => ({
      '@type': 'Article',
      headline: c.h1,
      url: `https://tryneuvie.com/${c.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageMeta
        title="Wellness Guides — Energy, Sleep, Gut, Respiratory | Neuvie"
        description="Browse all Neuvie wellness guides: caffeine-free energy, natural sleep aids, gut health, respiratory drops, beauty support, and supplement comparisons."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        <section className="bg-secondary/40 border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-accent font-semibold mb-3">
              <BookOpen className="h-4 w-4" /> Wellness Library
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight mb-4">
              The Neuvie Wellness Guides
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical, science-grounded answers to the questions people actually ask about energy, sleep, gut health,
              respiratory support, and clean supplements. No fluff, no fear-marketing.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 max-w-5xl space-y-14">
          {CATEGORIES.map((cat) => {
            const items = cat.slugs
              .map((s) => SEO_CLUSTERS.find((c) => c.slug === s))
              .filter(Boolean) as typeof SEO_CLUSTERS;
            if (!items.length) return null;
            const Icon = cat.icon;
            return (
              <section key={cat.key}>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
                  <Icon className="h-6 w-6 text-accent" />
                  <h2 className="font-display text-2xl md:text-3xl text-primary">{cat.label}</h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/${c.slug}`}
                        className="group block p-5 border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        <h3 className="font-display text-lg text-primary mb-1 group-hover:text-accent transition-colors">
                          {c.h1}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{c.lede}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent mt-3">
                          Read guide <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {/* Standalone legacy pages */}
          <section>
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
              <Zap className="h-6 w-6 text-accent" />
              <h2 className="font-display text-2xl md:text-3xl text-primary">Featured Guides</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { href: '/caffeine-free-energy', label: 'Caffeine-Free Energy Supplements', desc: 'Clean energy with B-vitamins, CoQ10, and adaptogens.' },
                { href: '/energy-without-stimulants', label: 'Energy Without Stimulants', desc: 'A stimulant-free routine that supports daily energy.' },
                { href: '/caffeine-pill-alternatives', label: 'Caffeine Pill Alternatives', desc: 'A cleaner, gentler swap for high-dose caffeine pills.' },
                { href: '/respiratory-drops', label: 'Respiratory & Lung Health Drops', desc: 'Daily botanical drops for breathing and lung support.' },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="group block p-5 border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all">
                    <h3 className="font-display text-lg text-primary mb-1 group-hover:text-accent transition-colors">{l.label}</h3>
                    <p className="text-sm text-muted-foreground">{l.desc}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Comparisons */}
          <section>
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
              <Sparkles className="h-6 w-6 text-accent" />
              <h2 className="font-display text-2xl md:text-3xl text-primary">Honest Brand Comparisons</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMPARISONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/compare/${c.slug}`}
                    className="group block p-5 border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all"
                  >
                    <h3 className="font-display text-lg text-primary mb-1 group-hover:text-accent transition-colors">
                      Neuvie vs {c.competitor}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
