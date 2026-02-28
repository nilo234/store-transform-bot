import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { PageMeta } from '@/components/seo';
import { ChevronDown, SlidersHorizontal, X, Scale } from 'lucide-react';
import { goalFilters, tagFilters, sortOptions, getProductGoal, getProductTags } from '@/data/shopFilters';
import { Button } from '@/components/ui/button';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

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

  const filteredProducts = useMemo(() => {
    let result = products;

    // Goal filter
    if (activeGoal !== 'all') {
      result = result.filter(p => getProductGoal(p.node.title) === activeGoal);
    }

    // Tag filters
    if (activeTags.length > 0) {
      result = result.filter(p => {
        const tags = getProductTags(p.node.title);
        return activeTags.every(t => tags.includes(t));
      });
    }

    // Sort
    const sorted = [...result];
    switch (activeSort) {
      case 'name-asc':
        sorted.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
      case 'price-asc':
        sorted.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
        break;
      case 'price-desc':
        sorted.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
        break;
      default:
        break;
    }

    return sorted;
  }, [products, activeGoal, activeTags, activeSort]);

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
    if (current.has(tagId)) current.delete(tagId);
    else current.add(tagId);
    const arr = Array.from(current);
    updateParam('tags', arr.join(','));
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) return prev.filter(id => id !== productId);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, productId];
    });
  };

  const hasActiveFilters = activeGoal !== 'all' || activeTags.length > 0 || activeSort !== 'featured';
  const compareProducts = products.filter(p => compareList.includes(p.node.id));

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Shop All 13 Wellness Strips | NEUVIE™"
        description="Browse 13 fast-dissolving wellness strips formulated with science-backed ingredients. Energy, focus, sleep, beauty & immunity. Free US shipping on orders $50+."
      />
      <Navbar />

      <main className="flex-1">
        {/* Collection Intro — clinical, calm */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-10 md:py-16 lg:py-20">
          <div className="container-wide text-center px-4 md:px-6">
            <motion.h1
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Wellness Strips Collection
            </motion.h1>
            <motion.p
              className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              13 fast-dissolving oral strips, each formulated with specific vitamins, minerals, and botanical extracts. 
              No pills, no water — just place on your tongue and go.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-6 mt-5 md:mt-8 text-xs md:text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {['Third-party tested', 'Made in the USA', 'Non-GMO', 'Free shipping on $50+'].map(item => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="border-b border-border sticky top-[100px] md:top-[136px] bg-background/95 backdrop-blur-md z-40">
          <div className="container-wide px-3 md:px-6">
            <div className="flex items-center justify-between py-3 md:py-4">
              {/* Goal Filters — horizontal scroll on mobile */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 -mx-1 px-1">
                {goalFilters.map(f => (
                  <button
                    key={f.id}
                    onClick={() => updateParam('goal', f.id)}
                    className={cn(
                      "px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                      activeGoal === f.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <span className="hidden sm:inline">{f.label}</span>
                    <span className="sm:hidden">{f.shortLabel || f.label}</span>
                  </button>
                ))}
              </div>

              {/* Sort & Filter toggles */}
              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all",
                    showFilters ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  )}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Filters</span>
                </button>

                {/* Sort dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs md:text-sm font-medium bg-muted/60 text-muted-foreground hover:bg-muted transition-all">
                    <span className="hidden sm:inline">Sort</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {sortOptions.map(s => (
                      <button
                        key={s.id}
                        onClick={() => updateParam('sort', s.id)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm transition-colors",
                          activeSort === s.id
                            ? "text-primary font-medium bg-primary/5"
                            : "text-foreground hover:bg-muted/50"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable tag filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pb-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium mr-1">Filter by:</span>
                    {tagFilters.map(t => (
                      <button
                        key={t.id}
                        onClick={() => toggleTag(t.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                          activeTags.includes(t.id)
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-background text-muted-foreground border-border hover:border-primary/30"
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-muted-foreground hover:text-foreground underline ml-2"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
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
            )}
          >
            <Scale className="h-3.5 w-3.5" />
            Compare{compareList.length > 0 && ` (${compareList.length}/3)`}
          </button>
        </div>

        {/* Products Grid */}
        <section className="py-4 md:py-8 lg:py-12">
          <div className="container-wide px-3 md:px-6">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square rounded-xl" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Empty State — calm, helpful */
              <div className="text-center py-16 md:py-24 max-w-md mx-auto">
                <span className="text-4xl mb-4 block">🔍</span>
                <h3 className="font-display text-lg md:text-xl font-semibold mb-2">No matching strips found</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  We don't have a strip matching those exact filters yet. Try adjusting your selection, 
                  or browse the full collection to find what works for you.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-full"
                >
                  View all 13 strips
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.node.id}
                    product={product}
                    index={index}
                    showCompare={showCompare}
                    isCompared={compareList.includes(product.node.id)}
                    onToggleCompare={() => toggleCompare(product.node.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Compare Drawer */}
        <AnimatePresence>
          {compareList.length > 0 && showCompare && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 inset-x-0 bg-card border-t border-border shadow-elevated z-50 p-4"
            >
              <div className="container-wide flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-x-auto flex-1">
                  {compareProducts.map(p => (
                    <div key={p.node.id} className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1.5 flex-shrink-0">
                      <span className="text-xs font-medium truncate max-w-[120px]">{p.node.title}</span>
                      <button onClick={() => toggleCompare(p.node.id)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  {compareList.length < 3 && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      Select up to {3 - compareList.length} more
                    </span>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setCompareList([]); setShowCompare(false); }}
                    className="rounded-full text-xs"
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    disabled={compareList.length < 2}
                    className="rounded-full text-xs"
                    onClick={() => {
                      // Future: navigate to comparison page
                      // For now just scroll to top with info
                    }}
                  >
                    Compare {compareList.length} strips
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Badges */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container-wide px-4 md:px-6">
            <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center gap-4 md:gap-8 lg:gap-16">
              {[
                { icon: '🧪', label: 'Third-Party Tested', shortLabel: 'Lab Tested' },
                { icon: '🌿', label: 'Non-GMO', shortLabel: 'Non-GMO' },
                { icon: '🇺🇸', label: 'Made in USA', shortLabel: 'USA Made' },
                { icon: '📦', label: 'Free Shipping on $50+', shortLabel: 'Free Ship' },
                { icon: '↩️', label: '60-Day Money-Back Guarantee', shortLabel: '60-Day Return' },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-muted-foreground text-center">
                  <span className="text-xl md:text-2xl">{badge.icon}</span>
                  <span className="text-[10px] md:text-sm font-medium leading-tight">
                    <span className="hidden md:inline">{badge.label}</span>
                    <span className="md:hidden">{badge.shortLabel}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
