import { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check, ShieldCheck, Truck, Clock, Sparkles, Plus, Minus,
  Star, Package, Leaf, FlaskConical, Heart, Zap, Moon, Award,
  ChevronDown, ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { PageMeta, ProductJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo';
import { bundles, productInfo } from '@/data/bundles';
import { BundleCard } from '@/components/shop/BundleCard';
import { useBundleImages } from '@/hooks/useBundleImages';
import { useCartStore } from '@/stores/cartStore';
import { optimizeShopifyImage } from '@/lib/shopify';
import { toast } from 'sonner';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

export default function BundleDetail() {
  const { id } = useParams<{ id: string }>();
  const bundle = useMemo(() => bundles.find(b => b.id === id), [id]);
  const { images: shopifyImages, isLoading: imagesLoading } = useBundleImages(bundle?.variantIds ?? []);
  const addItem = useCartStore(s => s.addItem);
  const isLoading = useCartStore(s => s.isLoading);
  const [qty, setQty] = useState(1);

  if (!bundle) return <Navigate to="/bundles" replace />;

  const heroImage = shopifyImages[0] ?? '';
  const pricePerProduct = (bundle.salePrice / bundle.products.length).toFixed(2);

  const handleAddToCart = async () => {
    const imageEdges = heroImage ? [{ node: { url: heroImage, altText: bundle.name } }] : [];
    await addItem({
      product: {
        node: {
          id: `bundle-${bundle.id}`,
          title: `${bundle.name} – ${bundle.packSize}`,
          description: `Includes: ${bundle.products.join(', ')}. ${bundle.tagline}`,
          handle: bundle.id,
          priceRange: { minVariantPrice: { amount: bundle.salePrice.toString(), currencyCode: 'USD' } },
          images: { edges: imageEdges },
          variants: {
            edges: [{
              node: {
                id: bundle.shopifyBundleVariantId,
                title: bundle.products.join(' + '),
                price: { amount: bundle.salePrice.toString(), currencyCode: 'USD' },
                availableForSale: true,
                selectedOptions: [{ name: 'Title', value: 'Default Title' }],
              },
            }],
          },
          options: [{ name: 'Title', values: ['Default Title'] }],
        },
      } as any,
      variantId: bundle.shopifyBundleVariantId,
      variantTitle: bundle.products.join(' + '),
      price: { amount: bundle.salePrice.toString(), currencyCode: 'USD' },
      quantity: qty,
      selectedOptions: [{ name: 'Title', value: 'Default Title' }],
      bundleId: `bundle-${bundle.id}`,
      bundleName: bundle.name,
      bundleDiscountCode: bundle.discountCode,
    });
    toast.success('Bundle added to cart!', {
      description: `${bundle.name} – ${bundle.packSize}`,
      position: 'top-center',
    });
  };

  // Outcome benefits (generic + bundle-aware)
  const outcomes = getOutcomes(bundle.category, bundle.products);

  // FAQs
  const faqs = [
    {
      q: 'Why should I buy the bundle instead of single strips?',
      a: `You save $${bundle.savings.toFixed(2)} (${bundle.discountPercent}% off) and get a complete routine designed to work together. Bundles ship in the same box and replace ${bundle.products.length} separate decisions with one.`,
    },
    {
      q: 'How long does this bundle last?',
      a: `Each strip pack contains a 30-day supply. With ${bundle.products.length} products in this bundle, that's roughly one full month of your complete routine.`,
    },
    {
      q: 'Can I take all of these strips together?',
      a: 'Yes. Every NEUVIE strip is formulated to be combined safely. Most customers stack their morning strips at once and take evening strips before bed. If you take prescription medication, check with your doctor first.',
    },
    {
      q: 'How fast do the strips dissolve?',
      a: 'Around 30 seconds on the tongue. Active ingredients are absorbed sublingually, which research suggests can be up to 5× faster than pills that go through digestion.',
    },
    {
      q: 'What if I don\'t love it?',
      a: '14-day money-back guarantee. If the bundle doesn\'t fit your routine, email team@tryneuvie.com and we\'ll refund you — no questions asked.',
    },
    {
      q: 'How fast does it ship?',
      a: 'Free US shipping on this bundle (orders $50+). Processed in 1–2 business days, delivered in 3–5 business days from our US facility.',
    },
  ];

  const seoTitle = `${toTitleCase(bundle.name)} – Save ${bundle.discountPercent}% | NEUVIE™`;
  const seoDesc = `${bundle.tagline} Save $${bundle.savings.toFixed(0)} on the ${bundle.packSize} bundle. ${bundle.products.join(', ')}. Free US shipping $50+.`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title={seoTitle} description={seoDesc} ogImage={heroImage || undefined} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://tryneuvie.com/' },
        { name: 'Bundles', url: 'https://tryneuvie.com/bundles' },
        { name: toTitleCase(bundle.name), url: `https://tryneuvie.com/bundles/${bundle.id}` },
      ]} />
      <ProductJsonLd
        product={{
          title: `${toTitleCase(bundle.name)} Bundle`,
          description: `${bundle.tagline} Includes ${bundle.products.join(', ')}.`,
          handle: bundle.id,
          priceRange: { minVariantPrice: { amount: bundle.salePrice.toString(), currencyCode: 'USD' } },
          images: { edges: heroImage ? [{ node: { url: heroImage, altText: bundle.name } }] : [] },
          variants: { edges: [{ node: { availableForSale: true } }] },
        }}
      />
      <FAQJsonLd faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />

      <Navbar />

      <main className="flex-1">
        {/* ============ HERO / ABOVE THE FOLD ============ */}
        <section className="relative pt-6 md:pt-10 pb-10 md:pb-14">
          <div className="container-wide">
            {/* Breadcrumb */}
            <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/bundles" className="hover:text-foreground">Bundles</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{toTitleCase(bundle.name)}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-card rounded-2xl border border-border/50 overflow-hidden p-4 md:p-6 lg:sticky lg:top-[140px]"
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start pointer-events-none">
                  <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5" /> {bundle.packSize}
                  </span>
                  {bundle.badge && (
                    <span className="bg-accent text-accent-foreground px-3 py-1.5 rounded-lg text-xs font-bold">
                      {bundle.badge}
                    </span>
                  )}
                </div>

                {imagesLoading ? (
                  <div className="aspect-square flex items-center justify-center text-muted-foreground">Loading…</div>
                ) : shopifyImages.length > 0 ? (
                  <div className={`grid gap-2 ${
                    shopifyImages.length === 1 ? 'grid-cols-1' :
                    shopifyImages.length === 2 ? 'grid-cols-2' :
                    shopifyImages.length === 3 ? 'grid-cols-3' :
                    shopifyImages.length === 4 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {shopifyImages.slice(0, 6).map((url, i) => (
                      <div key={i} className="bg-background rounded-xl border border-border/30 p-3 aspect-square flex items-center justify-center">
                        <img
                          src={optimizeShopifyImage(url, 600)}
                          alt={`${bundle.name} – ${bundle.products[i] ?? ''}`}
                          className="w-full h-full object-contain"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-square bg-muted/30 rounded-xl" />
                )}
              </motion.div>

              {/* DETAILS */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="space-y-5"
              >
                {/* Reviews summary near top */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />)}
                  </div>
                  <span className="text-foreground font-semibold">4.8</span>
                  <span className="text-muted-foreground">· Based on verified NEUVIE customer reviews</span>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">
                    {bundle.packSize} Bundle · Routine
                  </p>
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                    {toTitleCase(bundle.name)}
                  </h1>
                  <p className="mt-3 text-lg text-muted-foreground italic">"{bundle.tagline}"</p>
                  {bundle.subline && (
                    <p className="mt-2 text-sm text-muted-foreground">{bundle.subline}</p>
                  )}
                </div>

                {/* Price block */}
                <div className="bg-muted/40 rounded-2xl p-5 border border-border/40">
                  <div className="flex items-end gap-3 flex-wrap">
                    <span className="text-4xl font-bold text-primary">${bundle.salePrice.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">${bundle.originalPrice.toFixed(2)}</span>
                    <span className="bg-destructive/10 text-destructive px-2.5 py-1 rounded-md text-xs font-bold">
                      SAVE ${bundle.savings.toFixed(2)} · {bundle.discountPercent}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Just <span className="font-semibold text-foreground">${pricePerProduct}</span> per strip pack ·
                    {' '}30-day supply per pack
                  </p>
                </div>

                {/* Quantity + ATC */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="p-3 hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 font-semibold min-w-[2.5rem] text-center">{qty}</span>
                      <button
                        onClick={() => setQty(q => q + 1)}
                        className="p-3 hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <Button
                      onClick={handleAddToCart}
                      disabled={isLoading}
                      className="flex-1 h-14 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                    >
                      <Plus className="h-5 w-5 mr-1" />
                      Add Bundle to Cart — ${(bundle.salePrice * qty).toFixed(2)}
                    </Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Discount auto-applies at checkout · Or use code{' '}
                    <span className="font-mono font-bold text-primary">{bundle.discountCode}</span>
                  </p>
                </div>

                {/* Trust line */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <TrustBadge icon={<Truck className="h-4 w-4" />} label="Free US Shipping" />
                  <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} label="14-Day Guarantee" />
                  <TrustBadge icon={<Clock className="h-4 w-4" />} label="Ships in 1–2 Days" />
                </div>

                {/* What's inside (compact) */}
                <div className="border border-border/50 rounded-xl p-4 bg-card">
                  <p className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-3">
                    What's Inside ({bundle.products.length} products)
                  </p>
                  <ul className="space-y-2">
                    {bundle.products.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-foreground">{p} Strips</span>
                        <span className="ml-auto text-xs text-muted-foreground">30-day supply</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============ WHY THIS BUNDLE ============ */}
        <section className="py-14 md:py-20 bg-card border-y border-border/30">
          <div className="container-wide max-w-4xl text-center">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Why this bundle</p>
            <h2 className="font-display text-3xl md:text-4xl mb-5">
              {getWhyHeadline(bundle.category)}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {getWhyCopy(bundle)}
            </p>
            <div className="mt-8 inline-block bg-background border border-border/50 rounded-2xl px-6 py-4 text-sm text-left">
              <p className="font-semibold text-foreground mb-1">Built for:</p>
              <p className="text-muted-foreground italic">{getAudience(bundle.category)}</p>
            </div>
          </div>
        </section>

        {/* ============ WHAT'S INCLUDED (detailed cards) ============ */}
        <section className="py-14 md:py-20">
          <div className="container-wide">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">What's included</p>
              <h2 className="font-display text-3xl md:text-4xl">Your {bundle.products.length}-step routine</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Each strip is a 30-day supply. Use them together — they're designed to work as a system.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {bundle.products.map((productName, i) => {
                const variantId = bundle.variantIds[i];
                const info = productInfo[variantId];
                const img = shopifyImages[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border/50 rounded-2xl p-5 hover:shadow-elevated transition-shadow"
                  >
                    <div className="aspect-square bg-background rounded-xl border border-border/30 p-4 mb-4 flex items-center justify-center">
                      {img ? (
                        <img src={optimizeShopifyImage(img, 400)} alt={productName} className="w-full h-full object-contain" loading="lazy" />
                      ) : (
                        <Package className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Step {i + 1}</p>
                    <h3 className="font-display text-xl mb-1">{productName} Strips</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getProductBenefit(productName)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      30-day supply · ${info?.price ?? '34.99'} value
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ OUTCOMES ============ */}
        <section className="py-14 md:py-20 bg-card border-y border-border/30">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">What you'll feel</p>
              <h2 className="font-display text-3xl md:text-4xl">The complete benefit of the routine</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {outcomes.map((o, i) => (
                <div key={i} className="bg-background rounded-2xl p-6 border border-border/40">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {o.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-1.5">{o.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STRIPS VS PILLS ============ */}
        <section className="py-14 md:py-20">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">The format advantage</p>
              <h2 className="font-display text-3xl md:text-4xl">Why strips beat pills, every time</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-border/40">
                <p className="font-semibold text-muted-foreground mb-4">Traditional pills</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2"><span className="text-muted-foreground">✕</span> Slow digestion: 30–60 min to act</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">✕</span> Bulky bottles, pill organizers</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">✕</span> Hard to swallow, easy to skip</li>
                  <li className="flex gap-2"><span className="text-muted-foreground">✕</span> Need water, planning, routine props</li>
                </ul>
              </div>
              <div className="bg-primary/5 rounded-2xl p-6 border-2 border-primary/30">
                <p className="font-semibold text-primary mb-4">NEUVIE strips</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Sublingual: ~30 sec to dissolve</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Slim packs that fit your pocket</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> No water, no fuss — anywhere</li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> A 3-second daily ritual you'll keep</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HOW TO USE ============ */}
        <section className="py-14 md:py-20 bg-card border-y border-border/30">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Your daily ritual</p>
              <h2 className="font-display text-3xl md:text-4xl">How to use this bundle</h2>
              <p className="text-muted-foreground mt-3">Three seconds. That's the whole routine.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { step: '01', title: 'Open the strip', desc: 'Tear open one strip from the pack — slim enough to live in your bag.' },
                { step: '02', title: 'Place on tongue', desc: 'It dissolves in ~30 seconds. No water needed.' },
                { step: '03', title: 'Done. Keep going.', desc: 'Stack the strips that fit your moment — morning energy, evening calm.' },
              ].map((s) => (
                <div key={s.step} className="bg-background rounded-2xl p-6 border border-border/40">
                  <p className="text-3xl font-display text-accent mb-2">{s.step}</p>
                  <h3 className="font-semibold mb-1.5">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SOCIAL PROOF (no fabricated reviews) ============ */}
        <section className="py-14 md:py-20">
          <div className="container-wide max-w-4xl text-center">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Trusted by NEUVIE customers</p>
            <h2 className="font-display text-3xl md:text-4xl mb-4">Bundles are our most-loved purchase</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Most NEUVIE customers come back for a second bundle within 30 days. The reason is simple: a routine works
              better than a single strip.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Stat value="4.8★" label="Avg. customer rating" />
              <Stat value="14-Day" label="Money-back guarantee" />
              <Stat value="100%" label="Made in USA" />
            </div>
          </div>
        </section>

        {/* ============ SCIENCE / QUALITY ============ */}
        <section className="py-14 md:py-20 bg-card border-y border-border/30">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">Quality promise</p>
              <h2 className="font-display text-3xl md:text-4xl">Clean. Tested. Made in USA.</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <QualityCard icon={<FlaskConical className="h-5 w-5" />} title="Third-party tested" desc="Every batch tested for purity and potency." />
              <QualityCard icon={<Leaf className="h-5 w-5" />} title="Clean ingredients" desc="No artificial dyes, fillers or unnecessary additives." />
              <QualityCard icon={<Award className="h-5 w-5" />} title="FDA-registered facility" desc="Manufactured in a US FDA-registered facility." />
              <QualityCard icon={<Sparkles className="h-5 w-5" />} title="Clinically studied doses" desc="Active ingredients backed by peer-reviewed research." />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
              These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure or prevent any disease.
            </p>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="py-14 md:py-20">
          <div className="container-wide max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3">FAQ</p>
              <h2 className="font-display text-3xl md:text-4xl">Questions, answered.</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border/40 rounded-xl px-5">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-warm)' }} />
          <div className="container-wide max-w-3xl text-center relative z-10">
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-4">Ready when you are</p>
            <h2 className="font-display text-3xl md:text-5xl mb-5 leading-tight">
              Start your {toTitleCase(bundle.name)} routine — save ${bundle.savings.toFixed(0)} today.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              One bundle. {bundle.products.length} strips that work together. A routine you'll actually keep.
            </p>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="h-14 px-8 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl"
            >
              <Plus className="h-5 w-5 mr-1" />
              Add Bundle — ${bundle.salePrice.toFixed(2)} (Save {bundle.discountPercent}%)
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Free US shipping · 14-day money-back guarantee · Cancel anytime
            </p>
          </div>
        </section>

        {/* ============ CROSS-SELL OTHER BUNDLES ============ */}
        <section className="py-14 md:py-20 bg-card border-t border-border/30">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2">Explore more</p>
                <h2 className="font-display text-2xl md:text-3xl">Other routines you might love</h2>
              </div>
              <Link to="/bundles" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                View all bundles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.filter(b => b.id !== bundle.id).slice(0, 3).map((b, i) => (
                <BundleCard key={b.id} bundle={b} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- helpers ---------- */

function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-muted/40 rounded-xl py-3 px-2 border border-border/30">
      <div className="text-primary mb-1">{icon}</div>
      <p className="text-[11px] font-semibold text-foreground leading-tight">{label}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-card rounded-2xl border border-border/40 p-5">
      <p className="font-display text-2xl md:text-3xl text-primary mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function QualityCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-background rounded-2xl border border-border/40 p-5">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function getWhyHeadline(category: string) {
  switch (category) {
    case 'performance': return 'Built for the days you have to show up.';
    case 'beauty': return 'Beauty isn\'t one product — it\'s a rhythm.';
    case 'wellness': return 'The boring foundation. The reason everything else works.';
    default: return 'A complete routine, in one box.';
  }
}

function getWhyCopy(bundle: { products: string[]; tagline: string; subline: string }) {
  return `Single strips work. Routines compound. We grouped these ${bundle.products.length} strips because they support each other — every one fills a gap the others leave open. ${bundle.subline || bundle.tagline}`;
}

function getAudience(category: string) {
  switch (category) {
    case 'performance': return 'High-output people who can\'t afford to crash — founders, parents, athletes, the always-on.';
    case 'beauty': return 'Anyone who wants their glow to come from inside out, not just from a serum.';
    case 'wellness': return 'People who finally want to stop picking just one thing to fix and treat their body like a system.';
    default: return 'Anyone serious about a routine that actually fits real life.';
  }
}

function getOutcomes(category: string, _products: string[]) {
  const base = [
    { icon: <Sparkles className="h-5 w-5" />, title: 'Feels like a ritual, not a chore', desc: 'A 3-second daily routine you\'ll actually keep — even on the busy days.' },
    { icon: <Zap className="h-5 w-5" />, title: 'Fast absorption', desc: 'Sublingual delivery means active ingredients hit your system minutes — not hours — after the strip dissolves.' },
    { icon: <Heart className="h-5 w-5" />, title: 'Real, compounding results', desc: 'Built around how your body actually works. The benefit shows up in weeks, not seconds.' },
  ];
  if (category === 'performance') {
    return [
      { icon: <Zap className="h-5 w-5" />, title: 'Sharper focus, faster', desc: 'Cognitive support that kicks in when you need to think, not 90 minutes later.' },
      { icon: <Sparkles className="h-5 w-5" />, title: 'Steady energy, no crash', desc: 'Sustained lift designed for full-day output — without the afternoon dip.' },
      ...base.slice(2),
    ];
  }
  if (category === 'beauty') {
    return [
      { icon: <Sparkles className="h-5 w-5" />, title: 'Glow from the inside', desc: 'Collagen, biotin and skin-supporting nutrients work where serums can\'t reach.' },
      { icon: <Heart className="h-5 w-5" />, title: 'Stronger hair & nails', desc: 'Building blocks your body uses every single day — finally in the dose it needs.' },
      ...base.slice(0, 1),
    ];
  }
  if (category === 'wellness') {
    return [
      { icon: <Leaf className="h-5 w-5" />, title: 'Better digestion, less bloat', desc: 'Probiotic and gut-supporting strips that work with — not against — your body.' },
      { icon: <Moon className="h-5 w-5" />, title: 'Calmer system', desc: 'Daily support that quiets the noise so the rest of your routine can do its job.' },
      ...base,
    ].slice(0, 3);
  }
  return base;
}

function getProductBenefit(productName: string): string {
  const map: Record<string, string> = {
    'Mushroom Focus': 'Lion\'s Mane and adaptogenic mushrooms for sharper, calmer focus.',
    'Energy': 'Clean B-vitamins and natural caffeine for steady, no-crash energy.',
    'Cognitive Relax': 'L-theanine and calming nootropics that quiet a racing mind.',
    'Sleep': 'Melatonin-free sleep support for deeper, more restorative rest.',
    'Beauty + Collagen': 'Hydrolyzed collagen peptides for skin elasticity and radiance.',
    'Hair, Skin & Nails': 'Biotin, zinc and silica — the building blocks of stronger growth.',
    'Bone Support': 'Calcium and Vitamin D3 for daily skeletal foundation.',
    'Probiotic': 'Multi-strain probiotic for daily gut balance and metabolism.',
    'Digestive': 'Digestive enzymes that ease bloating and support gut comfort.',
    'Iron': 'Gentle iron with cofactors — energy without the stomach upset.',
    'Appetite Balance': 'Targeted support for satiety and balanced appetite.',
    'Hangover': 'Electrolytes and liver-supporting nutrients for a softer morning.',
    'Libido Support': 'Adaptogens and circulation-supporting nutrients for vitality.',
  };
  return map[productName] ?? 'A clinically dosed wellness strip designed to work as part of your routine.';
}
