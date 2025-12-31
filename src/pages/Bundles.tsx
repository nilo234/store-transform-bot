import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Leaf } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BundleCard } from '@/components/shop/BundleCard';
import { bundles, BundleCategory } from '@/data/bundles';
import { cn } from '@/lib/utils';

// SEO meta tags
const SEO = {
  title: 'Neuvie Bundles - Save Up to 29% on Wellness Strip Bundles',
  description: 'Shop Neuvie bundle deals and save up to 29%. Curated wellness strip bundles for focus, energy, beauty, sleep & gut health. Free shipping on orders $50+.',
  keywords: 'neuvie bundles, nutrition strips bundle, wellness bundles, supplement bundles, vitamin strip packs',
};

// Category filter options
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

  // Update document title for SEO
  useEffect(() => {
    document.title = SEO.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', SEO.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = SEO.description;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', SEO.keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = SEO.keywords;
      document.head.appendChild(meta);
    }
  }, []);

  // Filter bundles by category
  const filteredBundles = useMemo(() => {
    if (activeCategory === 'all') return bundles;
    return bundles.filter(bundle => bundle.category === activeCategory);
  }, [activeCategory]);

  // Handle category change
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
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
          
          <div className="container-wide relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-bold uppercase tracking-wide">
                  Limited Time Bundles
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                🎯 BUNDLES - SAVE UP TO{' '}
                <span className="text-accent">29%</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stack your wellness routine with our curated bundles. More strips, more savings. 
                Build healthy habits while keeping more money in your pocket.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Free Shipping $50+
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-primary">✓</span> 60-Day Guarantee
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Subscribe & Save More
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b border-border/50 bg-background sticky top-[132px] z-40">
          <div className="container-wide">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categoryFilters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => handleCategoryChange(filter.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                    activeCategory === filter.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/50 text-foreground hover:bg-muted"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Bundle Grid */}
        <section className="py-12 md:py-16 bg-background">
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
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Not sure which bundle to choose?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Take our quick wellness quiz to find the perfect bundle for your goals, 
                or contact our team for personalized recommendations.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a 
                  href="/shop" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Browse All Products
                </a>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-muted text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
