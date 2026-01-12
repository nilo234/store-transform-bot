import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, ChevronRight, Shield, Truck, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { ProductCard } from '@/components/shop/ProductCard';
import { BundleSection } from '@/components/shop/BundleSection';
import { BenefitsTabs } from '@/components/home/BenefitsTabs';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
import { WhyNeuvie } from '@/components/home/WhyNeuvie';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { VideoTutorial } from '@/components/home/VideoTutorial';
import { IngredientSpotlight } from '@/components/home/IngredientSpotlight';
import { SocialProofPhotos } from '@/components/home/SocialProofPhotos';
import { HomepageFAQs } from '@/components/home/HomepageFAQs';
import { GuaranteeSection } from '@/components/home/GuaranteeSection';
import { PressLogos } from '@/components/home/PressLogos';
import { NewReleases } from '@/components/home/NewReleases';
import { OrdersCounter } from '@/components/home/OrdersCounter';

// Trust badges for marquee
const marqueeItems = [
  { icon: '✓', text: 'Third-Party Lab Tested' },
  { icon: '✓', text: 'Fast-Dissolving Strips' },
  { icon: '✓', text: 'No Water Needed' },
  { icon: '✓', text: 'Clinically Studied Ingredients' },
  { icon: '✓', text: 'Non-GMO & Gluten-Free' },
  { icon: '✓', text: 'Made in USA' },
  { icon: '✓', text: 'Third-Party Lab Tested' },
  { icon: '✓', text: 'Fast-Dissolving Strips' },
  { icon: '✓', text: 'No Water Needed' },
  { icon: '✓', text: 'Clinically Studied Ingredients' },
];

