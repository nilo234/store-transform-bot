import { useEffect, useState } from 'react';
import productsLineup from '@/assets/neuvie-products-lineup.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, ChevronRight, Leaf, ShieldCheck, FlaskConical, Flag } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/ProductCard';
import { BundleCard } from '@/components/shop/BundleCard';
import { bundles } from '@/data/bundles';
import { PageMeta } from '@/components/seo';
import { HomepageFAQs } from '@/components/home/HomepageFAQs';
import { HowToUse } from '@/components/home/HowToUse';
import { WhyNeuvieHero } from '@/components/home/WhyNeuvieHero';
import { WhyNeuvie } from '@/components/home/WhyNeuvie';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';
import { HeroTrustBar } from '@/components/home/HeroTrustBar';
import { OutcomeBenefits } from '@/components/home/OutcomeBenefits';
import { StickyMobileCTA } from '@/components/home/StickyMobileCTA';
import { PaymentTrustStrip } from '@/components/home/PaymentTrustStrip';

// ─── DATA ──────────────────────────────────────────────
const trustBar = [
  { icon: Leaf, label: 'Non-GMO' },
  { icon: ShieldCheck, label: 'Third-Party Tested' },
  { icon: FlaskConical, label: 'Clinically Dosed' },
  { icon: Flag, label: 'Made in USA' },
];

const reviews = [
  { id: '1', name: 'Sarah M.', text: "I replaced my morning coffee with the Energy Strip. No crash, no jitters — just clean focus that lasts until lunch. I didn't expect to feel this different.", rating: 5, product: 'Energy Strips', timeAgo: '2 weeks ago' },
  { id: '2', name: 'James R.', text: "The Focus Strip is part of my morning now. Meetings feel sharper, I'm not reaching for another espresso by 2pm. Genuinely surprised how well it works.", rating: 5, product: 'Mushroom Focus', timeAgo: '1 month ago' },
  { id: '3', name: 'Emily K.', text: "My nails were always brittle and breaking. After 6 weeks on Hair, Skin & Nails strips, they're noticeably stronger. My hairdresser even commented on my hair.", rating: 5, product: 'Hair, Skin & Nails', timeAgo: '3 weeks ago' },
  { id: '4', name: 'Michael T.', text: "I've tried melatonin gummies, teas, everything. The Sleep Strip is the first thing that actually helps me fall asleep in under 20 minutes. Game-changer.", rating: 5, product: 'Sleep Strips', timeAgo: '1 week ago' },
  { id: '5', name: 'Lisa P.', text: "I love that I don't have to think about it. One strip on my tongue, done. No water, no pills. It's the easiest healthy habit I've ever built.", rating: 5, product: 'Cognitive Relax', timeAgo: '2 weeks ago' },
];

const featuredBundles = bundles.filter(b =>
  ['daily-wellness', 'beauty-glow', 'sleep-recover', 'best-value-mega'].includes(b.id)
);

