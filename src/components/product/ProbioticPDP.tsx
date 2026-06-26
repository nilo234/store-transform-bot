import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Star, Check, X, Truck, Shield, RotateCcw, Leaf,
  Flame, Sparkles, ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyAddToCart } from '@/components/product/StickyAddToCart';
import { LiveActivityCounter } from '@/components/product/LiveActivityCounter';
import { StockIndicator } from '@/components/product/StockIndicator';
import { IngredientTransparencyDrawer } from '@/components/product/IngredientTransparencyDrawer';
import { InlineEmailCapture } from '@/components/home/InlineEmailCapture';
import { ProductReviews } from '@/components/product/ProductReviews';
import { PressLogosStrip } from '@/components/product/PressLogosStrip';
import { GuaranteeSection } from '@/components/product/GuaranteeSection';
import { ProductJsonLd, BreadcrumbJsonLd, PageMeta } from '@/components/seo';
import { ShopifyProduct, sanitizeTitle, sanitizeHandle, optimizeShopifyImage } from '@/lib/shopify';
import { useRegion } from '@/hooks/useRegion';
import { formatShopifyMoney } from '@/lib/region';
import { bundles } from '@/data/bundles';
import { findProductContent } from '@/data/productContent';
import {
  BenefitFactCard,
  IngredientFactCard,
  StripsVsPillsCard,
  RoutineFactCard,
} from '@/components/product/PDPFactCards';
import { pdpFactCardProps } from '@/data/pdpFactCardProps';

const fx = pdpFactCardProps['probiotic-metabolism-strips'];

interface Props {
  product: ShopifyProduct['node'];
  onAddSingle: () => void;
  onAddBundle: () => void;
}

const REVIEWS = [
  {
    title: 'My Gut Transformed',
    body: "I've taken probiotic capsules for years with mediocre results. These strips work way better — I think because they don't have to survive stomach acid. Bloating gone, regularity perfect, skin clearer.",
    author: 'Amanda S., Denver, CO',
  },
  {
    title: 'No Fridge Required',
    body: "I love that I don't have to refrigerate these like other probiotics. Travel friendly, taste good, and my digestion is the best it's been in years.",
    author: 'Brandon F., Portland, OR',
  },
  {
    title: 'Less Bloat, More Energy',
    body: 'Within 10 days I noticed less bloating after meals. Three weeks in and my energy is up too — I think the gut connection is real.',
    author: 'Christina R., Salt Lake City, UT',
  },
];

const TIMELINE = [
  {
    week: 'Week 1–2',
    title: 'Probiotics Lock In',
    body: 'Your gut microbiome starts rebuilding. Most notice less immediate bloating after meals.',
    outcome: 'You stop dreading lunch or dinner.',
  },
  {
    week: 'Week 3–4',
    title: 'Energy Shifts',
    body: 'Better digestion = better nutrient absorption = real energy without the crash. Regularity improves. Skin starts glowing.',
    outcome: 'You feel like yourself again.',
  },
  {
    week: 'Week 5–6',
    title: 'Lasting Results',
    body: 'Consistent digestion. Stable energy. Less bloat. Better sleep (gut affects sleep too).',
    outcome: "You realize you haven't thought about it in days. That's how you know it's working.",
  },
];

const COMPARISON: Array<{ feature: string; strips: 'yes' | 'no'; capsules: 'yes' | 'no'; powders: 'yes' | 'no' }> = [
  { feature: 'Survives stomach acid', strips: 'yes', capsules: 'no', powders: 'no' },
  { feature: 'Absorbs 5x faster', strips: 'yes', capsules: 'no', powders: 'no' },
  { feature: 'No refrigeration needed', strips: 'yes', capsules: 'no', powders: 'yes' },
  { feature: 'Tastes good', strips: 'yes', capsules: 'no', powders: 'no' },
  { feature: 'Easy to travel with', strips: 'yes', capsules: 'no', powders: 'no' },
  { feature: 'Actually consistent', strips: 'yes', capsules: 'no', powders: 'no' },
];

