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

const SEO = {
  title: 'Wellness Strip Bundles – Your Ritual, Your Way | NEUVIE™',
  description: 'Build a self-care routine that fits your life. Curated NEUVIE™ strip bundles for energy, beauty, sleep & wellness. Free US shipping $50+.',
};

const categoryFilters: { id: BundleCategory; label: string; icon: React.ReactNode; count: number }[] = [
  { id: 'all', label: 'All Bundles', icon: <Sparkles className="h-4 w-4" />, count: bundles.length },
  { id: 'performance', label: 'Performance', icon: <Zap className="h-4 w-4" />, count: bundles.filter(b => b.category === 'performance').length },
  { id: 'wellness', label: 'Wellness', icon: <Leaf className="h-4 w-4" />, count: bundles.filter(b => b.category === 'wellness').length },
  { id: 'beauty', label: 'Beauty', icon: <Heart className="h-4 w-4" />, count: bundles.filter(b => b.category === 'beauty').length },
];

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
                <span className="text-sm font-semibold">Curated Bundles</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
                Build a routine that feels like{' '}
                <span className="text-accent italic">you</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Your body doesn't need one thing — it needs a rhythm. These bundles are designed to support how you actually live. 
                And yes, they save you money too.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Free Shipping $50+
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> 14-Day Guarantee
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

        {/* Bottom CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-warm)' }} />
          <div className="container-wide text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl mb-5">
                Not sure where to start?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                That's okay. Everyone's body is different. Browse our individual strips or reach out — 
                we're happy to help you find what feels right.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
                >
                  Browse All Products
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-secondary text-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-secondary/80 transition-all"
                >
                  Contact Us
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