// ─── COMPONENT ─────────────────────────────────────────
export default function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
            1. HERO — Benefit-Driven + Urgency
        ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />

          <div className="container-wide relative z-10 py-20 md:py-28 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                {/* Urgency badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6"
                >
                  <span className="text-sm font-semibold">⚡ Save 20% — Subscribe & Auto-Refill Today</span>
                </motion.div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-7xl leading-[1.08] mb-6">
                  Stop Swallowing Pills You Keep Forgetting.{' '}
                  <span className="block italic text-accent mt-2">Start a 30-second ritual that actually works.</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  NEUVIE wellness strips dissolve on your tongue in seconds — delivering clinically dosed vitamins with up to{' '}
                  <a href="https://pubmed.ncbi.nlm.nih.gov/23550999/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                    5× faster absorption
                  </a>{' '}
                  than traditional capsules. No water. No routine to maintain. Just results you can feel.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5">
                  <Link to="/shop">
                    <Button className="w-full sm:w-auto h-14 px-10 text-base font-semibold rounded-xl group bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-elevated transition-all">
                      Get Yours Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/science">
                    <Button variant="outline" className="w-full sm:w-auto h-14 px-10 text-base font-semibold rounded-xl border-2 border-primary/20 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all">
                      See the Science
                    </Button>
                  </Link>
                </div>

                {/* Social proof line */}
                <p className="text-sm text-muted-foreground mb-6 text-center lg:text-left">
                  ✨ Join <strong className="text-foreground">10,000+</strong> customers who made wellness effortless.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-primary" />
                    14-day money-back guarantee
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-primary" />
                    Free shipping on orders $50+
                  </span>
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <div className="relative mx-auto max-w-[380px] sm:max-w-[500px] lg:max-w-[580px]">
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
            <div className="mt-16 md:mt-20 pt-8 border-t border-border/40">
              <HeroTrustBar />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            2. WHY NEUVIE — Bold Differentiation
        ═══════════════════════════════════════════════ */}
        <WhyNeuvieHero />

        {/* ═══════════════════════════════════════════════
            2b. OUTCOME BENEFITS — What Changes
        ═══════════════════════════════════════════════ */}
        <OutcomeBenefits />

        {/* ═══════════════════════════════════════════════
            3. HOW TO USE — The Ritual
        ═══════════════════════════════════════════════ */}
        <HowToUse />

        {/* ═══════════════════════════════════════════════
            4. BESTSELLERS
        ═══════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-secondary/40">
          <div className="container-wide">
            <motion.div className="text-center mb-12 md:mb-16" {...fadeUp}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
                The ones people keep coming back to.
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Not because they have to — because it became the part of their day they actually look forward to.
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

            <motion.div className="text-center mt-12" {...fadeUp}>
              <Link to="/shop">
                <Button variant="outline" className="h-13 px-8 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl">
                  Browse All 13 Wellness Strips →
                </Button>
              </Link>
            </motion.div>

            {/* Payment & Security Badges */}
            <PaymentTrustStrip />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            5. WHY NEUVIE — Deep Dive (Quality + Science)
        ═══════════════════════════════════════════════ */}
        <WhyNeuvie />

        {/* ═══════════════════════════════════════════════
            6. SOCIAL PROOF — Reviews
        ═══════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-background overflow-hidden">
          <div className="container-wide">
            <motion.div className="text-center mb-12 md:mb-16" {...fadeUp}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
                From people who decided they're worth it.
              </h2>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">4.9 out of 5 — from 2,400+ verified reviews</span>
              </div>
            </motion.div>
          </div>

          {/* Scrolling Review Cards */}
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto pb-4 px-4 md:px-12 scrollbar-hide snap-x snap-mandatory">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  className="flex-shrink-0 w-[320px] md:w-[400px] snap-start"
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="bg-card rounded-2xl p-7 h-full border border-border/30 shadow-soft hover:shadow-card transition-all duration-500">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground leading-relaxed mb-4">"{review.text}"</p>
                    <p className="text-xs text-muted-foreground mb-4">{review.timeAgo}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
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
        </section>

        {/* ═══════════════════════════════════════════════
            7. BUNDLES — Value / Upsell
        ═══════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-secondary/40">
          <div className="container-wide">
            <motion.div className="text-center mb-12 md:mb-16" {...fadeUp}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
                Your routine, your way.
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                Combine the strips that match your life. Save more when you bundle.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredBundles.map((bundle, index) => (
                <BundleCard key={bundle.id} bundle={bundle} index={index} />
              ))}
            </div>

            <motion.div className="mt-12 text-center" {...fadeUp}>
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
            8. FAQs
        ═══════════════════════════════════════════════ */}
        <HomepageFAQs />

        {/* ═══════════════════════════════════════════════
            9. SEO CONTENT + SOCIAL SHARING
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-card border-t border-border/30">
          <div className="container-wide max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl md:text-3xl text-center mb-6">
                What Are Fast-Dissolving Wellness Strips?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
                <div>
                  <p className="mb-4">
                    NEUVIE wellness strips are thin, fast-dissolving oral strips that deliver vitamins, minerals, and 
                    botanical extracts directly through the oral mucosa. Unlike traditional pills and capsules that must 
                    pass through your digestive system, dissolving strips provide a more efficient delivery method — with 
                    up to 5× faster absorption according to{' '}
                    <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6390339/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      published research on oral thin films
                    </a>.
                  </p>
                  <p>
                    Each strip dissolves on your tongue in about 30 seconds — no water needed. Our collection includes 
                    13 unique formulas covering <Link to="/shop" className="text-primary hover:underline">energy and focus</Link>, 
                    sleep and relaxation, beauty and collagen, gut health and digestion, and essential daily vitamins. 
                    Every formula is clinically dosed with ingredients backed by{' '}
                    <Link to="/science" className="text-primary hover:underline">peer-reviewed scientific research</Link>.
                  </p>
                </div>
                <div>
                  <p className="mb-4">
                    NEUVIE strips are manufactured in{' '}
                    <a href="https://www.fda.gov/food/registration-food-facilities-and-other-submissions/registration-food-facilities" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      FDA-registered facilities
                    </a>{' '}
                    in the United States and independently verified by third-party labs for purity, potency, and safety. 
                    Every ingredient is non-GMO, and most formulas are vegan and gluten-free.
                  </p>
                  <p>
                    Whether you're looking for a morning energy boost without the coffee jitters, a calming bedtime ritual, 
                    or daily beauty support from the inside out — our dissolving wellness strips make self-care fit into 
                    your real life. Explore our <Link to="/bundles" className="text-primary hover:underline">curated bundles</Link> to 
                    save up to 20%, or <Link to="/contact" className="text-primary hover:underline">contact our team</Link> for 
                    personalized recommendations.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <SocialShareButtons 
                  url="https://tryneuvie.com" 
                  text="NEUVIE – Fast-dissolving wellness strips for energy, sleep & beauty. 5× faster absorption than pills." 
                />
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}
