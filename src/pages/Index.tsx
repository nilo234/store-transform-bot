import { useEffect, useState } from 'react';
import productsLineup from '@/assets/neuvie-products-lineup.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Play, Check, ChevronRight, Leaf, ShieldCheck, FlaskConical, Flag } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/ProductCard';
import { BundleCard } from '@/components/shop/BundleCard';
import { bundles } from '@/data/bundles';
import { PageMeta } from '@/components/seo';
import { BenefitsTabs } from '@/components/home/BenefitsTabs';
import { WhyNeuvie } from '@/components/home/WhyNeuvie';
import { HomepageFAQs } from '@/components/home/HomepageFAQs';

// ─── DATA ──────────────────────────────────────────────
const trustBar = [
  { icon: Leaf, label: 'Non-GMO' },
  { icon: ShieldCheck, label: 'Third-Party Tested' },
  { icon: FlaskConical, label: 'Clinically Dosed' },
  { icon: Flag, label: 'Made in USA' },
];

const categories = [
  { title: 'Performance & Energy', emoji: '⚡', description: 'For the mornings you choose to show up — fully.', href: '/shop?category=performance', color: 'from-primary/10 to-primary/5' },
  { title: 'Beauty & Skin', emoji: '✨', description: 'Because how you feel inside deserves to show.', href: '/shop?category=beauty', color: 'from-accent/10 to-accent/5' },
  { title: 'Sleep & Relax', emoji: '🌙', description: 'You carried the whole day. Let tonight carry you.', href: '/shop?category=sleep', color: 'from-muted to-muted/50' },
  { title: 'Immunity & Health', emoji: '🛡️', description: 'The quiet act of protecting what matters most — you.', href: '/shop?category=immunity', color: 'from-primary/5 to-muted/30' },
];

const howItWorks = [
  { step: '01', icon: '📦', title: 'Open the pack', description: 'A small moment, just for you.' },
  { step: '02', icon: '👅', title: 'Place it on your tongue', description: 'No water. No effort. Just intention.' },
  { step: '03', icon: '⏱️', title: '30 seconds', description: 'It dissolves. You chose yourself today.' },
  { step: '04', icon: '✨', title: 'Go live your day', description: 'You already did the most important thing.' },
];

