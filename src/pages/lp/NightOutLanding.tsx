import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  Check,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Leaf,
  Flag,
  Loader2,
  Gift,
  Sparkles,
  Plane,
  Clock,
  Droplet,
  PackageCheck,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { PaymentBadges } from '@/components/layout/PaymentBadges';
import { optimizeShopifyImage } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { PageMeta } from '@/components/seo';
import { ProductFAQs } from '@/components/product/ProductFAQs';
import { toast } from 'sonner';
import { bundles } from '@/data/bundles';
import { useBundleImages } from '@/hooks/useBundleImages';
import neuvieLogo from '@/assets/neuvie-navbar-logo.png';

// Night Out Survival Kit = Hangover + Energy + Cognitive Relax
const BUNDLE = bundles.find(b => b.id === 'night-out-survival-kit')!;

// Display metadata aligned BY INDEX with BUNDLE.variantIds
// (Hangover, Energy, Cognitive Relax — see src/data/bundles.ts)
const PRODUCT_META = [
  { name: 'Hangover Recovery Strips', benefit: 'Bounce back, faster.', outcomes: ['Hydration support', 'Replenish key vitamins', 'Wake up feeling like you'] },
  { name: 'Energy Strips', benefit: 'Steady lift, no crash.', outcomes: ['Clean B-vitamin energy', 'No jitters, no spike', 'Stay on through the night'] },
  { name: 'Cognitive Relax Strips', benefit: 'Calm a busy mind.', outcomes: ['Wind down on demand', 'Soft focus, less spiral', 'Easier transition to sleep'] },
];

