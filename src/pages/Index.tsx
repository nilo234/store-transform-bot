import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  Leaf,
  FlaskConical,
  BadgeCheck,
  Sparkles,
  Zap,
  Brain,
  Heart,
  Moon,
  Droplets,
  Sun,
  CircleCheck,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/shop/ProductCard';
import { PageMeta } from '@/components/seo';
import { StickyMobileCTA } from '@/components/home/StickyMobileCTA';
import productsLineup from '@/assets/neuvie-products-lineup.webp';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

// Strip benefits grid (Conv Element 6)
const stripBenefits = [
  { icon: Sparkles, name: 'Collagen Peptides', desc: 'Skin elasticity and hydration from within.' },
  { icon: Zap, name: 'L-Theanine + Caffeine', desc: 'Clean focus. No crash. No compromise.' },
  { icon: Leaf, name: 'Biotin 5,000mcg', desc: 'Hair, skin and nail strength in every strip.' },
  { icon: Droplets, name: 'Probiotics', desc: 'Gut balance and microbiome support, daily.' },
  { icon: Brain, name: 'Ashwagandha', desc: 'Stress resilience and cortisol control.' },
  { icon: ShieldCheck, name: 'Vitamin C + Zinc', desc: 'Daily immune defense, simplified.' },
];

// Inside the Strips (Conv Element 9)
const insideStrips = [
  { icon: Sparkles, name: 'Collagen', word: 'Skin' },
  { icon: Zap, name: 'Caffeine', word: 'Energy' },
  { icon: Droplets, name: 'Probiotics', word: 'Gut Health' },
  { icon: Moon, name: 'Melatonin', word: 'Sleep' },
  { icon: Leaf, name: 'Biotin', word: 'Hair & Nails' },
  { icon: Heart, name: 'Ashwagandha', word: 'Calm' },
];

// Social Proof Block 1 — short cards (Conv Element 8)
const shortTestimonials = [
  {
    text: 'At 52 I wasn\u2019t sure how these would work for me. I\u2019m honestly shocked. My skin looks different, I have more energy and I actually look forward to my morning routine now.',
    product: 'Beauty + Collagen Strip',
  },
  {
    text: 'Worth it. These strips have made a real difference to my energy and mood. I take the Energy Strip every morning before work. Simple, fast, effective.',
    product: 'Energy Strip',
  },
  {
    text: 'Great for travel. I\u2019m a flight attendant and I\u2019m constantly on the go. Having NEUVIE strips in my bag changed my entire routine. No bottles, no capsules \u2014 just peel and go.',
    product: 'Full Day Wellness Bundle',
  },
];

// Social Proof Block 2 — story cards (Conv Element 10)
const storyTestimonials = [
  {
    title: 'First Thing I Do Every Morning',
    text: 'I place a strip on my tongue before I even get out of bed. By the time I\u2019m in the shower the energy kicks in \u2014 clean, smooth, no jitters. I won\u2019t go back to capsules.',
    product: 'Energy Strip',
  },
  {
    title: 'My Skin Actually Changed',
    text: 'After 3 weeks of the Beauty Strip I noticed my skin looked more hydrated and even. I\u2019ve spent hundreds on serums. This is the first supplement that made a visible difference.',
    product: 'Beauty + Collagen Strip',
  },
  {
    title: 'Nature at Its Finest',
    text: 'This product helped me with my gut issues in ways that nothing else did. My digestion improved within the first week. Clean ingredients, no weird taste, just works.',
    product: 'Gut Health & Probiotic Strip',
  },
];

const trustBarItems = [
  { icon: ShieldCheck, label: '30-Day Money-Back Guarantee' },
  { icon: BadgeCheck, label: 'FDA-Registered Facility' },
  { icon: Leaf, label: 'Vegan & Sugar-Free' },
  { icon: FlaskConical, label: 'Non-GMO Ingredients' },
  { icon: Truck, label: 'Free Shipping over $50' },
];

const promiseItems = [
  { icon: Sparkles, label: 'Feels (and tastes) like a wellness ritual.' },
  { icon: Leaf, label: 'Crafted carefully with premium ingredients.' },
  { icon: FlaskConical, label: 'Rigorously lab tested.' },
];