export default function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts(4);
      setProducts(data);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Conversion Optimized + Mobile First */}
        <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-muted/40" />
          
          <div className="container-wide relative z-10 py-8 md:py-12 lg:py-0 px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center">
              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                {/* Social Proof Header */}
                <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium">
                    4.9/5 from 12,847 Reviews
                  </span>
                </div>

                {/* Orders Counter */}
                <div className="mb-4 md:mb-6">
                  <OrdersCounter />
                </div>

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4 md:mb-6">
                  Feel the Difference in{' '}
                  <span className="text-accent">30 Seconds</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 max-w-lg mx-auto lg:mx-0">
                  Premium dissolving wellness strips with clinically studied ingredients. 
                  5x faster absorption than pills. No water needed.
                </p>

                {/* Trust Points - Stack on mobile */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 mb-6 md:mb-8">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="font-medium">60-Day Guarantee</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <span className="font-medium">Free US Shipping $50+</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">Ships Within 24hrs</span>
                  </div>
                </div>

                <Link to="/shop" className="block">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg font-semibold rounded-lg group">
                    SHOP BEST SELLERS
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <p className="mt-3 md:mt-4 text-xs sm:text-sm text-muted-foreground">
                  ✓ 60-Day Money-Back Guarantee • ✓ Free Returns
                </p>

                {/* Real Customer Quote - Hide on smallest mobile */}
                <div className="mt-6 md:mt-8 hidden sm:flex items-center justify-center lg:justify-start gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-background flex items-center justify-center"
                      >
                        <span className="text-xs md:text-sm">👤</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm italic text-foreground/80 max-w-[200px] md:max-w-[220px] text-left">
                    "Finally, supplements that actually work. I noticed results in just 3 days!"
                  </p>
                </div>
              </motion.div>

              {/* Hero Image - Smaller on mobile */}
              <motion.div
                className="relative order-1 lg:order-2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <div className="relative aspect-[4/3] sm:aspect-square max-w-[280px] sm:max-w-none mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted/30 rounded-2xl md:rounded-3xl" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-8">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          className="bg-background/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <div className="aspect-[3/4] bg-gradient-to-b from-primary/10 to-accent/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                            <span className="text-2xl sm:text-4xl">💊</span>
                          </div>
                          <p className="text-[8px] sm:text-[10px] text-center mt-1 sm:mt-2 font-medium text-muted-foreground">
                            Neuvie Strip
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Marquee Section - Mobile optimized */}
        <section className="py-3 md:py-4 bg-primary text-primary-foreground overflow-hidden">
          <div className="flex animate-marquee">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-4 md:mx-8 whitespace-nowrap text-xs md:text-sm font-medium flex items-center gap-1.5 md:gap-2">
                <Check className="h-3 w-3 md:h-4 md:w-4" />
                {item.text}
              </span>
            ))}
          </div>
        </section>

        {/* Press Logos - Authority */}
        <PressLogos />

        {/* Bundle Section - Above Best Sellers */}
        <BundleSection />

        {/* Best Sellers Section - Mobile optimized */}
        <section className="py-12 md:py-20 lg:py-28 bg-background">
          <div className="container-wide px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <motion.h2 
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                BEST SELLERS
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-sm md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Our most popular wellness strips, trusted by thousands.
              </motion.p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-muted rounded-xl md:rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16">
                <p className="text-muted-foreground mb-4">No products found.</p>
                <p className="text-sm text-muted-foreground">Products will appear here once added to your Shopify store.</p>
              </div>
            )}

            <motion.div 
              className="text-center mt-8 md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/shop">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 text-sm md:text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                >
                  View All 13 Products
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Benefits Tabs Section - Auri-style expandable */}
        <BenefitsTabs />

        {/* How to Use Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container-wide">
            <div className="text-center mb-16">
              <motion.h2 
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                HOW TO USE
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-lg max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Simple. Fast. Effective. Just 30 seconds to wellness.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                { step: '01', icon: '📦', title: 'Remove Strip', description: 'Tear open the pouch and remove one strip' },
                { step: '02', icon: '👅', title: 'Place on Tongue', description: 'Place the strip under your tongue' },
                { step: '03', icon: '⏱️', title: 'Wait 30 Seconds', description: 'Let it dissolve completely' },
                { step: '04', icon: '✨', title: 'Feel the Effects', description: 'Ingredients absorb directly into your system' }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  {/* Connector Line - Hidden on first item and mobile */}
                  {index > 0 && (
                    <div className="hidden md:block absolute top-12 -left-4 md:-left-8 w-8 md:w-16 h-px bg-border" />
                  )}
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-primary/60 tracking-widest">
                    {item.step}
                  </div>
                  
                  {/* Icon Container */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-muted/50 to-muted border-2 border-border/50 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">{item.icon}</span>
                    
                    {/* Subtle ring animation */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary/20"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </div>
                  
                  {/* Text */}
                  <h3 className="font-display font-semibold text-base md:text-lg mb-2">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Additional Info */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-muted-foreground italic">
                No water needed • No pills to swallow • Take anywhere, anytime
              </p>
            </motion.div>

            {/* Video Tutorial */}
            <VideoTutorial 
              // videoSrc="YOUR_VIDEO_URL_HERE" // Uncomment and add your video URL
              // posterImage="/path/to/thumbnail.jpg" // Optional thumbnail
            />
          </div>
        </section>

        {/* Ingredient Spotlight - "Inside the Strips" */}
        <IngredientSpotlight />

        {/* Why Neuvie Section */}
        <WhyNeuvie />

        {/* Testimonials Carousel - Enhanced with verified badges */}
        <TestimonialsCarousel />

        {/* Social Proof Photos */}
        <SocialProofPhotos />

        {/* New Releases Section */}
        <NewReleases />

        {/* Homepage FAQs */}
        <HomepageFAQs />

        {/* 60-Day Guarantee Section */}
        <GuaranteeSection />

        {/* CTA Section - Conversion Optimized */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <motion.h2 
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Join 50,000+ Happy Customers
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 text-lg mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Experience premium wellness strips trusted by thousands. 
              Try risk-free with our 60-day money-back guarantee.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <span className="text-sm text-primary-foreground/70">✓ Free Shipping on $50+</span>
              <span className="text-sm text-primary-foreground/70">✓ 60-Day Guarantee</span>
              <span className="text-sm text-primary-foreground/70">✓ Cancel Anytime</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/shop">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-12 text-lg font-semibold rounded-lg group">
                  START YOUR WELLNESS JOURNEY
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