const ingredients = [
  { emoji: '🍄', name: "Lion's Mane", benefit: 'For the clarity you deserve*' },
  { emoji: '🌙', name: 'Melatonin', benefit: 'For the rest you've earned*' },
  { emoji: '✨', name: 'Collagen', benefit: 'For the glow that starts within*' },
  { emoji: '🌿', name: 'Ashwagandha', benefit: 'For the calm you owe yourself*' },
  { emoji: '🍄', name: 'Cordyceps', benefit: 'For the energy that feels like you*' },
  { emoji: '💊', name: 'Vitamin B12', benefit: 'For the foundation everything else needs*' },
];

const reviews = [
  { id: '1', name: 'Sarah M.', text: "I started taking the Energy Strips because I wanted to stop relying on coffee. What I didn't expect was how much better I'd feel about actually doing something for myself every morning.", rating: 5, product: 'Energy Strips' },
  { id: '2', name: 'James R.', text: "It's not even about the focus anymore. It's the fact that I take 30 seconds every day and it's mine. The Mushroom Focus just happens to make everything after that a little sharper.", rating: 5, product: 'Mushroom Focus' },
  { id: '3', name: 'Emily K.', text: "I've always put everyone else first. The Hair, Skin & Nails Strips became the first thing I do just for me. My nails are stronger, my skin is clearer — but honestly, it's the feeling that changed.", rating: 5, product: 'Hair, Skin & Nails' },
  { id: '4', name: 'Michael T.', text: "I used to feel guilty for taking time for myself. Now I take a Sleep Strip, and it's like telling my body: you did enough today. Rest now. That shift changed everything.", rating: 5, product: 'Sleep Strips' },
  { id: '5', name: 'Lisa P.', text: "I didn't buy these because someone told me to. I bought them because I looked in the mirror and thought — I'm worth taking care of. Three months later, I still feel that way.", rating: 5, product: 'Cognitive Relax' },
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
        title="You Deserve to Feel This Good – Wellness Strips | NEUVIE™"
        description="30 seconds. No pills. No excuses. 13 dissolving wellness strips made for people who believe they're worth taking care of. Free US shipping $50+."
      />
      
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
                <h1 className="font-body text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-semibold leading-[1.1] mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Your body does so much for you.{' '}
                  <span className="block">This is how you give back.</span>
                  <span className="block text-accent">30 seconds. Every day.</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  You don't need another reminder to take care of yourself.
                  <br className="hidden md:block" />
                  You need something that makes it effortless — so you actually do.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                  <Link to="/shop">
                    <Button className="w-full sm:w-auto h-13 px-8 text-base font-semibold rounded-lg group bg-primary hover:bg-primary/90 text-primary-foreground">
                      Start Your Ritual
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/shop">
                    <Button variant="outline" className="w-full sm:w-auto h-13 px-8 text-base font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Explore What Fits You
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground">
                  ✓ 14-day guarantee — because you should feel sure · ✓ Free shipping on $50+
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
              <p className="text-center text-xs text-muted-foreground mt-4">
                Because you deserve to know exactly what you're putting in your body.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            2. CATEGORY SECTION — Shop by Benefit
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-body text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
                What does your body need today?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                You already know the answer. We just made it easier to follow through.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat, i) => (
                <motion.div key={cat.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <Link to={cat.href} className="block group">
                    <div className={`relative rounded-2xl bg-gradient-to-br ${cat.color} border border-border/40 p-6 md:p-8 text-center transition-all duration-300 hover:shadow-card hover:-translate-y-1`}>
                      <span className="text-3xl md:text-4xl block mb-3">{cat.emoji}</span>
                      <h3 className="font-body font-semibold text-sm md:text-base mb-1" style={{ letterSpacing: '-0.02em' }}>{cat.title}</h3>
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
              <h2 className="font-body text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
                The ones people keep coming back to.
              </h2>
              <p className="text-muted-foreground">
                Not because they have to. Because it became the part of their day they actually look forward to.
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
                  Find what's right for you →
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
              <h2 className="font-body text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
                Taking care of yourself was never supposed to be hard.
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                30 seconds. That's all it takes to tell your body: I've got you.
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
                  <h3 className="font-body font-semibold text-sm md:text-base mb-1" style={{ letterSpacing: '-0.02em' }}>{item.title}</h3>
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
                  <span className="text-sm font-medium text-muted-foreground">See it in action →</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            5. BENEFITS TABS
        ═══════════════════════════════════════════════ */}
        <BenefitsTabs />

        {/* ═══════════════════════════════════════════════
            6. SCIENCE & INGREDIENTS
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-body text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
                You deserve to know what goes into your body.
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Every ingredient is here because it works — not because it sounds impressive. Your trust matters more than our marketing.
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
                  See the science behind it →
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
            7. WHY NEUVIE
        ═══════════════════════════════════════════════ */}
        <WhyNeuvie />

        {/* ═══════════════════════════════════════════════
            8. SOCIAL PROOF — Reviews
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-muted/15 overflow-hidden">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-body text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
                From people who decided they're worth it.
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">4.9 out of 5 — from 2,400+ people who chose themselves.</span>
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
            9. BUNDLES & VALUE
        ═══════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-10 md:mb-14" {...fadeUp}>
              <h2 className="font-body text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
                Your routine, your way.
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Combine the strips that match your life. Taking care of yourself shouldn't cost more than it needs to.
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
            10. FAQs
        ═══════════════════════════════════════════════ */}
        <HomepageFAQs />

      </main>

      <Footer />
    </div>
  );
}