export default function Index() {
  const [bestSellers, setBestSellers] = useState<ShopifyProduct[]>([]);
  const [newReleases, setNewReleases] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const all = await fetchProducts(20);
      // Best sellers — front of catalog
      setBestSellers(all.slice(0, 4));
      // New releases — back of catalog (assumed newer)
      setNewReleases(all.slice(-4));
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <PageMeta
        title="NEUVIE\u2122 \u2014 30-Second Wellness Strips for Your Daily Routine"
        description="Fast-dissolving wellness strips. No water, no capsules. Energy, beauty, sleep and gut health \u2014 in 30 seconds. 30-day money-back guarantee. Free US shipping $50+."
      />

      <Navbar />

      <main className="flex-1">
        {/* ───────── 3. HERO ───────── */}
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
          <div className="container-wide py-16 md:py-24 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-accent mb-5">
                  Premium Wellness, Reinvented
                </span>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
                  Your Wellness Routine.
                  <br />
                  <span className="italic text-accent">In 30 Seconds.</span>
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Fast-dissolving strips for real life. No capsules. No water. Just results.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link to="/shop" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto h-14 px-10 text-base font-semibold rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 group">
                      Shop All Strips
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                    </Button>
                  </Link>
                  <Link to="/quiz" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto h-14 px-10 text-base font-semibold rounded-xl border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      Take the Quiz
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start mt-6 text-sm text-primary-foreground/70">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" strokeWidth={1.5} />
                    ))}
                  </div>
                  <span>Loved by our NEUVIE community</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-1 lg:order-2"
              >
                <div className="relative mx-auto max-w-[480px]">
                  <div className="absolute inset-0 bg-accent/15 rounded-[2rem] rotate-3 scale-[1.02]" />
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-elevated">
                    <img
                      src={productsLineup}
                      alt="NEUVIE fast-dissolving wellness strips in premium metal tins"
                      className="w-full h-full object-cover"
                      width={1024}
                      height={1024}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── 5. TRUST BAR ───────── */}
        <section className="bg-secondary border-b border-border">
          <div className="container-wide py-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
              {trustBarItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 justify-center md:justify-start text-foreground/80">
                  <item.icon className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" strokeWidth={1.75} />
                  <span className="text-[11px] md:text-xs font-medium leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 4. BEST SELLERS ───────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-12" {...fadeUp}>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent">Best Sellers</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3 mb-3">Best Sellers</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Start your routine with our top strips.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {bestSellers.map((p, i) => (
                  <ProductCard key={p.node.id} product={p} index={i} />
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <Link to="/shop">
                <Button className="h-12 px-8 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Shop All Strips
                  <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── 6. STRIP BENEFITS GRID ───────── */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container-wide">
            <motion.div className="text-center mb-12" {...fadeUp}>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent">Strip Benefits</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3 mb-3">What each strip does for you</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Premium ingredients, precisely dosed. One strip, one ritual.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {stripBenefits.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-background border border-border rounded-2xl p-6 hover:shadow-card transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <b.icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-xl mb-2">{b.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 7. NEW RELEASES ───────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-12" {...fadeUp}>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent">New Releases</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3 mb-3">New Releases</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Check out our newest strips for overall well-being.
              </p>
            </motion.div>

            {!isLoading && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {newReleases.map((p, i) => (
                  <ProductCard key={p.node.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ───────── 8. SOCIAL PROOF 1 — Extraordinary Results ───────── */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container-wide">
            <motion.div className="text-center mb-12" {...fadeUp}>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent">Extraordinary Results</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3">Real people. Real results.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shortTestimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-background border border-border rounded-2xl p-6 md:p-7 shadow-soft"
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" strokeWidth={1.5} />
                    ))}
                  </div>
                  <p className="text-foreground/90 text-[15px] leading-relaxed mb-5 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-primary tracking-wide uppercase border-t border-border pt-4">
                    {t.product}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 9. INSIDE THE STRIPS ───────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide">
            <motion.div className="text-center mb-12" {...fadeUp}>
              <h2 className="font-display text-4xl md:text-5xl mb-3">Inside the Strips</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Premium, clinically studied ingredients in every formula.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 max-w-4xl mx-auto">
              {insideStrips.map((ing, i) => (
                <motion.div
                  key={ing.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-secondary border border-border flex items-center justify-center mb-3">
                    <ing.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-base md:text-lg leading-tight">{ing.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{ing.word}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 10. SOCIAL PROOF 2 — Story Cards ───────── */}
        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container-wide">
            <motion.div className="text-center mb-12" {...fadeUp}>
              <h2 className="font-display text-4xl md:text-5xl mb-3">
                Real stories from our NEUVIE community
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Stories from people who made NEUVIE part of their daily ritual.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storyTestimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-background border border-border rounded-2xl p-7 md:p-8 shadow-soft flex flex-col"
                >
                  <h3 className="font-display text-2xl mb-4 leading-snug">&ldquo;{t.title}&rdquo;</h3>
                  <p className="text-foreground/85 text-[15px] leading-relaxed mb-6 flex-1">
                    {t.text}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={1.5} />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-primary tracking-wide">{t.product}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 11. OUR PROMISE ───────── */}
        <section className="py-16 md:py-20 bg-background border-y border-border">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
              {promiseItems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-5">
                    <p.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-xl md:text-2xl max-w-xs mx-auto leading-snug">
                    {p.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── 12. CUSTOMER COUNTER ───────── */}
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container-wide text-center">
            <motion.div {...fadeUp}>
              <p className="font-display text-7xl md:text-9xl lg:text-[10rem] text-primary leading-none mb-4">
                2,400<span className="text-accent">+</span>
              </p>
              <p className="font-display text-2xl md:text-3xl mb-3">people started their routine</p>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Join a community built around real daily wellness.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ───────── 13. 30-DAY MONEY-BACK GUARANTEE ───────── */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10 md:gap-14 items-center max-w-5xl mx-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto md:mx-0"
              >
                <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full border-2 border-accent/60 flex items-center justify-center text-center p-6">
                  <div className="absolute inset-2 rounded-full border border-accent/30" />
                  <div>
                    <ShieldCheck className="h-8 w-8 text-accent mx-auto mb-2" strokeWidth={1.5} />
                    <p className="font-display text-lg leading-tight">30-Day</p>
                    <p className="font-display text-sm leading-tight">Money-Back</p>
                    <p className="font-display text-sm leading-tight">Guarantee</p>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeUp} className="text-center md:text-left">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent">Our Promise</span>
                <h2 className="font-display text-3xl md:text-5xl mt-3 mb-5 leading-tight">
                  30-Day Money-Back Guarantee
                </h2>
                <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-4">
                  We&rsquo;d be shocked if you didn&rsquo;t feel the difference, and enjoy the benefits of NEUVIE.
                  But in the highly unlikely event that you&rsquo;re not happy in any way — we&rsquo;ll give you
                  every cent back. No hassle. No hoops to jump through.
                </p>
                <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed">
                  You&rsquo;re protected by our 30-Day Money-Back Guarantee. Email us at{' '}
                  <a href="mailto:hello@tryneuvie.com" className="text-accent underline-offset-4 hover:underline">
                    hello@tryneuvie.com
                  </a>{' '}
                  and we&rsquo;ll return every dollar you paid.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── 14. FINAL CTA ───────── */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container-wide text-center">
            <motion.div {...fadeUp} className="max-w-2xl mx-auto">
              <Sun className="h-10 w-10 text-accent mx-auto mb-6" strokeWidth={1.5} />
              <h2 className="font-display text-4xl md:text-6xl mb-5 leading-tight">
                Start Your Routine Today
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-8">
                Use code <span className="font-semibold text-foreground">WELCOME15</span> for 15% off your first order.
              </p>
              <Link to="/shop">
                <Button className="h-14 px-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Shop All Strips
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </Button>
              </Link>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  Free shipping over $50
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  30-day money-back
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  Cancel anytime
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
