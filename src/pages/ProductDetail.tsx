import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, ChevronLeft, Check, Truck, Shield, RotateCcw, Leaf, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { findProductContent, ProductContent } from '@/data/productContent';
import { JudgeMeReviews } from '@/components/reviews/JudgeMeReviews';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    
    toast.success('Added to Cart!', {
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
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/shop" className="text-primary hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const originalPrice = price * 1.42;
  const images = product.images.edges;
  
  // Get product content
  const productContent = findProductContent(product.title) || findProductContent(product.handle);

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
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted/20">
                    <span className="text-6xl">💊</span>
                  </div>
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
                <span className="text-3xl font-bold text-primary">€{price.toFixed(2)}</span>
                <span className="text-xl text-muted-foreground line-through">€{originalPrice.toFixed(2)}</span>
                <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">
                  Save €{(originalPrice - price).toFixed(2)}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-muted-foreground leading-relaxed">
                {productContent?.shortDescription || product.description || 'Premium oral strip with science-backed ingredients. Fast-dissolving, no water needed.'}
              </p>

              {/* Benefits */}
              {productContent && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">What This Product May Support:</h3>
                  <ul className="space-y-2">
                    {productContent.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">{benefit.headline}:</span>{' '}
                          <span className="text-muted-foreground">{benefit.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Properties/Badges */}
              {productContent && (
                <div className="flex flex-wrap gap-2">
                  {productContent.properties.map((prop, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm">
                      <Leaf className="h-3.5 w-3.5 text-primary" />
                      {prop}
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                  <p className="text-xs text-muted-foreground">Free Shipping<br />on €50+</p>
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

        {/* Detailed Product Information */}
        {productContent && (
          <section className="py-16 bg-muted/30">
            <div className="container-wide">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
                  Product Details
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {/* Product Description */}
                  <AccordionItem value="description" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">Description</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 text-muted-foreground">
                        {productContent.longDescription.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Usage */}
                  <AccordionItem value="usage" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">How to Use</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground">{productContent.usage}</p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Ingredients */}
                  <AccordionItem value="ingredients" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">Ingredients</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-2">
                        {productContent.ingredients.map((ingredient, index) => (
                          <span key={index} className="px-3 py-1.5 bg-muted rounded-full text-sm">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Supplement Facts */}
                  <AccordionItem value="supplement-facts" className="bg-card rounded-xl border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-lg">Supplement Facts</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 font-semibold">Nutrient</th>
                              <th className="text-right py-2 font-semibold">Amount per Strip</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productContent.supplementFacts.map((fact, index) => (
                              <tr key={index} className="border-b border-border/50">
                                <td className="py-2 text-muted-foreground">{fact.nutrient}</td>
                                <td className="py-2 text-right">{fact.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="text-xs text-muted-foreground mt-3">* Daily value not established</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Disclaimer */}
                <div className="mt-8 p-6 bg-card rounded-xl">
                  <div className="flex gap-4">
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground italic">
                      {productContent.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Judge.me Reviews Section */}
        <JudgeMeReviews 
          productId={product.id} 
          productHandle={product.handle}
          productTitle={product.title}
        />
      </main>

      <Footer />
    </div>
  );
}
