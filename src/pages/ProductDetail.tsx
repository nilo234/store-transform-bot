import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, ChevronLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Get benefits based on product title
const getProductBenefits = (title: string): string[] => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('digestive') || lowerTitle.includes('gut')) {
    return ['Supports healthy digestion', 'Promotes gut balance', 'Reduces bloating', 'Enhances nutrient absorption'];
  }
  if (lowerTitle.includes('hair') || lowerTitle.includes('skin')) {
    return ['Promotes hair growth', 'Strengthens nails', 'Supports skin elasticity', 'Enhances natural glow'];
  }
  if (lowerTitle.includes('mushroom') || lowerTitle.includes('focus')) {
    return ['Enhances mental clarity', 'Supports concentration', 'Boosts cognitive function', 'Reduces brain fog'];
  }
  if (lowerTitle.includes('cognitive') || lowerTitle.includes('relax')) {
    return ['Promotes relaxation', 'Reduces stress', 'Supports calm mood', 'Enhances mental clarity'];
  }
  if (lowerTitle.includes('bone')) {
    return ['Strengthens bones', 'Supports calcium absorption', 'Promotes joint health', 'Enhances mobility'];
  }
  if (lowerTitle.includes('hangover')) {
    return ['Supports liver function', 'Replenishes electrolytes', 'Reduces morning discomfort', 'Promotes recovery'];
  }
  if (lowerTitle.includes('iron')) {
    return ['Supports energy levels', 'Promotes healthy blood', 'Reduces fatigue', 'Enhances oxygen transport'];
  }
  if (lowerTitle.includes('sleep')) {
    return ['Promotes restful sleep', 'Reduces time to fall asleep', 'Supports sleep quality', 'Wake refreshed'];
  }
  if (lowerTitle.includes('energy')) {
    return ['Boosts natural energy', 'Enhances focus', 'No jitters or crash', 'Sustained alertness'];
  }
  return ['Premium ingredients', 'Science-backed formula', 'Third-party tested', 'Made in USA'];
};

// Get key ingredients based on product title
const getKeyIngredients = (title: string): Array<{ name: string; benefit: string }> => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('digestive') || lowerTitle.includes('gut')) {
    return [
      { name: 'Probiotics', benefit: 'Gut bacteria balance' },
      { name: 'Digestive Enzymes', benefit: 'Nutrient breakdown' },
      { name: 'Ginger Extract', benefit: 'Digestive comfort' },
    ];
  }
  if (lowerTitle.includes('hair') || lowerTitle.includes('skin')) {
    return [
      { name: 'Biotin', benefit: 'Hair & nail growth' },
      { name: 'Vitamin C', benefit: 'Collagen synthesis' },
      { name: 'Vitamin E', benefit: 'Skin protection' },
    ];
  }
  if (lowerTitle.includes('mushroom') || lowerTitle.includes('focus')) {
    return [
      { name: "Lion's Mane", benefit: 'Cognitive support' },
      { name: 'Reishi', benefit: 'Mental clarity' },
      { name: 'Cordyceps', benefit: 'Energy & focus' },
    ];
  }
  if (lowerTitle.includes('cognitive') || lowerTitle.includes('relax')) {
    return [
      { name: 'L-Theanine', benefit: 'Calm focus' },
      { name: 'Ashwagandha', benefit: 'Stress relief' },
      { name: 'GABA', benefit: 'Relaxation' },
    ];
  }
  return [
    { name: 'Premium Blend', benefit: 'Optimal support' },
    { name: 'Natural Extracts', benefit: 'Pure ingredients' },
    { name: 'Essential Vitamins', benefit: 'Daily nutrition' },
  ];
};

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      setIsLoading(true);
      const data = await fetchProductByHandle(handle);
      setProduct(data);
      setIsLoading(false);
    }
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const firstVariant = product.variants.edges[0]?.node;
    if (!firstVariant) return;
    
    addItem({
      product: { node: product },
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity,
      selectedOptions: firstVariant.selectedOptions,
    });
    
    toast.success('Added to cart!', {
      description: `${quantity}x ${product.title}`,
      position: 'top-center',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/shop" className="text-primary hover:underline">
              ← Back to shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const originalPrice = price * 1.42;
  const benefits = getProductBenefits(product.title);
  const ingredients = getKeyIngredients(product.title);
  const images = product.images.edges;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container-wide py-4">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        {/* Product Section */}
        <section className="container-wide pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-muted/50 to-card">
                {images[selectedImage] && (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Badge */}
              <span className="badge-discount inline-block">42% OFF</span>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-bold">{product.title}</h1>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">${price.toFixed(2)}</span>
                <span className="text-xl text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">
                  Save ${(originalPrice - price).toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description || 'Premium quality supplement crafted with science-backed ingredients to support your wellness journey. Each serving is designed for optimal absorption and effectiveness.'}
              </p>

              {/* Benefits */}
              <div className="space-y-3">
                <h3 className="font-semibold">Benefits:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary text-lg gap-2"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Free Shipping<br />Over $50</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Third-Party<br />Tested</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">60-Day<br />Guarantee</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Ingredients Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-wide">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
              Key Ingredients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {ingredients.map((ingredient, index) => (
                <motion.div 
                  key={index}
                  className="bg-card rounded-2xl p-6 text-center shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{ingredient.name}</h3>
                  <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}