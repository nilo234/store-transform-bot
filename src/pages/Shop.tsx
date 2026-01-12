import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Products', count: 13 },
  { id: 'performance', label: 'Performance & Energy', count: 3 },
  { id: 'beauty', label: 'Beauty & Skin', count: 2 },
  { id: 'sleep', label: 'Sleep & Relax', count: 2 },
  { id: 'immunity', label: 'Immunity & Health', count: 6 },
];

// Map products to categories based on 13 Neuvie Strips products
const getCategoryForProduct = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  // Performance & Energy: Mushroom Focus, Libido Support, Energy
  if (lowerTitle.includes('energy') || lowerTitle.includes('mushroom') || lowerTitle.includes('libido')) {
    return 'performance';
  }
  // Beauty & Skin: Beauty + Collagen, Hair Skin & Nails
  if (lowerTitle.includes('hair') || lowerTitle.includes('skin') || lowerTitle.includes('nail') || lowerTitle.includes('beauty') || lowerTitle.includes('collagen')) {
    return 'beauty';
  }
  // Sleep & Relax: Cognitive Relax, Sleep
  if (lowerTitle.includes('sleep') || lowerTitle.includes('cognitive') || lowerTitle.includes('relax')) {
    return 'sleep';
  }
  // Immunity & Health: Hangover, Bone, Probiotic, Digestive, Appetite, Iron
  return 'immunity';
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const activeCategory = searchParams.get('category') || 'all';

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
    if (activeCategory === 'all') return products;
    return products.filter(p => getCategoryForProduct(p.node.title) === activeCategory);
  }, [products, activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Mobile optimized */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-10 md:py-16 lg:py-24">
          <div className="container-wide text-center px-4 md:px-6">
            <motion.h1 
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Shop All Strips
            </motion.h1>
            <motion.p 
              className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              13 premium oral strips with science-backed ingredients. Fast-dissolving, convenient, and designed to fit your lifestyle.
            </motion.p>
          </div>
        </section>

        {/* Category Filters - Mobile optimized with horizontal scroll */}
        <section className="border-b border-border sticky top-[100px] md:top-[136px] bg-background/95 backdrop-blur-md z-40">
          <div className="container-wide px-3 md:px-6">
            <div className="flex items-center gap-2 py-3 md:py-4 overflow-x-auto scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                  <span className="ml-1">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid - Mobile optimized 2-column */}
        <section className="py-6 md:py-12 lg:py-16">
          <div className="container-wide px-3 md:px-6">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-3 md:space-y-4">
                    <Skeleton className="aspect-square rounded-xl md:rounded-2xl" />
                    <Skeleton className="h-3 md:h-4 w-3/4" />
                    <Skeleton className="h-3 md:h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <p className="text-base md:text-lg text-muted-foreground mb-4">No products found in this category.</p>
                <button 
                  onClick={() => handleCategoryChange('all')}
                  className="text-primary font-medium hover:underline text-sm md:text-base"
                >
                  View all products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Trust Badges - Mobile optimized */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container-wide px-4 md:px-6">
            <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center gap-4 md:gap-8 lg:gap-16">
              {[
                { icon: '🧪', label: 'Third-Party Tested', shortLabel: 'Lab Tested' },
                { icon: '🌿', label: 'Non-GMO', shortLabel: 'Non-GMO' },
                { icon: '💊', label: 'Fast-Dissolving', shortLabel: 'Fast-Acting' },
                { icon: '🇺🇸', label: 'Made in USA', shortLabel: 'USA Made' },
                { icon: '💯', label: '14-Day Guarantee', shortLabel: 'Guaranteed' },
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