const FAQS = [
  {
    q: 'How long does it take to feel results?',
    a: "Most customers notice less bloating within 7–10 days. Real energy and regularity improvements hit around week 3–4. By week 6, the transformation is obvious. But everyone's gut is different — that's why we offer a 30-day full refund if you don't feel better.",
  },
  {
    q: 'Will I need to refrigerate these?',
    a: "Nope. Unlike most probiotics, these don't require refrigeration. That's the whole point — probiotics should fit your life, not the other way around. Travel friendly, stable at room temperature, always ready.",
  },
  {
    q: 'Are these actually better than my capsule probiotics?',
    a: 'Yes — here\'s why. Capsules rely on surviving stomach acid to reach your gut. Most don\'t make it. Our strips absorb sublingually (through your mouth), bypass stomach acid entirely, and get absorbed up to 5x faster. Plus, you taste mixed berry instead of a vitamin smell. You be the judge.',
  },
  {
    q: 'Do you have a money-back guarantee?',
    a: "Yes. Full refund within 30 days, no questions. We're confident you'll feel the difference. If you don't, email team@tryneuvie.com and we'll refund your first order immediately.",
  },
];

const CROSS_SELL = [
  { handle: 'digestive-gut-health-strips', title: 'Digestive Strips with Probiotics + Enzymes', tagline: 'Break down food faster, reduce bloating' },
  { handle: 'iron-strips', title: 'Iron Strips for Energy & Hair Health', tagline: 'Better absorption = more real energy' },
  { handle: 'appetite-balance-weight-support-strips', title: 'Appetite Balance Strips', tagline: 'Stop cravings, support stable metabolism' },
];

