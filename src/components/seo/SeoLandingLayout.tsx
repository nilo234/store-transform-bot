import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, Truck, Flag, Leaf, AlertTriangle, Users, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PageMeta } from '@/components/seo';

export interface SeoSection {
  h2: string;
  intro: string;
  benefits: string[];
  how: string;
  bridge: string;
  faq: { q: string; a: string };
  ctaHref?: string;
  ctaLabel?: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface SeoLandingProps {
  title: string;
  description: string;
  h1: string;
  lede: string;
  sections: SeoSection[];
  primaryCta?: { href: string; label: string };
  /** Short, direct one-paragraph answer that targets featured snippets */
  quickAnswer?: string;
  /** Topic label used to auto-generate depth sections, e.g. "caffeine-free energy supplement" */
  topic?: string;
  /** Extra FAQs appended after section FAQs */
  extraFaqs?: { q: string; a: string }[];
  /** Override default related-link grid */
  relatedLinks?: RelatedLink[];
  /** Canonical path for breadcrumbs */
  canonicalPath?: string;
}

const DEFAULT_RELATED: RelatedLink[] = [
  { href: '/caffeine-free-energy', label: 'Caffeine-Free Energy Supplements' },
  { href: '/energy-without-stimulants', label: 'Natural Energy Without Stimulants' },
  { href: '/caffeine-pill-alternatives', label: 'Alternatives to Caffeine Pills' },
  { href: '/otc-stimulants-for-energy', label: 'OTC Stimulants for Energy' },
  { href: '/clean-energy-supplements', label: 'Clean Energy Supplements' },
  { href: '/respiratory-drops', label: 'Respiratory & Lung Health Drops' },
  { href: '/respiratory-tincture', label: 'Respiratory Tincture' },
  { href: '/natural-sleep-aid-without-melatonin', label: 'Natural Sleep Aid Without Melatonin' },
  { href: '/magnesium-for-sleep-and-anxiety', label: 'Magnesium for Sleep & Anxiety' },
  { href: '/hangover-prevention-supplements', label: 'Hangover Prevention Supplements' },
  { href: '/best-supplements-for-gut-health', label: 'Best Supplements for Gut Health' },
  { href: '/collagen-strips-for-skin', label: 'Collagen Strips for Skin' },
  { href: '/methylene-blue-drops-benefits', label: 'Methylene Blue Drops' },
  { href: '/vitamin-strips-vs-pills', label: 'Vitamin Strips vs Pills' },
  { href: '/science', label: 'The Science Behind Neuvie' },
  { href: '/shop', label: 'Shop All Strips' },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);

export function SeoLandingLayout({
  title,
  description,
  h1,
  lede,
  sections,
  primaryCta = { href: '/shop', label: 'Shop the Collection' },
  quickAnswer,
  topic,
  extraFaqs = [],
  relatedLinks,
  canonicalPath,
}: SeoLandingProps) {
  const topicLabel = topic ?? h1.toLowerCase();
  const related = (relatedLinks ?? DEFAULT_RELATED).filter(
    (r) => !canonicalPath || r.href !== canonicalPath
  );

  // Universal supplemental FAQs (boost word count + long-tail coverage)
  const universalFaqs = [
    {
      q: `What should I look for in a ${topicLabel}?`,
      a: `Check the supplement facts panel for clinically studied doses, look for a Made in USA, FDA-registered facility, and avoid products padded with sugar, artificial colors, or fillers. A daily ${topicLabel} should be one you can take consistently without effort — format matters as much as the formula.`,
    },
    {
      q: `How is a dissolvable strip different from a pill or gummy?`,
      a: `Strips dissolve on your tongue in about 30 seconds and start absorbing through the soft tissue of the mouth. Pills have to make it through your digestive system first, which adds delay and can be hard on sensitive stomachs. Gummies usually need 2–3 grams of sugar per dose. Strips skip both problems.`,
    },
    {
      q: `Is Neuvie made in the USA?`,
      a: `Yes. Every Neuvie strip and drop is formulated and manufactured in an FDA-registered, GMP-compliant facility in the United States, and independently tested by third-party labs for purity and potency.`,
    },
    {
      q: `What is Neuvie's return policy?`,
      a: `Neuvie ships free in the US on orders over $50 and is backed by a 30-day money-back guarantee. If a product is not the right fit, the support team at team@tryneuvie.com makes the return simple.`,
    },
  ];

  const allFaqs = [
    ...sections.map((s) => s.faq),
    ...extraFaqs,
    ...universalFaqs,
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://tryneuvie.com/shop' },
      ...(canonicalPath
        ? [{ '@type': 'ListItem', position: 3, name: h1, item: `https://tryneuvie.com${canonicalPath}` }]
        : []),
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: 'Neuvie Nutrition' },
    publisher: { '@id': 'https://tryneuvie.com/#organization' },
    mainEntityOfPage: canonicalPath ? `https://tryneuvie.com${canonicalPath}` : 'https://tryneuvie.com/',
    image: 'https://tryneuvie.com/og-image.png',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageMeta title={title} description={description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/40 border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center">
            <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-primary">Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-primary">{h1}</span>
            </nav>
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

            <ul className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <li className="flex items-center justify-center gap-2"><Flag className="h-4 w-4 text-accent" /> Made in USA</li>
              <li className="flex items-center justify-center gap-2"><Leaf className="h-4 w-4 text-accent" /> Clean Formulas</li>
              <li className="flex items-center justify-center gap-2"><Truck className="h-4 w-4 text-accent" /> Free Shipping $50+</li>
              <li className="flex items-center justify-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> 30-Day Guarantee</li>
            </ul>
          </div>
        </section>

        {/* Quick answer (snippet target) */}
        {quickAnswer && (
          <section className="bg-accent/10 border-b border-border">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
              <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">Quick Answer</p>
              <p className="text-lg text-foreground/90 leading-relaxed">{quickAnswer}</p>
            </div>
          </section>
        )}

        {/* TOC */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-8 max-w-3xl">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">On This Page</p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {sections.map((s, i) => (
                <li key={i}>
                  <a href={`#${slugify(s.h2)}`} className="text-primary hover:underline">
                    {i + 1}. {s.h2}
                  </a>
                </li>
              ))}
              <li><a href="#what-to-look-for" className="text-primary hover:underline">{sections.length + 1}. What to Look For</a></li>
              <li><a href="#common-mistakes" className="text-primary hover:underline">{sections.length + 2}. Common Mistakes</a></li>
              <li><a href="#who-its-for" className="text-primary hover:underline">{sections.length + 3}. Who It's For</a></li>
              <li><a href="#how-neuvie-compares" className="text-primary hover:underline">{sections.length + 4}. How Neuvie Compares</a></li>
              <li><a href="#faq" className="text-primary hover:underline">{sections.length + 5}. FAQ</a></li>
            </ol>
          </div>
        </section>

        {/* Core SEO sections */}
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-3xl space-y-16">
          {sections.map((s, i) => (
            <article key={i} id={slugify(s.h2)} className="prose-section scroll-mt-24">
              <h2 className="font-display text-3xl md:text-4xl text-primary mb-4 leading-tight">{s.h2}</h2>
              <p className="text-base md:text-lg text-foreground/90 mb-6 leading-relaxed">{s.intro}</p>

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
            </article>
          ))}

          {/* What to look for */}
          <article id="what-to-look-for" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-6 w-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">
                What to Look For in a {topicLabel}
              </h2>
            </div>
            <p className="text-foreground/90 mb-6 leading-relaxed">
              Not every product on the shelf is built the same. When you're choosing a {topicLabel}, a short checklist
              saves you from wasting money on a formula that won't move the needle.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">Clinically studied doses.</strong> A long ingredient list means nothing if each one is dosed at a fraction of what research actually used.</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">Made in the USA, FDA-registered facility.</strong> US-made supplements are produced under stricter GMP oversight than most imported brands.</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">Third-party tested.</strong> An independent lab verifies what's actually in the bottle matches the label.</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">No unnecessary fillers.</strong> Skip products padded with sugar, artificial dyes, or proprietary blends that hide the real doses.</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span><strong className="text-primary">A format you'll actually use.</strong> The best supplement is the one you take daily. Strips and drops remove the friction of swallowing pills or remembering powder scoops.</span></li>
            </ul>
            <p className="text-foreground/90 leading-relaxed">
              Neuvie checks each of these boxes — every strip is made in the USA, third-party tested, and formulated
              without added sugar, artificial colors, or hidden proprietary blends.
            </p>
          </article>

          {/* Common mistakes */}
          <article id="common-mistakes" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">
                Common Mistakes People Make
              </h2>
            </div>
            <p className="text-foreground/90 mb-6 leading-relaxed">
              Most of the people who tell us "supplements don't work for me" are running into one of the same handful
              of issues. Here's what trips people up most often with a {topicLabel}.
            </p>
            <ol className="space-y-4 mb-6 list-decimal pl-5">
              <li className="text-foreground/90"><strong className="text-primary">Inconsistent use.</strong> Most ingredients only build a measurable effect after 2–4 weeks of daily use. Taking something three times in a month and giving up isn't a fair test.</li>
              <li className="text-foreground/90"><strong className="text-primary">Underdosing.</strong> Bargain bottles often contain a tenth of the research-backed dose. You feel nothing — and blame the ingredient.</li>
              <li className="text-foreground/90"><strong className="text-primary">Wrong format for your life.</strong> If a routine requires water, a scoop, and counter space, you'll skip it. Pocket-sized strips you can use anywhere are easier to stick with.</li>
              <li className="text-foreground/90"><strong className="text-primary">Stacking ten things at once.</strong> Start with one or two daily essentials, give them a real window, then add more. Otherwise you can't tell what's actually helping.</li>
              <li className="text-foreground/90"><strong className="text-primary">Ignoring sleep, water, and food.</strong> A {topicLabel} is a multiplier, not a replacement. The base routine matters first.</li>
            </ol>
          </article>

          {/* Who it's for */}
          <article id="who-its-for" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">
                Who This Is For
              </h2>
            </div>
            <p className="text-foreground/90 mb-6 leading-relaxed">
              A {topicLabel} fits best into certain routines and lifestyles. If any of the situations below sound
              familiar, the format and formula are likely a strong match.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span>People who struggle to swallow capsules or hate the chalky aftertaste of powders.</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span>Anyone who travels often and wants something TSA-friendly that does not need water.</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span>Busy professionals and parents who need a routine that fits into 30 seconds, not 5 minutes.</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span>People with caffeine sensitivity, sensitive stomachs, or who react badly to common stimulants.</span></li>
              <li className="flex items-start gap-3"><Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span>Anyone who wants supplements without added sugar, artificial dyes, or unnecessary fillers.</span></li>
            </ul>
            <p className="text-foreground/90 leading-relaxed">
              If you're pregnant or nursing, taking prescription medication, or managing a chronic condition, talk to
              your healthcare provider before starting any new supplement — including a {topicLabel}.
            </p>
          </article>

          {/* Comparison */}
          <article id="how-neuvie-compares" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight">
                How Neuvie Compares
              </h2>
            </div>
            <p className="text-foreground/90 mb-6 leading-relaxed">
              Most people considering a {topicLabel} are weighing three options: capsules, gummies, or a dissolvable
              format like a strip or drop. Here's the short version of how they stack up day to day.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border">
                <thead className="bg-secondary/40">
                  <tr>
                    <th className="text-left p-3 font-semibold text-primary">Format</th>
                    <th className="text-left p-3 font-semibold text-primary">Onset</th>
                    <th className="text-left p-3 font-semibold text-primary">Sugar</th>
                    <th className="text-left p-3 font-semibold text-primary">Portability</th>
                    <th className="text-left p-3 font-semibold text-primary">Daily Friction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Neuvie Strip / Drop</td>
                    <td className="p-3">~30 sec to dissolve, fast absorption</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Pocket-sized, TSA-friendly</td>
                    <td className="p-3">Low — no water, no scoop</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/20">
                    <td className="p-3 font-medium">Capsule / Pill</td>
                    <td className="p-3">30–60 min, must pass through GI tract</td>
                    <td className="p-3">None</td>
                    <td className="p-3">Bottle-bound</td>
                    <td className="p-3">Medium — needs water</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Gummy</td>
                    <td className="p-3">30–60 min</td>
                    <td className="p-3">Usually 2–3 g per serving</td>
                    <td className="p-3">Sticky in heat</td>
                    <td className="p-3">Low — but adds sugar</td>
                  </tr>
                  <tr className="border-t border-border bg-secondary/20">
                    <td className="p-3 font-medium">Powder</td>
                    <td className="p-3">15–30 min</td>
                    <td className="p-3">Varies, often flavored with sweeteners</td>
                    <td className="p-3">Bulky, needs shaker</td>
                    <td className="p-3">High — scoop, shake, clean</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-foreground/90 leading-relaxed">
              For a daily {topicLabel}, friction is the silent killer of results. The format that wins isn't the one
              with the longest label — it's the one you'll still be using on day 90.
            </p>
          </article>

          {/* FAQ */}
          <article id="faq" className="scroll-mt-24">
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-6 leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {allFaqs.map((f, i) => (
                <div key={i} className="border-b border-border pb-6 last:border-0">
                  <h3 className="font-semibold text-lg text-primary mb-2">{f.q}</h3>
                  <p className="text-foreground/90 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </article>

          {/* CTA */}
          <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to try it for yourself?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              30-day money-back guarantee. Free US shipping on orders $50+. Made in an FDA-registered facility.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to={primaryCta.href}>
                {primaryCta.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>

          {/* Related links */}
          <nav aria-label="Related guides" className="border-t border-border pt-10">
            <h2 className="font-display text-2xl text-primary mb-4">Related Wellness Guides</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {related.map((r) => (
                <li key={r.href}>
                  <Link className="text-primary hover:underline" to={r.href}>{r.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground italic pt-6 border-t border-border">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended
            to diagnose, treat, cure, or prevent any disease. Always consult your healthcare provider before starting
            a new supplement, especially if you are pregnant, nursing, or taking medication.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
