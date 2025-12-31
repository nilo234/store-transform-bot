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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Auri Style */}
        <section className="bg-[hsl(150,35%,15%)] py-16 md:py-20">
          <div className="container-wide text-center">
            <motion.h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              SHOP ALL STRIPS
            </motion.h1>
            <motion.p 
              className="text-lg text-white/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              13 premium oral strips with science-backed ingredients. Fast-dissolving, convenient, and designed to fit your lifestyle.
            </motion.p>
          </div>
        </section>

        {/* Category Filters - Auri Style */}
        <section className="border-b border-[hsl(40,20%,88%)] sticky top-[136px] bg-white z-40">
          <div className="container-wide">
            <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-sm text-sm font-medium whitespace-nowrap transition-all duration-300 border",
                    activeCategory === category.id
                      ? "bg-[hsl(150,35%,15%)] text-white border-[hsl(150,35%,15%)]"
                      : "bg-white text-[hsl(150,30%,15%)] border-[hsl(40,20%,88%)] hover:border-[hsl(150,35%,15%)] hover:text-[hsl(150,35%,15%)]"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16 bg-[hsl(40,30%,97%)]">
          <div className="container-wide">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-[hsl(150,15%,45%)] mb-4">No products found in this category.</p>
                <button 
                  onClick={() => handleCategoryChange('all')}
                  className="text-[hsl(150,35%,15%)] font-medium hover:underline"
                >
                  View all products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Trust Badges - Auri Style */}
        <section className="py-12 bg-[hsl(150,35%,15%)]">
          <div className="container-wide">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { icon: '✓', label: 'Third-Party Tested' },
                { icon: '✓', label: 'Non-GMO' },
                { icon: '✓', label: 'Fast-Dissolving' },
                { icon: '✓', label: 'Made in India' },
                { icon: '✓', label: '60-Day Guarantee' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-[hsl(43,30%,75%)]">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.label}</span>
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
