import { useEffect, useState } from 'react';
import productsLineup from '@/assets/neuvie-products-lineup.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, ChevronRight, Leaf, ShieldCheck, FlaskConical, Flag, ShoppingCart } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/ProductCard';
import { BundleCard } from '@/components/shop/BundleCard';
import { bundles } from '@/data/bundles';
import { PageMeta } from '@/components/seo';
import { HomepageFAQs } from '@/components/home/HomepageFAQs';
import { HowToUse } from '@/components/home/HowToUse';
import { WhyNeuvie } from '@/components/home/WhyNeuvie';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';
import { HeroTrustBar } from '@/components/home/HeroTrustBar';
import { OutcomeBenefits } from '@/components/home/OutcomeBenefits';
import { StickyMobileCTA } from '@/components/home/StickyMobileCTA';
import { PaymentTrustStrip } from '@/components/home/PaymentTrustStrip';
import { QuickCategoryPicker } from '@/components/home/QuickCategoryPicker';
import { InlineEmailCapture } from '@/components/home/InlineEmailCapture';
import { useHeroVariant } from '@/hooks/useHeroVariant';

// ─── DATA ──────────────────────────────────────────────
const reviews = [
  { id: '1', name: 'Sarah M.', text: "I used to forget my vitamins every single day. Now it's literally 3 seconds — strip on tongue, done. My energy is noticeably better by week two.", rating: 5, product: 'Energy Strips', timeAgo: '2 weeks ago' },
  { id: '2', name: 'Jess T.', text: "Found NEUVIE on TikTok and honestly thought it was too good to be true. But my sleep is SO much better. I fall asleep in like 15 minutes now.", rating: 5, product: 'Sleep Strips', timeAgo: '1 week ago' },
  { id: '3', name: 'Emily K.', text: "My nails were always brittle and breaking. After 6 weeks on Hair, Skin & Nails strips, they're noticeably stronger. My hairdresser even commented on my hair.", rating: 5, product: 'Hair, Skin & Nails', timeAgo: '3 weeks ago' },
  { id: '4', name: 'Aaliyah R.', text: "I'm not a pill person. Never have been. These strips actually make me WANT to take my supplements. The taste is good and I can feel the difference.", rating: 5, product: 'Daily Multivitamin', timeAgo: '1 month ago' },
  { id: '5', name: 'Lisa P.', text: "Bought the Beauty Bundle for my bestie's birthday and she texted me three days later asking where I got them. Now we're both subscribed 💛", rating: 5, product: 'Beauty Bundle', timeAgo: '2 weeks ago' },
];

const featuredBundles = bundles.filter(b =>
  ['daily-wellness', 'beauty-glow', 'sleep-recover', 'best-value-mega'].includes(b.id)
);