export default function NightOutLanding() {
  const { images: bundleImages, isLoading: imagesLoading } = useBundleImages(BUNDLE.variantIds);
  const addItem = useCartStore(s => s.addItem);
  const setCartOpen = useCartStore(s => s.setOpen);
  const cartCount = useCartStore(s => s.totalItems());
  const cartLoading = useCartStore(s => s.isLoading);

  // Hero uses the first available bundle product image
  const heroImage = bundleImages.find(img => !!img) ?? null;

  const handleAddBundle = async () => {
    if (imagesLoading) return;
    const bundleImage = heroImage ?? '';
    const imageEdges = bundleImage
      ? [{ node: { url: bundleImage, altText: BUNDLE.name } }]
      : [];

    await addItem({
      product: {
        node: {
          id: `bundle-${BUNDLE.id}`,
          title: BUNDLE.name,
          handle: `bundle-${BUNDLE.id}`,
          description: BUNDLE.tagline,
          priceRange: { minVariantPrice: { amount: BUNDLE.salePrice.toString(), currencyCode: 'USD' } },
          images: { edges: imageEdges },
          variants: {
            edges: [{
              node: {
                id: BUNDLE.shopifyBundleVariantId,
                title: BUNDLE.products.join(' + '),
                price: { amount: BUNDLE.salePrice.toString(), currencyCode: 'USD' },
                availableForSale: true,
                selectedOptions: [{ name: 'Bundle', value: BUNDLE.packSize }],
              },
            }],
          },
          options: [{ name: 'Bundle', values: [BUNDLE.packSize] }],
        },
      } as import('@/lib/shopify').ShopifyProduct,
      variantId: BUNDLE.shopifyBundleVariantId,
      variantTitle: BUNDLE.products.join(' + '),
      price: { amount: BUNDLE.salePrice.toString(), currencyCode: 'USD' },
      quantity: 1,
      selectedOptions: [{ name: 'Bundle', value: BUNDLE.packSize }],
    });

    toast.success('Bundle added to cart!', { position: 'top-center' });
    setCartOpen(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const busy = imagesLoading || cartLoading;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Night Out Survival Kit – 3-Pack Bundle | NEUVIE™"
        description="The premium 3-strip bundle for nights out, travel, and busy schedules. Hangover, Energy, Cognitive Relax. No pills. No water. Free US shipping $50+."
      />

      {/* Slim header — minimal nav */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/30">
        <div className="container-wide flex items-center justify-between h-20 md:h-24 lg:h-32 px-3 md:px-6">
          <Link to="/" className="flex items-center">
            <img src={neuvieLogo} alt="NEUVIE" className="h-20 md:h-[4.75rem] lg:h-[8.25rem] w-auto" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-secondary"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Anchor links */}
      <nav className="hidden md:block border-b border-border/30 bg-background/70 backdrop-blur sticky top-20 md:top-24 lg:top-32 z-40">
        <div className="container-wide flex items-center justify-center gap-8 h-11 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <button onClick={() => scrollTo('benefits')} className="hover:text-primary transition-colors">Benefits</button>
          <button onClick={() => scrollTo('included')} className="hover:text-primary transition-colors">What's Included</button>
          <button onClick={() => scrollTo('reviews')} className="hover:text-primary transition-colors">Reviews</button>
          <button onClick={() => scrollTo('faq')} className="hover:text-primary transition-colors">FAQ</button>
        </div>
      </nav>

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-b from-secondary/40 to-background">
          <div className="container-wide py-8 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="order-1"
              >
                {/* Hero: 3-product collage from real Shopify bundle images */}
                <div className="relative rounded-2xl overflow-hidden bg-card shadow-elevated max-w-[460px] mx-auto p-4 md:p-5">
                  <span className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                    BUNDLE & SAVE
                  </span>

                  {imagesLoading ? (
                    <div className="aspect-square bg-muted animate-pulse rounded-xl" />
                  ) : (
                    <div className="grid grid-cols-2 gap-2 md:gap-3 aspect-square">
                      {/* Lead image — large, left column */}
                      <div className="row-span-2 bg-secondary/30 rounded-xl flex items-center justify-center p-2 overflow-hidden">
                        {heroImage ? (
                          <img
                            src={optimizeShopifyImage(heroImage, 800)}
                            alt={`${PRODUCT_META[0].name} — NEUVIE Night Out Survival Kit`}
                            className="w-full h-full object-contain"
                            loading="eager"
                            width={800}
                            height={800}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted rounded-xl" />
                        )}
                      </div>
                      {/* Two stacked images on the right */}
                      {[1, 2].map(i => (
                        <div key={i} className="bg-secondary/30 rounded-xl flex items-center justify-center p-2 overflow-hidden">
                          {bundleImages[i] ? (
                            <img
                              src={optimizeShopifyImage(bundleImages[i], 400)}
                              alt={`${PRODUCT_META[i]?.name ?? 'NEUVIE strip'} — included in the bundle`}
                              className="w-full h-full object-contain"
                              loading="eager"
                              width={400}
                              height={400}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted rounded-xl" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="order-2 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-3 py-1.5 rounded-full mb-4 text-xs font-semibold">
                  <Star className="h-3.5 w-3.5 fill-accent" /> 4.9/5 — Loved by busy women
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-4">
                  The Night Out Survival Kit —{' '}
                  <span className="italic text-accent">your 3-strip ritual for late nights done right.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-xl mx-auto lg:mx-0">
                  For the night you won't remember and the morning you will. Three premium dissolving strips. No pills, no water, no excuses.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6 max-w-xl mx-auto lg:mx-0">
                  {['Stay on', 'Wind down', 'Wake up clear'].map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm font-medium">
                      <Check className="h-4 w-4 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Price + ATC */}
                <div className="bg-card rounded-2xl border border-border/40 p-4 md:p-5 shadow-soft mb-4">
                  <div className="flex items-baseline gap-3 mb-3 justify-center lg:justify-start flex-wrap">
                    <span className="text-3xl font-bold text-primary">${BUNDLE.salePrice.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">${BUNDLE.originalPrice.toFixed(2)}</span>
                    <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                      SAVE ${BUNDLE.savings.toFixed(2)} · {BUNDLE.discountPercent}% OFF
                    </span>
                  </div>
                  <Button
                    onClick={handleAddBundle}
                    disabled={busy}
                    className="w-full h-13 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg gap-2"
                  >
                    {busy ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Shop the Bundle  ·  ${BUNDLE.salePrice.toFixed(2)}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    ✓ Free US shipping $50+  ·  ✓ 14-day money-back guarantee  ·  ✓ Made in USA
                  </p>
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <PaymentBadges />
                  </div>
                </div>

                {/* TODO: activate WELCOME15 in Shopify Admin */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm">
                  <Gift className="h-4 w-4 text-accent" />
                  <span>
                    New customer? Use code{' '}
                    <strong className="text-accent">WELCOME15</strong> for 15% off
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-primary/5 border-y border-primary/10">
          <div className="container-wide py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: ShieldCheck, label: 'FDA-Registered Facility' },
                { icon: Flag, label: 'Made in USA' },
                { icon: Truck, label: 'Free Shipping $50+' },
                { icon: Leaf, label: '14-Day Guarantee' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  <span className="text-xs font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value proposition */}
        <section className="py-12 md:py-16">
          <div className="container-wide max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Why this bundle</p>
            <h2 className="font-display text-3xl md:text-4xl mb-5" style={{ letterSpacing: '-0.02em' }}>
              Built for the way you actually live.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Late dinners. Last-minute trips. The wedding you flew across the country for. The Night Out Survival Kit is the
              three-strip ritual for women who say yes to the night — and still want to feel like themselves the next morning.
              Slip it in your clutch, your weekender, your nightstand. Pull it out when you need it.
            </p>
          </div>
        </section>

        {/* What's included — real Shopify product images */}
        <section id="included" className="py-12 md:py-16 bg-secondary/40">
          <div className="container-wide">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">What's inside</p>
              <h2 className="font-display text-3xl md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
                Three strips. One ritual.
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Each strip is designed to do one thing beautifully — together they cover your whole night.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRODUCT_META.map((p, idx) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-card rounded-2xl border border-border/40 shadow-soft overflow-hidden flex flex-col"
                >
                  <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4">
                    {imagesLoading ? (
                      <div className="w-full h-full bg-muted animate-pulse rounded-xl" />
                    ) : bundleImages[idx] ? (
                      <img
                        src={optimizeShopifyImage(bundleImages[idx], 600)}
                        alt={p.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        width={600}
                        height={600}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-xl" />
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="inline-flex self-start items-center gap-1.5 bg-primary/10 text-primary text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-full mb-3">
                      <Sparkles className="h-3 w-3" /> Step {idx + 1}
                    </div>
                    <h3 className="font-display text-xl mb-1">{p.name}</h3>
                    <p className="text-sm text-accent italic mb-4">{p.benefit}</p>
                    <ul className="space-y-2 mt-auto">
                      {p.outcomes.map(o => (
                        <li key={o} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why customers love it */}
        <section id="benefits" className="py-12 md:py-16">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Why customers love it</p>
              <h2 className="font-display text-3xl md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
                Wellness that fits your real life.
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: Plane, title: 'Easy to carry', text: 'Slip a strip in any bag. Travel-ready.' },
                { icon: Droplet, title: 'No water needed', text: 'Dissolves on your tongue in seconds.' },
                { icon: Clock, title: '3 seconds, done', text: 'No pills. No powder. Just routine.' },
                { icon: PackageCheck, title: 'Premium ingredients', text: 'Third-party tested. Made in USA.' },
                { icon: Heart, title: 'Designed for real life', text: 'For nights out, big days, busy weeks.' },
                { icon: Sparkles, title: 'A ritual, not a chore', text: 'Something you actually look forward to.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="text-center md:text-left">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto md:mx-0">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-lg mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-12 md:py-16 bg-secondary/40">
          <div className="container-wide max-w-6xl">
            <div className="text-center mb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Loved by women with busy lifestyles</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-center mb-10" style={{ letterSpacing: '-0.02em' }}>
              The morning-after reviews.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: 'Olivia R.', text: "Took it on my Bachelorette weekend in Miami. Three days. No write-off mornings. I am never traveling without it again." },
                { name: 'Maya T.', text: "I'm a wedding planner. This bundle lives in my emergency kit. Energy strip in the afternoon, hangover one before bed. Game changer." },
                { name: 'Chloé D.', text: "The cognitive relax one is everything. I stop spiraling after a long event and can actually fall asleep. The packaging is also gorgeous." },
                { name: 'Jenna L.', text: "Honestly bought this because it looked pretty. Now I keep one in my clutch, one in my carry-on, one on my nightstand. Obsessed." },
                { name: 'Priya S.', text: "Was skeptical about strips vs pills. They genuinely taste good and dissolve in seconds. Way better than choking down capsules at 2am." },
                { name: 'Hannah W.', text: "Got this as a birthday gift for my sister. She texted me the next morning. Instant convert." },
              ].map(r => (
                <div key={r.name} className="bg-card rounded-2xl p-6 border border-border/30 shadow-soft">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4">"{r.text}"</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-border/30">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to use — 3 steps */}
        <section className="py-12 md:py-16">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">How to use</p>
              <h2 className="font-display text-3xl md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
                Peel. Place. Go.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Peel', text: 'Open one strip from the elegant pouch. Toss-in-bag friendly.' },
                { step: '2', title: 'Place', text: 'Set it on your tongue. Dissolves in 3 seconds, clean taste.' },
                { step: '3', title: 'Go', text: 'On with your night. On with your morning. On with your life.' },
              ].map(s => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display text-xl flex items-center justify-center mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-display text-xl mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-12 md:py-16 bg-secondary/40">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">The smarter choice</p>
              <h2 className="font-display text-3xl md:text-4xl" style={{ letterSpacing: '-0.02em' }}>
                Bundle vs. typical supplement routine.
              </h2>
            </div>
            <div className="bg-card rounded-2xl border border-border/40 shadow-soft overflow-hidden">
              <div className="grid grid-cols-3 text-sm">
                <div className="p-4 md:p-5 font-semibold text-muted-foreground border-b border-border/40"></div>
                <div className="p-4 md:p-5 font-display text-base md:text-lg text-center bg-primary/5 border-b border-l border-r border-border/40">
                  Night Out Bundle
                </div>
                <div className="p-4 md:p-5 font-display text-base md:text-lg text-center text-muted-foreground border-b border-border/40">
                  Typical routine
                </div>
                {[
                  ['Portable', true, false],
                  ['No water needed', true, false],
                  ['Dissolves in 3 seconds', true, false],
                  ['Premium bundle savings', true, false],
                  ['Designed for real nights', true, false],
                  ['Tastes good', true, false],
                ].map(([label, a, b], i, arr) => (
                  <div key={label as string} className="contents">
                    <div className={`p-4 md:p-5 font-medium ${i < arr.length - 1 ? 'border-b border-border/40' : ''}`}>{label}</div>
                    <div className={`p-4 md:p-5 text-center bg-primary/5 border-l border-r border-border/40 ${i < arr.length - 1 ? 'border-b' : ''}`}>
                      {a ? <Check className="h-5 w-5 text-primary inline" /> : <span className="text-muted-foreground">—</span>}
                    </div>
                    <div className={`p-4 md:p-5 text-center text-muted-foreground ${i < arr.length - 1 ? 'border-b border-border/40' : ''}`}>
                      {b ? <Check className="h-5 w-5 text-primary inline" /> : <span>—</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div id="faq">
          <ProductFAQs
            customFaqs={[
              {
                question: "What's included in the Night Out Survival Kit?",
                answer: 'Three full-size NEUVIE dissolving strip products: Hangover Recovery, Energy, and Cognitive Relax. Each one is designed for a different moment of your night and the morning after.',
              },
              {
                question: 'How do I use the strips?',
                answer: 'Peel one from the pouch, place it on your tongue, and let it dissolve. No water, no pills, no chasing it down. The whole thing takes about 3 seconds.',
              },
              {
                question: 'When should I take them?',
                answer: 'Energy in the late afternoon or before you head out. Hangover before bed and again in the morning if you need it. Cognitive Relax when you want to wind down. There are no rigid rules — use them when they fit your night.',
              },
              {
                question: 'Are they easy to carry when traveling?',
                answer: 'That is exactly why we made them. The pouches are slim enough for a clutch, durable enough for a weekender, and TSA-friendly. Zero mess, zero spills.',
              },
              {
                question: 'Do I need water?',
                answer: 'Never. The strips dissolve on your tongue in seconds. No glass, no sink, no awkward bathroom trips at the bar.',
              },
              {
                question: 'Is this a good gift or starter kit?',
                answer: 'It is one of our most-gifted bundles — perfect for birthdays, bachelorettes, hostess gifts, and anyone new to NEUVIE. The packaging is gift-ready as it arrives.',
              },
              {
                question: 'How fast do they fit into my routine?',
                answer: 'Immediately. There is nothing to remember, prep, or measure. Most customers say the bundle replaces three things they used to forget to take.',
              },
              {
                question: 'What makes NEUVIE different?',
                answer: 'Premium ingredients, third-party tested, made in the USA in an FDA-registered facility. And a format that fits the life you actually live — elegant, simple, and easy to keep up with.',
              },
            ]}
          />
        </div>

        {/* Final CTA */}
        <section className="py-14 md:py-20 bg-primary/5">
          <div className="container-wide max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Limited bundle savings</p>
            <h2 className="font-display text-3xl md:text-4xl mb-3" style={{ letterSpacing: '-0.02em' }}>
              Your next night out, upgraded.
            </h2>
            <p className="text-muted-foreground mb-7 max-w-md mx-auto">
              Three strips. One ritual. A morning that feels like you.
            </p>
            <div className="bg-card rounded-2xl border border-border/40 p-5 shadow-soft max-w-md mx-auto mb-4">
              <div className="flex items-baseline gap-3 mb-4 justify-center flex-wrap">
                <span className="text-3xl font-bold text-primary">${BUNDLE.salePrice.toFixed(2)}</span>
                <span className="text-lg text-muted-foreground line-through">${BUNDLE.originalPrice.toFixed(2)}</span>
                <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                  SAVE ${BUNDLE.savings.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={handleAddBundle}
                disabled={busy}
                className="w-full h-13 px-8 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg gap-2"
              >
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <><ShoppingCart className="h-5 w-5" /> Shop the Bundle</>}
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                ✓ Free shipping $50+ · ✓ 14-day money-back · ✓ Made in USA
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border/40 p-3 shadow-elevated" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="text-[10px] text-muted-foreground line-through leading-none">${BUNDLE.originalPrice.toFixed(2)}</div>
            <div className="text-lg font-bold text-primary leading-tight">${BUNDLE.salePrice.toFixed(2)}</div>
          </div>
          <Button
            onClick={handleAddBundle}
            disabled={busy}
            className="flex-1 h-12 text-sm font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShoppingCart className="h-4 w-4" /> Shop the Bundle</>}
          </Button>
        </div>
      </div>

      <div className="lg:hidden h-20" aria-hidden />

      <Footer />
      <CartDrawer />
    </div>
  );
}
