import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { sanitizeTitle } from '@/lib/shopify';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { PageMeta, CollectionPageJsonLd } from '@/components/seo';
import { ChevronDown, SlidersHorizontal, X, Scale, FlaskConical, Leaf, Flag, Truck, RotateCcw } from 'lucide-react';
import { goalFilters, tagFilters, sortOptions, getProductGoal, getProductTags } from '@/data/shopFilters';
import { bundles as bundleData } from '@/data/bundles';
import { Button } from '@/components/ui/button';
import { CompareModal } from '@/components/shop/CompareModal';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';
import { useRegion } from '@/hooks/useRegion';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const { isUK } = useRegion();
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const activeGoal = searchParams.get('goal') || 'all';
  const activeTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const activeSort = searchParams.get('sort') || 'featured';

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      const data = await fetchProducts(20);
      setProducts(data);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  // Filter out bundle products from the shop grid — bundles belong on /bundles
  const individualProducts = useMemo(() => {
    const bundleVariantIds = new Set(bundleData.map(b => b.shopifyBundleVariantId));
    return products.filter(p => {
      const variantIds = p.node.variants.edges.map(v => v.node.id);
      return !variantIds.some(id => bundleVariantIds.has(id));
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = individualProducts;
    if (activeGoal !== 'all') {
      result = result.filter((p) => getProductGoal(p.node.title) === activeGoal);
    }
    if (activeTags.length > 0) {
      result = result.filter((p) => {
        const tags = getProductTags(p.node.title);
        return activeTags.every((t) => tags.includes(t));
      });
    }
    const sorted = [...result];
    switch (activeSort) {
      case 'name-asc': sorted.sort((a, b) => a.node.title.localeCompare(b.node.title)); break;
      case 'name-desc': sorted.sort((a, b) => b.node.title.localeCompare(a.node.title)); break;
      case 'price-asc': sorted.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount)); break;
      case 'price-desc': sorted.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount)); break;
      default: break;
    }
    return sorted;
  }, [individualProducts, activeGoal, activeTags, activeSort]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'featured') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const toggleTag = (tagId: string) => {
    const current = new Set(activeTags);
    if (current.has(tagId)) current.delete(tagId); else current.add(tagId);
    const arr = Array.from(current);
    updateParam('tags', arr.join(','));
  };

  const clearFilters = () => { setSearchParams({}); };

  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) return prev.filter((id) => id !== productId);
      if (prev.length >= 3) return prev;
      return [...prev, productId];
    });
  };

  const hasActiveFilters = activeGoal !== 'all' || activeTags.length > 0 || activeSort !== 'featured';
  const compareProducts = products.filter((p) => compareList.includes(p.node.id));

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Shop Wellness Strips – Dissolving Supplements | NEUVIE™"
        description="Browse 13 fast-dissolving wellness strips for energy, focus, sleep, beauty & gut health. Clinically dosed, third-party tested. Free US shipping on $50+." />
      <CollectionPageJsonLd
        name="All NEUVIE Wellness Strips"
        description="Shop all 13 fast-dissolving wellness strips for energy, focus, sleep, beauty, and gut health."
        url="https://tryneuvie.com/shop"
        numberOfItems={13}
      />
      
      <Navbar />

      <main className="flex-1">
        {/* Collection Intro */}
        <section className="relative overflow-hidden py-14 md:py-20 lg:py-24">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
          <div className="container-wide text-center px-4 md:px-6 relative z-10">
            <motion.h1
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
               Shop All 13 Dissolving Wellness Strips
             </motion.h1>
             <motion.p
              className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
               Each wellness strip is made with clinically studied ingredients and dissolves on your tongue in 30 seconds — no pills, no water, no hassle. 
               Your body deserves supplements that actually fit into your life.
             </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}>
              {['Third-party tested', 'Made in the USA', 'Non-GMO', ...(isUK ? [] : ['Free shipping on $50+'])].map((item) =>
              <span key={item} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {item}
                </span>
              )}
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="border-b border-border sticky top-[100px] md:top-[136px] bg-background/95 backdrop-blur-md z-40">
          <div className="container-wide px-3 md:px-6">
            <div className="flex items-center justify-between py-3 md:py-4">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 -mx-1 px-1">
                {goalFilters.map((f) =>
                <button
                  key={f.id}
                  onClick={() => updateParam('goal', f.id)}
                  className={cn(
                    "px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                    activeGoal === f.id ?
                    "bg-primary text-primary-foreground shadow-sm" :
                    "bg-muted/60 text-muted-foreground hover:bg-muted"
                  )}>
                    <span className="hidden sm:inline">{f.label}</span>
                    <span className="sm:hidden">{f.shortLabel || f.label}</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                <button
                  aria-label="Filters"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all",
                    showFilters ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  )}>
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Filters</span>
                </button>

                <div className="relative group">
                  <button aria-label="Sort options" className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs md:text-sm font-medium bg-muted/60 text-muted-foreground hover:bg-muted transition-all">
                    <span className="hidden sm:inline">Sort</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {sortOptions.map((s) =>
                    <button
                      key={s.id}
                      onClick={() => updateParam('sort', s.id)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm transition-colors",
                        activeSort === s.id ?
                        "text-primary font-medium bg-primary/5" :
                        "text-foreground hover:bg-muted/50"
                      )}>
                        {s.label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showFilters &&
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden">
                  <div className="pb-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium mr-1">Filter by:</span>
                    {tagFilters.map((t) =>
                  <button
                    key={t.id}
                    onClick={() => toggleTag(t.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                      activeTags.includes(t.id) ?
                      "bg-primary/10 text-primary border-primary/30" :
                      "bg-background text-muted-foreground border-border hover:border-primary/30"
                    )}>
                        {t.label}
                      </button>
                  )}
                    {hasActiveFilters &&
                  <button
                    onClick={clearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground underline ml-2">
                        Clear all
                      </button>
                  }
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </section>

        {/* Results count + Compare toggle */}
        <div className="container-wide px-3 md:px-6 pt-4 md:pt-6 flex items-center justify-between">
          <p className="text-xs md:text-sm text-muted-foreground">
            {isLoading ? 'Loading…' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
          </p>
          <button
            onClick={() => setShowCompare(!showCompare)}
            className={cn(
              "flex items-center gap-1.5 text-xs md:text-sm font-medium transition-colors",
              showCompare ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}>
            <Scale className="h-3.5 w-3.5" />
            Compare{compareList.length > 0 && ` (${compareList.length}/3)`}
          </button>
        </div>

        {/* Products Grid */}
        <section className="py-4 md:py-8 lg:py-12" aria-labelledby="shop-grid-heading">
          <div className="container-wide px-3 md:px-6">
            <h2 id="shop-grid-heading" className="sr-only">Our Wellness Strips</h2>

            {isLoading ?
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {[...Array(8)].map((_, i) =>
              <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square rounded-xl" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
              )}
              </div> :
            filteredProducts.length === 0 ? (
            <div className="text-center py-16 md:py-24 max-w-md mx-auto">
                <span className="text-4xl mb-4 block">🔍</span>
                <h2 className="font-display text-lg md:text-xl mb-2">We don't have that exact match yet</h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  But there might be something else that's perfect for you. 
                  Take a look at the full collection — your body will tell you what it needs.
                </p>
                <Button variant="outline" onClick={clearFilters} className="rounded-full">
                  View all 13 strips
                </Button>
              </div>) :
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts.map((product, index) =>
              <ProductCard
                key={product.node.id}
                product={product}
                index={index}
                showCompare={showCompare}
                isCompared={compareList.includes(product.node.id)}
                onToggleCompare={() => toggleCompare(product.node.id)} />
              )}
              </div>
            }
          </div>
        </section>

        {/* Compare Drawer */}
        <AnimatePresence>
          {compareList.length > 0 && showCompare &&
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 inset-x-0 bg-card border-t border-border shadow-elevated z-50 p-4">
              <div className="container-wide flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-x-auto flex-1">
                  {compareProducts.map((p) =>
                <div key={p.node.id} className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1.5 flex-shrink-0">
                      <span className="text-xs font-medium truncate max-w-[120px]">{sanitizeTitle(p.node.title)}</span>
                      <button onClick={() => toggleCompare(p.node.id)} aria-label={`Remove ${sanitizeTitle(p.node.title)} from compare`} className="text-muted-foreground hover:text-foreground">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                )}
                  {compareList.length < 3 &&
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                      Select up to {3 - compareList.length} more
                    </span>
                }
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => {setCompareList([]);setShowCompare(false);}} className="rounded-full text-xs">
                    Clear
                  </Button>
                  <Button size="sm" disabled={compareList.length < 2} className="rounded-full text-xs" onClick={() => setCompareModalOpen(true)}>
                    Compare {compareList.length} strips
                  </Button>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>

        <CompareModal
          open={compareModalOpen}
          onOpenChange={setCompareModalOpen}
          products={compareProducts}
          onRemoveProduct={(id) => {
            toggleCompare(id);
            if (compareProducts.length <= 2) setCompareModalOpen(false);
          }} />

        {/* SEO Content Section */}
        <section className="py-16 md:py-20 bg-card border-t border-border/30">
          <div className="container-wide max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl md:text-3xl text-center mb-6">
                Why Choose Dissolving Wellness Strips Over Pills?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-display text-xl text-foreground mb-3">Faster Absorption, Better Results</h3>
                  <p className="mb-4">
                    Traditional supplement pills and capsules must travel through your digestive system before nutrients are absorbed — 
                    a process that can take 30–60 minutes and lose potency along the way. NEUVIE's oral dissolving strips 
                    deliver active ingredients through the{' '}
                    <a href="https://pubmed.ncbi.nlm.nih.gov/23550999/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      sublingual and buccal mucosa
                    </a>, enabling up to 5× faster absorption directly into your bloodstream.
                  </p>
                  <p>
                    This means our <Link to="/shop" className="text-primary hover:underline">energy strips</Link> start working within minutes, 
                    not half an hour. And our <Link to="/shop" className="text-primary hover:underline">sleep formula</Link> helps you 
                    wind down faster than any capsule can.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-3">13 Formulas for Every Wellness Goal</h3>
                  <p className="mb-4">
                    From cognitive performance with Lion's Mane to beauty support with Collagen peptides, NEUVIE offers a dissolving strip 
                    for every part of your wellness journey. All ingredients are{' '}
                    <Link to="/science" className="text-primary hover:underline">clinically studied and third-party verified</Link>.
                  </p>
                  <p>
                    Not sure which strip fits your needs? Try our <Link to="/bundles" className="text-primary hover:underline">curated bundles</Link> and 
                    save up to 20%. Every order ships free over $50 and is backed by our{' '}
                    <Link to="/returns" className="text-primary hover:underline">30-day money-back guarantee</Link>. 
                    Have questions? Our <Link to="/contact" className="text-primary hover:underline">support team</Link> is happy to help.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <SocialShareButtons 
                  url="https://tryneuvie.com/shop" 
                  text="Check out NEUVIE's 13 dissolving wellness strips — energy, sleep, beauty & more." 
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-10 md:py-14 bg-secondary/30">
          <div className="container-wide px-4 md:px-6">
            <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center gap-4 md:gap-8 lg:gap-16">
              {[
              { Icon: FlaskConical, label: 'Third-Party Tested', shortLabel: 'Lab Tested' },
              { Icon: Leaf, label: 'Non-GMO', shortLabel: 'Non-GMO' },
              { Icon: Flag, label: 'Made in USA', shortLabel: 'USA Made' },
              ...(isUK ? [] : [{ Icon: Truck, label: 'Free Shipping on $50+', shortLabel: 'Free Ship' }]),
              { Icon: RotateCcw, label: '30-Day Money-Back Guarantee', shortLabel: '30-Day Return' }].
              map((badge) =>
              <div key={badge.label} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-2 text-muted-foreground text-center">
                  <badge.Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={1.5} />
                  <span className="text-[10px] md:text-sm font-medium leading-tight">
                    <span className="hidden md:inline">{badge.label}</span>
                    <span className="md:hidden">{badge.shortLabel}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>);
}
