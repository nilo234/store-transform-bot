import { useEffect, useState } from 'react';
import productsLineup from '@/assets/neuvie-products-lineup.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Play, Check, ChevronRight, Leaf, ShieldCheck, FlaskConical, Flag } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/ProductCard';
import { BundleCard } from '@/components/shop/BundleCard';
import { bundles } from '@/data/bundles';
import { PageMeta } from '@/components/seo';

// ─── DATA ──────────────────────────────────────────────
const trustBar = [
  { icon: Leaf, label: 'Non-GMO' },
  { icon: ShieldCheck, label: 'Third-Party Tested' },
  { icon: FlaskConical, label: 'Clinically Dosed' },
  { icon: Flag, label: 'Made in USA' },
];

const categories = [
  { title: 'Performance & Energy', emoji: '⚡', description: 'Focus, drive & endurance', href: '/shop?category=performance', color: 'from-primary/10 to-primary/5' },
  { title: 'Beauty & Skin', emoji: '✨', description: 'Collagen, glow & radiance', href: '/shop?category=beauty', color: 'from-accent/10 to-accent/5' },
  { title: 'Sleep & Relax', emoji: '🌙', description: 'Deep rest & calm', href: '/shop?category=sleep', color: 'from-muted to-muted/50' },
  { title: 'Immunity & Health', emoji: '🛡️', description: 'Daily defense & vitality', href: '/shop?category=immunity', color: 'from-primary/5 to-muted/30' },
];

const howItWorks = [
  { step: '01', icon: '📦', title: 'Remove Strip', description: 'Tear open the pouch and remove one strip' },
  { step: '02', icon: '👅', title: 'Place on Tongue', description: 'Place the strip on or under your tongue' },
  { step: '03', icon: '⏱️', title: 'Wait 30 Seconds', description: 'Let it dissolve completely — no water needed' },
  { step: '04', icon: '✨', title: 'Feel the Difference', description: 'Ingredients begin absorbing into your system' },
];

const ingredients = [
  { emoji: '🍄', name: "Lion's Mane", benefit: 'Focus & Clarity*' },
  { emoji: '🌙', name: 'Melatonin', benefit: 'Restful Sleep*' },
  { emoji: '✨', name: 'Collagen', benefit: 'Skin & Hair*' },
  { emoji: '🌿', name: 'Ashwagandha', benefit: 'Calm & Balance*' },
  { emoji: '🍄', name: 'Cordyceps', benefit: 'Natural Energy*' },
  { emoji: '💊', name: 'Vitamin B12', benefit: 'Daily Vitality*' },
];

const reviews = [
  { id: '1', name: 'Sarah M.', text: "The Energy Strips fit perfectly into my morning routine. Clean energy without the jitters — I love how simple they are.", rating: 5, product: 'Energy Strips' },
  { id: '2', name: 'James R.', text: "I've been using the Mushroom Focus Strips for a month. They've become part of my daily work routine and the chocolate flavor is great.", rating: 5, product: 'Mushroom Focus' },
  { id: '3', name: 'Emily K.', text: "The Hair, Skin & Nails Strips are so convenient. No more swallowing pills — I just place one on my tongue and go about my day.", rating: 5, product: 'Hair, Skin & Nails' },
  { id: '4', name: 'Michael T.', text: "Love the Sleep Strips. They've become part of my bedtime routine — easy to take and the lavender-mint flavor is a nice touch.", rating: 5, product: 'Sleep Strips' },
  { id: '5', name: 'Lisa P.', text: "At 45, I appreciate how easy the Cognitive Relax Strips are after a long day. The strawberry-mint flavor is really pleasant.", rating: 5, product: 'Cognitive Relax' },
];

