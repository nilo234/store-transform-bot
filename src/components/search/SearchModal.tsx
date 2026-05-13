import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  // Load all products once
  useEffect(() => {
    async function loadProducts() {
      const products = await fetchProducts(20);
      setAllProducts(products);
    }
    loadProducts();
  }, []);

  // Filter products based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const searchTerm = query.toLowerCase();
    const filtered = allProducts.filter(product => 
      product.node.title.toLowerCase().includes(searchTerm) ||
      product.node.description.toLowerCase().includes(searchTerm)
    );
    setResults(filtered);
    setIsLoading(false);
  }, [query, allProducts]);

  const handleQuickAdd = useCallback((product: ShopifyProduct) => {
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success('Added to Cart!', {
      description: product.node.title,
      position: 'top-center',
    });
  }, [addItem]);

  const popularSearches = ['Energy', 'Sleep', 'Focus', 'Beauty', 'Immunity'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground"
            autoFocus
          />
          {query && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {/* Popular Searches */}
          {!query && (
            <div className="p-4">
              <p className="text-sm font-medium text-muted-foreground mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}

          {/* Results */}
          {!isLoading && query && results.length > 0 && (
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground mb-2">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
              {results.map((product) => {
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const image = product.node.images.edges[0]?.node.url;

                return (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    {/* Product Image */}
                    <Link 
                      to={`/product/${product.node.handle}`}
                      onClick={() => onOpenChange(false)}
                      className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0"
                    >
                      {image ? (
                        <img src={image} alt={product.node.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">💊</div>
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${product.node.handle}`}
                        onClick={() => onOpenChange(false)}
                        className="font-semibold text-foreground hover:text-primary transition-colors block truncate"
                      >
                        {product.node.title}
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {product.node.description.slice(0, 60)}...
                      </p>
                      <p className="text-primary font-bold mt-1">${price.toFixed(2)}</p>
                    </div>

                    {/* Quick Add */}
                    <Button
                      size="sm"
                      onClick={() => handleQuickAdd(product)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground"
                    >
                      Add
                    </Button>
                  </motion.div>
                );
              })}

              {/* View All Results */}
              <Link
                to={`/shop?search=${encodeURIComponent(query)}`}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-center gap-2 py-3 text-primary font-medium hover:underline"
              >
                View all results
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* No Results */}
          {!isLoading && query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-2">No products found for "{query}"</p>
              <p className="text-sm text-muted-foreground">Try a different search term</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