// ─── COMPONENT ─────────────────────────────────────────
export default function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const heroVariant = useHeroVariant();

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts(4);
      setProducts(data);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <PageMeta
        title="Wellness Strips – Dissolving Supplements | NEUVIE™"
        description="NEUVIE dissolving wellness strips. Energy, sleep, beauty & gut health. Clinically studied ingredients, 5x faster absorption. Free US shipping $50+."
      />
      
      <Navbar />

      <main className="flex-1">

        {/* ═══════════════════════════════════════════════
            1. HERO — Emotional, Identity-Driven for Women 18-44
        ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />

          <div className="container-wide relative z-10 py-16 md:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                {/* Urgency badge — variant-driven */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-full mb-5"
                >
                  <span className="text-sm font-semibold">{heroVariant.badge}</span>
                </motion.div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl leading-[1.08] mb-4">
                  {heroVariant.headlineMain}{' '}
                  <span className="italic text-accent">{heroVariant.headlineItalic}</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
                  {heroVariant.subline}
                </p>

                {/* Star rating social proof */}
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" strokeWidth={1.5} />
                    ))}
                  </div>
                  <span className="font-medium">5,000+ Happy Customers</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center lg:justify-start mb-2">
                  <Link to={heroVariant.id === 'b' ? '/quiz' : '/bundles'} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto h-14 px-10 text-base font-semibold rounded-xl group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-elevated transition-all">
                      {heroVariant.ctaPrimary}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/shop" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto h-12 px-6 text-sm font-semibold rounded-xl border-2 border-primary/40 bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap">
                      Shop All Strips
                    </Button>
                  </Link>
                </div>

                {/* Price anchor + first-order incentive */}
                <p className="text-xs md:text-sm text-muted-foreground text-center lg:text-left mb-1">
                  Bundles starting from <span className="font-semibold text-foreground">$39.99</span> — Save up to 20%
                </p>
                <p className="text-xs md:text-sm text-accent font-semibold text-center lg:text-left mb-5">
                  New here? Use code WELCOME10 for 10% off your first order
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground justify-center lg:justify-start">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-primary" />
                    Free shipping $50+
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-primary" />
                    14-day money back
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-primary" />
                    Made in USA
                  </span>
                </div>

                {/* Quick Category Picker */}
                <QuickCategoryPicker />
              </motion.div>

              {/* Hero Image */}
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              >
                <div className="relative mx-auto max-w-[340px] sm:max-w-[460px] lg:max-w-[540px]">
                  <div className="absolute inset-0 bg-accent/10 rounded-[2rem] rotate-3 scale-[1.02]" />
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-elevated">
                    <img
                      src={productsLineup}
                      alt="NEUVIE fast-dissolving wellness strips lineup — Energy, Sleep, Beauty, Focus and Gut Health supplements"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hero Trust Bar */}
            <div className="mt-12 md:mt-16 pt-6 border-t border-border/40">
              <HeroTrustBar />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            2. BESTSELLERS — Immediately After Hero
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-secondary/40">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                MOST POPULAR
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3">
                What everyone's adding to their routine
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Our top-rated strips — starting at just $0.83/day.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-2">No products found.</p>
                <p className="text-sm text-muted-foreground">Products will appear once added to your store.</p>
              </div>
            )}

            <motion.div className="text-center mt-10" {...fadeUp}>
              <Link to="/shop">
                <Button className="h-13 px-8 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse All 13 Strips
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            3. SOCIAL PROOF — Reviews (before explanation)
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background overflow-hidden">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3">
                Real people. Real results.
              </h2>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">4.9/5 — 2,400+ verified reviews</span>
              </div>
            </motion.div>
          </div>

          {/* Scrolling Review Cards */}
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto pb-4 px-4 md:px-12 scrollbar-hide snap-x snap-mandatory">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  className="flex-shrink-0 w-[300px] md:w-[380px] snap-start"
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="bg-card rounded-2xl p-6 h-full border border-border/30 shadow-soft hover:shadow-card transition-all duration-500">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed mb-3">"{review.text}"</p>
                    <p className="text-xs text-muted-foreground mb-3">{review.timeAgo}</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{review.name}</p>
                        <div className="flex items-center gap-1 text-primary">
                          <Check className="h-3 w-3" />
                          <span className="text-[10px] font-medium">Verified Buyer · {review.product}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          {/* Review CTA */}
          <div className="container-wide text-center mt-8">
             <Link to="/shop">
              <Button variant="outline" className="h-12 px-8 text-sm font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Explore All Wellness Strips
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Inline Email Capture — after social proof */}
          <div className="container-wide mt-10">
            <InlineEmailCapture />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            4. HOW TO USE — The Ritual (keep it short)
        ═══════════════════════════════════════════════ */}
        <HowToUse />

        {/* ═══════════════════════════════════════════════
            5. OUTCOME BENEFITS — What Changes
        ═══════════════════════════════════════════════ */}
        <OutcomeBenefits />

        {/* Mid-page conversion nudge */}
        <section className="py-10 md:py-14 bg-accent/5 border-y border-accent/10">
          <div className="container-wide text-center">
            <p className="text-lg md:text-xl font-display mb-4">Still deciding? Start with our most popular strip.</p>
            <Link to="/product/energy-strips-2">
              <Button className="h-13 px-8 text-sm font-semibold rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow">
                Try Energy Strips — $34.99
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-3">Free shipping on orders $50+ · 14-day money-back guarantee</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            6. BUNDLES — Value / Upsell
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-secondary/40">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                SAVE MORE
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3">
                Build your daily routine — save up to 20%
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                Our curated bundles pair the strips that work best together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredBundles.map((bundle, index) => (
                <BundleCard key={bundle.id} bundle={bundle} index={index} />
              ))}
            </div>

            <motion.div className="mt-10 text-center" {...fadeUp}>
              <Link to="/bundles">
                <Button variant="outline" className="h-13 px-8 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl">
                  View All Bundles
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            7. WHY NEUVIE — Deep Dive (Quality + Science)
        ═══════════════════════════════════════════════ */}
        <WhyNeuvie />

        {/* ═══════════════════════════════════════════════
            8. FAQs
        ═══════════════════════════════════════════════ */}
        <HomepageFAQs />

        {/* ═══════════════════════════════════════════════
            FINAL CTA — Last Chance Before Footer
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container-wide text-center max-w-2xl">
            <motion.div {...fadeUp}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
                Ready to feel the difference?
              </h2>
              <p className="text-primary-foreground/70 text-lg mb-8 max-w-md mx-auto">
                Join thousands who replaced their pill bottles with something better. Free shipping on orders $50+.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                 <Link to="/shop">
                    <Button className="h-14 px-10 text-base font-semibold rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Shop All Strips Now
                    </Button>
                  </Link>
                 <Link to="/bundles">
                    <Button variant="outline" className="h-14 px-10 text-base font-semibold rounded-xl border-2 border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors duration-200">
                      Save 20% — Build a Bundle
                    </Button>
                  </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SEO FAQ SECTION — All SEO content as accordion
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-wide">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
                Everything You Need to Know
              </h2>
              <p className="text-muted-foreground">
                Your questions about fast-dissolving wellness strips — answered.
              </p>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem value="why-strips" className="bg-card rounded-xl border border-border/50 px-6 shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    Why fast-dissolving wellness strips?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    <p className="mb-4">
                      Traditional supplements were not designed for modern life. Pills are easy to forget, powders are messy, and gummies 
                      often contain too much sugar. Fast-dissolving wellness strips solve all of these problems. NEUVIE dissolving supplement 
                      strips are thin, portable, and require no water — making them the perfect daily wellness ritual for anyone who 
                      refuses to compromise on their health. No pills, no powder, just a simple three-second moment that fits any lifestyle.
                    </p>
                    <p>
                      Each NEUVIE strip dissolves on your tongue in about 30 seconds and absorbs directly through the oral mucosa. According 
                      to{' '}
                      <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6390339/" target="_blank" rel="nofollow noopener noreferrer" className="text-primary hover:underline">
                        published research on oral thin films
                      </a>, sublingual delivery can provide up to 5× faster absorption compared to standard capsules — making your daily 
                      wellness routine more efficient and effective.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="formulas" className="bg-card rounded-xl border border-border/50 px-6 shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    What formulas does NEUVIE offer?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    <p className="mb-4">
                      Our collection includes 13 unique fast-dissolving formulas covering{' '}
                      <Link to="/shop" className="text-primary hover:underline">energy and focus supplements</Link>,{' '}
                      sleep and relaxation, beauty and collagen support, gut health and digestion, and essential daily vitamins. 
                      Every formula is clinically dosed with ingredients backed by{' '}
                      <Link to="/science" className="text-primary hover:underline">peer-reviewed scientific research</Link>.
                    </p>
                    <p>
                      NEUVIE strips are manufactured in{' '}
                      <a href="https://www.fda.gov/food/registration-food-facilities-and-other-submissions/registration-food-facilities" target="_blank" rel="nofollow noopener noreferrer" className="text-primary hover:underline">
                        FDA-registered facilities
                      </a>{' '}
                      in the United States and independently verified by third-party labs for purity, potency, and safety. 
                      Every ingredient is non-GMO, and most formulas are vegan and gluten-free.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-it-works" className="bg-card rounded-xl border border-border/50 px-6 shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    How do NEUVIE dissolving strips work?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    <p className="mb-4">
                      Using NEUVIE strips is the simplest daily wellness routine you will ever adopt. The process takes just three steps: 
                      First, place a dissolving strip supplement on your tongue. Second, the strip dissolves in approximately 30 seconds — no 
                      water needed, no effort required. Third, the clinically studied ingredients absorb rapidly through the oral tissue and 
                      begin working in your system. That is your entire wellness strips daily routine — done before you finish brushing your teeth.
                    </p>
                    <p>
                      Unlike traditional capsules that must travel through your digestive system, fast-dissolving supplements deliver ingredients 
                      directly through the oral mucosa for fast absorption. This sublingual delivery method is supported by clinical research and 
                      is one of the reasons NEUVIE strips can achieve up to 5× faster absorption than standard pills.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-are-strips" className="bg-card rounded-xl border border-border/50 px-6 shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    What are dissolving wellness strips?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    NEUVIE dissolving wellness strips are thin oral films that deliver vitamins, minerals, and botanical extracts 
                    directly on your tongue. They dissolve in about 30 seconds and absorb through the oral tissue — no water, no pills, 
                    no powder needed. Each strip is a fast-dissolving supplement designed for daily use as part of your wellness routine.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-fast" className="bg-card rounded-xl border border-border/50 px-6 shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    How fast do NEUVIE strips dissolve?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Each NEUVIE daily supplement strip dissolves on your tongue in approximately 30 seconds. Because the ingredients 
                    absorb through the oral tissue rather than traveling through your digestive system, many customers notice effects 
                    within 15 to 30 minutes — especially with our fast-dissolving Energy Strips.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="safe-daily" className="bg-card rounded-xl border border-border/50 px-6 shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    Are NEUVIE strips safe to use daily?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Yes. Every NEUVIE daily supplement strip is made with non-GMO, clinically studied ingredients. They are manufactured 
                    in GMP-certified facilities in the USA and independently tested by third-party labs for purity, potency, and safety. 
                    NEUVIE fast-dissolving supplements are designed for safe, everyday use as part of your daily wellness ritual.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bundles" className="bg-card rounded-xl border border-border/50 px-6 shadow-soft">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    Can I save with bundles?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    Absolutely. Explore our <Link to="/bundles" className="text-primary hover:underline">curated wellness bundles</Link> to 
                    save up to 20%, or <Link to="/contact" className="text-primary hover:underline">contact our wellness team</Link> for 
                    personalized supplement recommendations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/faqs" className="text-primary hover:text-accent transition-colors font-medium">
                See all FAQs →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SOCIAL SHARING + TRUST
        ═══════════════════════════════════════════════ */}
        <section className="py-10 bg-card border-t border-border/30">
          <div className="container-wide max-w-4xl">
            <PaymentTrustStrip />
            <div className="flex justify-center pt-6">
              <SocialShareButtons 
                url="https://tryneuvie.com" 
                text="NEUVIE – Fast-dissolving wellness strips for energy, sleep & beauty. 5× faster absorption than pills." 
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}