// Bundles to feature on homepage
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
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Premium Dissolving Wellness Strips | NEUVIE™"
        description="Fast-dissolving wellness strips with clinically studied ingredients. 5x faster absorption than pills. Free US shipping on $50+. 60-day money-back guarantee."
      />
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">

        {/* ═══════════════════════════════════════════════
            1. HERO SECTION
        ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-muted/30" />

          <div className="container-wide relative z-10 py-16 md:py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                  Premium Wellness.{' '}
                  <span className="block">Fast-Dissolving.</span>
                  <span className="block text-accent">Science-Backed.</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  The future of supplements — in 30 seconds. No water, no pills.
                  Just place on your tongue and dissolve.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                  <Link to="/shop">
                    <Button className="w-full sm:w-auto h-13 px-8 text-base font-semibold rounded-lg group bg-primary hover:bg-primary/90 text-primary-foreground">
                      Shop All Strips
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/shop?quiz=true">
                    <Button variant="outline" className="w-full sm:w-auto h-13 px-8 text-base font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Find Your Strip
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground">
                  ✓ 60-Day Money-Back Guarantee · ✓ Free Shipping on $50+
                </p>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              >
                <div className="relative mx-auto max-w-[360px] sm:max-w-[480px] lg:max-w-[584px]">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-muted/20">
                    <img
                      src={productsLineup}
                      alt="Neuvie wellness strips lineup — Beauty, Sleep, Energy, Hair Skin & Nails, Libido Support"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trust Bar */}
            <motion.div
              className="mt-12 md:mt-16 pt-8 border-t border-border/50"
              {...fadeUp}
              transition={{ delay: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
                {trustBar.map((item) => (
                  <div key={item.label} className="flex items-center justify-center gap-2.5 text-sm text-muted-foreground">
                    <item.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            2. CATEGORY SECTION — Shop by Benefit
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Find Your Daily Support
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Targeted wellness strips designed around your goals.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat, i) => (
                <motion.div key={cat.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <Link to={cat.href} className="block group">
                    <div className={`relative rounded-2xl bg-gradient-to-br ${cat.color} border border-border/40 p-6 md:p-8 text-center transition-all duration-300 hover:shadow-card hover:-translate-y-1`}>
                      <span className="text-3xl md:text-4xl block mb-3">{cat.emoji}</span>
                      <h3 className="font-display font-semibold text-sm md:text-base mb-1">{cat.title}</h3>
                      <p className="text-xs text-muted-foreground">{cat.description}</p>
                      <ChevronRight className="h-4 w-4 mx-auto mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            3. BESTSELLERS
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-muted/15">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Customer Favorites
              </h2>
              <p className="text-muted-foreground">
                Our most popular wellness strips, trusted by thousands.
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
                <Button variant="outline" className="h-12 px-8 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg">
                  View All 13 Products
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            4. HOW IT WORKS
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-12 md:mb-16" {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Just 30 Seconds to Wellness
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Simple. Fast. Designed for your daily routine.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl mx-auto">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  className="text-center"
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">{item.icon}</span>
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Video Placeholder */}
            <motion.div className="mt-14 md:mt-20 max-w-3xl mx-auto" {...fadeUp} transition={{ delay: 0.4 }}>
              <div className="relative aspect-video rounded-2xl bg-muted/30 border border-border/50 overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 md:h-8 md:w-8 ml-1" fill="currentColor" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Watch how it works</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            5. BUNDLES & VALUE — No Countdowns!
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-muted/15">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Curated Routines. Better Value.
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Stack your wellness with our expert-curated bundles and enjoy more savings.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredBundles.map((bundle, index) => (
                <BundleCard key={bundle.id} bundle={bundle} index={index} />
              ))}
            </div>

            <motion.div className="mt-10 text-center" {...fadeUp}>
              <Link to="/bundles">
                <Button variant="outline" className="h-12 px-8 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg">
                  View All Bundles
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            6. SCIENCE & INGREDIENTS
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Premium Sourcing. Purposeful Ingredients.
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Every strip is formulated with clinically studied ingredients, selected for quality and transparency.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 max-w-4xl mx-auto">
              {ingredients.map((ing, i) => (
                <motion.div key={ing.name} className="text-center" {...fadeUp} transition={{ delay: i * 0.06 }}>
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-2xl bg-card border border-border/40 flex items-center justify-center shadow-soft hover:shadow-card transition-shadow">
                    <span className="text-2xl md:text-3xl">{ing.emoji}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{ing.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">{ing.benefit}</p>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center mt-10" {...fadeUp}>
              <Link to="/science">
                <Button variant="outline" className="h-12 px-8 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg">
                  Learn About Our Science
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <p className="text-center text-[10px] text-muted-foreground mt-6">
              *These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            7. SOCIAL PROOF — Reviews
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-muted/15 overflow-hidden">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Join 50,000+ Happy Customers
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">Rated 4.9/5 from 2,400+ reviews</span>
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
                  <div className="bg-card rounded-2xl p-6 h-full border border-border/40 shadow-soft hover:shadow-card transition-shadow">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed mb-5">"{review.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{review.name.charAt(0)}</span>
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
            <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-muted/15 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-muted/15 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            8. PRE-FOOTER — Email Capture
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <motion.h2
              className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
              {...fadeUp}
            >
              Join the Neuvie Community
            </motion.h2>
            <motion.p
              className="text-primary-foreground/70 mb-8 max-w-md mx-auto text-sm md:text-base"
              {...fadeUp}
              transition={{ delay: 0.1 }}
            >
              Get 15% off your first order plus exclusive access to new products and wellness insights.
            </motion.p>
            <motion.form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              {...fadeUp}
              transition={{ delay: 0.15 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button type="submit" className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg">
                Join Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>
            <motion.p className="mt-4 text-[11px] text-primary-foreground/50" {...fadeUp} transition={{ delay: 0.2 }}>
              No spam. Unsubscribe anytime. We respect your privacy.
            </motion.p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