export function ProbioticPDP({ product, onAddSingle, onAddBundle }: Props) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const { isUK } = useRegion();

  const variant = product.variants.edges[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  const originalPrice = 49.99;
  const fmt = (n: number) => formatShopifyMoney(n, currencyCode);
  const heroImage = product.images.edges[0]?.node;
  const productContent = findProductContent(product.title) || findProductContent(product.handle);

  const gutBundle = bundles.find(b => b.id === 'gut-feeling');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://tryneuvie.com' },
    { name: 'Shop', url: 'https://tryneuvie.com/shop' },
    { name: sanitizeTitle(product.title), url: `https://tryneuvie.com/product/${sanitizeHandle(product.handle)}` },
  ];

  const handleHeroCta = () => {
    onAddSingle();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Probiotic Strips: Less Bloat, Real Energy | NEUVIE"
        description="10B CFU probiotic + prebiotic in a 3-second dissolving strip. No fridge, no capsules. Visible gut results in 6 weeks. 30-day guarantee."
      />
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container-wide py-4">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        {/* ============ HERO ============ */}
        <section className="container-wide pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-secondary/50 to-card relative shadow-soft"
            >
              <div className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
                <span className="text-2xl font-bold text-foreground">x30</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Strips</p>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1.5 rounded-full">
                  SAVE {fmt(originalPrice - price)}
                </span>
              </div>
              {heroImage && (
                <img
                  src={optimizeShopifyImage(heroImage.url, 800)}
                  alt={heroImage.altText || `NEUVIE ${sanitizeTitle(product.title)} dissolving strip`}
                  className="w-full h-full object-contain"
                  loading="eager"
                  width={800}
                  height={800}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              <h1 className="font-display text-3xl md:text-5xl leading-[1.1]">
                Less Bloat. Better Digestion. Real Energy.
              </h1>
              <p className="text-lg text-muted-foreground">
                In 3 seconds — without the fridge, the capsules, or the stomach upset.
                <span className="block mt-2 text-foreground/80 font-medium">
                  Balanced gut = balanced you. Feel the difference in 6 weeks.
                </span>
              </p>

              {/* Urgency row */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1.5 bg-secondary/60 px-3 py-1.5 rounded-full">
                  <Star className="h-4 w-4 fill-primary text-primary" strokeWidth={2} />
                  <span className="font-semibold">4.8/5</span>
                  <span className="text-muted-foreground">· 282 reviews</span>
                </span>
              </div>

              <LiveActivityCounter productHandle={product.handle} />
              <StockIndicator />

              {/* Price */}
              <div className="bg-secondary/60 rounded-xl p-4 flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-primary">{fmt(price)}</span>
                <span className="text-lg text-muted-foreground line-through">{fmt(originalPrice)}</span>
                <span className="ml-auto bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">
                  SAVE {fmt(originalPrice - price)}
                </span>
              </div>

              {/* CTA */}
              <div ref={stickyRef} className="space-y-2">
                <Button
                  onClick={onAddSingle}
                  className="btn-primary w-full text-lg gap-2 h-14"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Heal My Gut Starting Today
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  30-day money-back guarantee · Ships today
                </p>
              </div>

              {/* Trust row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { icon: Shield, label: 'Third-Party Tested' },
                  { icon: Leaf, label: 'Made in USA' },
                  { icon: Sparkles, label: 'No Refrigeration' },
                  { icon: RotateCcw, label: '30-Day Guarantee' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 bg-secondary/40 rounded-lg px-2 py-2">
                    <Icon className="h-4 w-4 text-primary flex-shrink-0" strokeWidth={2} />
                    <span className="text-foreground/80 font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <PressLogosStrip />
            </motion.div>
          </div>
        </section>

        {/* ============ PROBLEM / SOLUTION ============ */}
        <section className="py-16 bg-secondary/40">
          <div className="container-wide max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-3">
              That bloated, sluggish feeling? We know it.
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              You're not failing. The format was built wrong.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border/40">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  You've tried
                </p>
                <ul className="space-y-3">
                  {[
                    'Capsules that upset your stomach',
                    'Powders that taste terrible',
                    "Routines you couldn't keep up with",
                    'Probiotics that need refrigeration',
                    "Expensive gut protocols that don't work",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-foreground/80">
                      <X className="h-5 w-5 text-muted-foreground/60 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-muted-foreground italic">
                  The result? You gave up. Again.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border-2 border-primary/30">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                  What if your probiotic was
                </p>
                <ul className="space-y-3">
                  {[
                    'Ready to dissolve in your mouth in 3 seconds',
                    'Absorbed up to 5x faster than capsules',
                    'Tastes like mixed berry (actually good)',
                    'Needs no water, no fridge, no drama',
                    'Proven: 80% feel real results in 6 weeks',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-foreground">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-foreground/80">
                  That's NEUVIE. Not another supplement — permission to stop trying so hard
                  and start showing up for yourself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SOCIAL PROOF ============ */}
        <section className="py-16">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl">Real people. Real results.</h2>
              <p className="text-muted-foreground mt-2">Verified buyers, unedited words.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {REVIEWS.map(r => (
                <div key={r.author} className="bg-card rounded-2xl p-6 border border-border/40 shadow-soft">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" strokeWidth={2} />
                    ))}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">"{r.title}"</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.body}</p>
                  <p className="text-xs font-medium text-foreground/70">
                    — {r.author}
                    <span className="ml-1 text-primary">· Verified Buyer</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-3xl mx-auto text-center">
              {[
                { stat: '80%', label: 'Felt a real difference' },
                { stat: '76%', label: 'Made it their daily routine' },
                { stat: '72%', label: 'Report grounded energy' },
              ].map(s => (
                <div key={s.label} className="bg-secondary/50 rounded-xl p-4">
                  <p className="font-display text-2xl md:text-3xl text-primary">{s.stat}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Based on 282 verified customer reviews
            </p>
          </div>
        </section>

        {/* ============ DECISION MOMENT ============ */}
        <section className="py-16 bg-secondary/40">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl">Choose your path to better digestion</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 items-stretch">
              {/* Single */}
              <div className="bg-card rounded-2xl p-6 border border-border/40 flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Just this one
                </p>
                <h3 className="font-display text-2xl mb-1">Probiotic + Metabolism Strips</h3>
                <p className="text-sm text-muted-foreground mb-4">30 strips · 1 month supply</p>
                <p className="text-3xl font-bold text-foreground mb-1">{fmt(price)}</p>
                <p className="text-sm text-muted-foreground line-through mb-5">{fmt(originalPrice)}</p>
                <Button onClick={onAddSingle} variant="outline" className="mt-auto h-12 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Add to Cart
                </Button>
              </div>

              {/* Bundle */}
              <div className="bg-card rounded-2xl p-6 border-2 border-primary relative flex flex-col shadow-elegant">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  Most Popular · Save ${gutBundle?.savings.toFixed(2) ?? '25.19'}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 mt-2">
                  Recommended for results
                </p>
                <h3 className="font-display text-2xl mb-1">The Gut Feeling Bundle</h3>
                <p className="text-sm text-muted-foreground mb-4">4-pack · 4-month gut transformation</p>

                <ul className="space-y-1.5 text-sm text-foreground/80 mb-4">
                  {['Probiotic + Metabolism (30)', 'Digestive Enzymes (30)', 'Appetite Balance (30)', 'Iron for Energy (30)'].map(p => (
                    <li key={p} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-primary">${gutBundle?.salePrice.toFixed(2) ?? '114.77'}</span>
                  <span className="text-sm text-muted-foreground line-through">${gutBundle?.originalPrice.toFixed(2) ?? '139.96'}</span>
                </div>

                <ul className="text-xs text-muted-foreground space-y-1 mb-5">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />Free US shipping</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />Surprise gifts included</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />4-month gut transformation</li>
                </ul>

                <Button onClick={onAddBundle} className="btn-primary mt-auto h-12">
                  Get the Bundle
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              New to NEUVIE? The Gut Feeling Bundle is the complete gut transformation. Same
              30-day guarantee on everything.
            </p>
          </div>
        </section>

        {/* ============ TIMELINE ============ */}
        <section className="py-16">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl">Your gut transformation — week by week</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {TIMELINE.map((step, i) => (
                <div key={step.week} className="relative bg-card rounded-2xl p-6 border border-border/40">
                  <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1 mt-2">
                    {step.week}
                  </p>
                  <h3 className="font-display text-xl mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{step.body}</p>
                  <p className="text-sm text-foreground/80 italic">→ {step.outcome}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
              Not seeing results? Email us within 30 days for a full refund — no questions asked.
            </p>
          </div>
        </section>

        {/* ============ [VISUAL 2] INGREDIENT FACT CARD ============ */}
        {fx && (
          <IngredientFactCard
            badge={fx.IngredientFactCard.badge}
            headline={fx.IngredientFactCard.headline}
            subhead={fx.IngredientFactCard.subhead}
            ingredients={fx.IngredientFactCard.ingredients}
          />
        )}

        {/* ============ INGREDIENTS ============ */}
        <section className="py-16 bg-secondary/40">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl">
                10 Billion good bacteria + prebiotic fiber
              </h2>
              <p className="text-muted-foreground mt-2">Third-party tested. Every batch.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              <div className="bg-card rounded-2xl p-6 border border-border/40">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">The probiotic</p>
                <h3 className="font-display text-xl mb-2">Bifidobacterium lactis · 10B CFU</h3>
                <p className="text-sm text-muted-foreground">
                  Restores your good bacteria balance. Better digestion = better energy, clearer
                  skin, more stable mood.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border/40">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">The prebiotic</p>
                <h3 className="font-display text-xl mb-2">Polydextrose · 30 mg</h3>
                <p className="text-sm text-muted-foreground">
                  Feeds your good bacteria so they multiply and work harder. It's not just
                  probiotics — it's a synbiotic system.
                </p>
              </div>
            </div>

            {productContent?.supplementFacts && productContent.supplementFacts.length > 0 && (
              <div className="max-w-md mx-auto mt-6">
                <IngredientTransparencyDrawer
                  productTitle={sanitizeTitle(product.title)}
                  supplementFacts={productContent.supplementFacts}
                />
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {[
                'Vegan', 'Gluten-Free', 'Non-GMO', 'Sugar-Free',
                'No Artificial Sweeteners', 'Third-Party Tested',
                'FDA-Registered Facility', 'No Refrigeration',
              ].map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 bg-card border border-border/40 rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80">
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHY STRIPS ============ */}
        <section className="py-16">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                Why a strip
              </span>
              <h2 className="font-display text-3xl md:text-4xl">Why strips work better for gut health</h2>
            </div>

            <div className="bg-card rounded-2xl border border-border/40 overflow-hidden shadow-soft">
              <div className="grid grid-cols-4 bg-primary/5 border-b border-border/40">
                <div className="p-3 md:p-4" />
                <div className="p-3 md:p-4 text-center text-xs md:text-sm font-bold text-primary">NEUVIE Strips</div>
                <div className="p-3 md:p-4 text-center text-xs md:text-sm font-medium text-muted-foreground">Capsules</div>
                <div className="p-3 md:p-4 text-center text-xs md:text-sm font-medium text-muted-foreground">Powders</div>
              </div>
              {COMPARISON.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-4 items-center ${i !== COMPARISON.length - 1 ? 'border-b border-border/30' : ''}`}>
                  <div className="p-3 md:p-4 text-xs md:text-sm font-medium">{row.feature}</div>
                  {(['strips', 'capsules', 'powders'] as const).map(col => (
                    <div key={col} className={`p-3 md:p-4 ${col === 'strips' ? 'bg-primary/5' : ''}`}>
                      {row[col] === 'yes'
                        ? <Check className="h-4 w-4 text-primary mx-auto" strokeWidth={2.5} />
                        : <X className="h-4 w-4 text-muted-foreground/50 mx-auto" strokeWidth={2} />}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-5">
              <p className="text-sm text-foreground/85 leading-relaxed">
                Here's the thing: capsule probiotics have to survive your stomach acid to reach
                your gut alive. Most don't. Strips absorb sublingually — through your mouth — so
                they bypass stomach acid entirely and work up to 5x faster. That's why our
                customers report results in 2–3 weeks instead of months.
              </p>
            </div>
          </div>
        </section>

        {/* ============ [VISUAL 3] STRIPS VS PILLS ============ */}
        {fx && (
          <StripsVsPillsCard
            headline={fx.StripsVsPillsCard.headline}
            rows={fx.StripsVsPillsCard.rows}
          />
        )}

        {/* ============ FAQ ============ */}
        <section className="py-16 bg-secondary/40">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl">Everything you need to know about your gut</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`q-${i}`} className="bg-card border border-border/40 rounded-xl px-5">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="text-center text-sm text-muted-foreground mt-6">
              More questions? Email <a href="mailto:team@tryneuvie.com" className="text-primary underline-offset-4 hover:underline">team@tryneuvie.com</a>
            </p>
          </div>
        </section>

        {/* ============ GUARANTEE ============ */}
        <GuaranteeSection />

        {/* ============ CROSS-SELL ============ */}
        <section className="py-16">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl">Complete your gut transformation</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {CROSS_SELL.map(c => (
                <Link
                  key={c.handle}
                  to={`/product/${c.handle}`}
                  className="group bg-card rounded-2xl p-6 border border-border/40 hover:border-primary hover:shadow-soft transition-all"
                >
                  <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{c.tagline}</p>
                  <span className="text-sm font-semibold text-primary inline-flex items-center gap-1">
                    View {c.title} details
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </span>
                </Link>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Or get all four in <Link to="/bundles" className="text-primary font-semibold hover:underline">The Gut Feeling Bundle</Link>
              {' '}for just ${gutBundle?.salePrice.toFixed(2) ?? '114.77'}.
            </p>
          </div>
        </section>

        {/* ============ EMAIL CAPTURE ============ */}
        <InlineEmailCapture />

        {/* ============ REVIEWS WIDGET ============ */}
        <ProductReviews
          productHandle={product.handle}
          productTitle={sanitizeTitle(product.title)}
        />
        {/* ============ [VISUAL 4] ROUTINE FACT CARD ============ */}
        {fx && (
          <RoutineFactCard
            eyebrow={fx.RoutineFactCard.eyebrow}
            headline={fx.RoutineFactCard.headline}
            mode={fx.RoutineFactCard.mode}
            steps={fx.RoutineFactCard.steps}
          />
        )}
      </main>

      {/* Sticky CTA */}
      <StickyAddToCart
        productTitle="Probiotic + Metabolism Strips"
        price={price}
        originalPrice={originalPrice}
        onAddToCart={handleHeroCta}
        isSubscription={false}
        addToCartRef={stickyRef}
      />

      <Footer />
    </div>
  );
}
