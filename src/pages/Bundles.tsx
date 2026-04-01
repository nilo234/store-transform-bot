import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Leaf } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BundleCard } from '@/components/shop/BundleCard';
import { bundles, BundleCategory } from '@/data/bundles';
import { cn } from '@/lib/utils';
import { PageMeta } from '@/components/seo';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';

const SEO = {
  title: 'Wellness Strip Bundles – Save Up to 20% | NEUVIE™',
  description: 'Build a self-care routine that fits your life. Curated NEUVIE™ dissolving strip bundles for energy, beauty, sleep & gut health. Save up to 20%. Free US shipping $50+.',
};

const pageUrl = 'https://tryneuvie.com/bundles';

const categoryFilters: { id: BundleCategory; label: string; icon: React.ReactNode; count: number }[] = [
  { id: 'all', label: 'All Bundles', icon: <Sparkles className="h-4 w-4" />, count: bundles.length },
  { id: 'performance', label: 'Performance', icon: <Zap className="h-4 w-4" />, count: bundles.filter(b => b.category === 'performance').length },
  { id: 'wellness', label: 'Wellness', icon: <Leaf className="h-4 w-4" />, count: bundles.filter(b => b.category === 'wellness').length },
  { id: 'beauty', label: 'Beauty', icon: <Heart className="h-4 w-4" />, count: bundles.filter(b => b.category === 'beauty').length },
];

function SocialShareButtons() {
  const shareText = 'Check out these wellness strip bundles from NEUVIE – save up to 20%!';
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground font-medium">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Share on X (Twitter)"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&description=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted/60 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Share on Pinterest"
      >
        <Share2 className="h-4 w-4" />
      </a>
    </div>
  );
}

export default function Bundles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as BundleCategory) || 'all';
  const [activeCategory, setActiveCategory] = useState<BundleCategory>(initialCategory);

  const filteredBundles = useMemo(() => {
    if (activeCategory === 'all') return bundles;
    return bundles.filter(bundle => bundle.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: BundleCategory) => {
    setActiveCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title={SEO.title} description={SEO.description} />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
          
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Curated Wellness Strip Bundles</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Wellness Strip Bundles – Build a routine that feels like{' '}
                <span className="text-accent italic">you</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Your body doesn't need one thing — it needs a rhythm. Our curated wellness strip bundles combine fast-dissolving oral strips 
                designed to support how you actually live. Each bundle saves you up to 20% compared to buying individual strips.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Free Shipping on Orders $50+
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> 14-Day Money-Back Guarantee
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Subscribe & Save More
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="border-b border-border/30 bg-background/95 backdrop-blur-md sticky top-[100px] md:top-[132px] z-40">
          <div className="container-wide px-3 md:px-6">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3 md:py-4 -mx-1 px-1">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleCategoryChange(filter.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                    activeCategory === filter.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {filter.icon}
                  {filter.label}
                  <span className={cn(
                    "ml-1 px-2 py-0.5 rounded-full text-xs",
                    activeCategory === filter.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-background text-muted-foreground"
                  )}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bundle Grid */}
        <section className="py-14 md:py-20 bg-background">
          <div className="container-wide">
            {filteredBundles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBundles.map((bundle, index) => (
                  <BundleCard key={bundle.id} bundle={bundle} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No bundles found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section — Why Bundles */}
        <section className="py-16 md:py-20 bg-card border-t border-border/30">
          <div className="container-wide max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl md:text-3xl mb-4">
                  Why Choose a Wellness Strip Bundle?
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Wellness strips work best when they work together. Our bundles pair complementary formulas so every part of your routine 
                  supports the rest — from the moment you wake up to when your head hits the pillow.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl mb-3">Built Around Real Routines</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Each bundle is designed around actual wellness goals — not random product groupings. 
                    Whether you need a <Link to="/shop" className="text-primary hover:underline">performance stack for deep focus</Link>, 
                    a beauty routine for radiant skin, or a gut-health protocol that actually works, 
                    these bundles make it simple. No guesswork, no overwhelm, just strips that dissolve on your tongue in 30 seconds.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-3">Clinically Studied Ingredients</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every NEUVIE strip inside our bundles contains ingredients backed by peer-reviewed research. 
                    From Lion's Mane for cognitive clarity to Collagen peptides for skin elasticity, we use 
                    <Link to="/science" className="text-primary hover:underline"> clinically studied dosages</Link> — 
                    not token amounts. Third-party tested and manufactured in FDA-registered facilities right here in the USA.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-3">Save Up to 20% with Bundle Pricing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Buying individual strips adds up. Our bundles give you meaningful savings — from 14% off on 2-packs 
                    up to 20% off on seasonal collections like the Spring Reset Bundle. Combine that with 
                    free shipping on orders over $50 and our{' '}
                    <Link to="/returns" className="text-primary hover:underline">14-day money-back guarantee</Link>, 
                    and there's truly no risk in trying.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-3">How Dissolving Strips Compare</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike traditional pills and capsules that can take 30–60 minutes to break down, 
                    oral dissolving strips deliver nutrients through the oral mucosa for up to{' '}
                    <a 
                      href="https://pubmed.ncbi.nlm.nih.gov/23550999/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      5× faster absorption
                    </a>. 
                    That means the wellness strips in your bundle start working almost immediately — 
                    perfect for on-the-go lifestyles. Learn more on our{' '}
                    <Link to="/science" className="text-primary hover:underline">Science page</Link>.
                  </p>
                </div>
              </div>

              <div className="text-center pt-6">
                <h3 className="font-display text-xl mb-3">Not Sure Which Bundle Fits You?</h3>
                <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-4">
                  Everyone's body and goals are different. If you're new to wellness strips or aren't sure which 
                  combination is right for your routine, browse our{' '}
                  <Link to="/shop" className="text-primary hover:underline">full collection of individual strips</Link>{' '}
                  or <Link to="/contact" className="text-primary hover:underline">reach out to our team</Link> — we're happy 
                  to help you build a personalized bundle.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Sharing + Bottom CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-warm)' }} />
          <div className="container-wide text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl mb-5">
                Share the Wellness
              </h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
                Know someone who could use a better routine? Share our bundles with friends and family 
                — great wellness is even better when it's shared.
              </p>

              <div className="flex justify-center mb-8">
                <SocialShareButtons />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
                >
                  Browse All Strips
                </Link>
                <Link 
                  to="/faqs" 
                  className="inline-flex items-center gap-2 bg-secondary text-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary/80 transition-all"
                >
                  Read Our FAQs
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}