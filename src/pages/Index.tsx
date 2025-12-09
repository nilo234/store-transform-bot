import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, ChevronRight, Leaf, Shield, FlaskConical, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

// Trust badges for marquee - TryAuri style
const marqueeItems = [
  { icon: '✓', text: '3rd Party Tested' },
  { icon: '✓', text: 'Naturally Flavored' },
  { icon: '✓', text: 'Gluten-Free' },
  { icon: '✓', text: 'CGMP Certified' },
  { icon: '✓', text: '3rd Party Tested' },
  { icon: '✓', text: 'Naturally Flavored' },
  { icon: '✓', text: 'Gluten-Free' },
  { icon: '✓', text: 'CGMP Certified' },
];

// Benefits section - TryAuri style
const benefits = [
  {
    icon: '🧠',
    title: 'Supports Focus & Memory',
    description: "Our unique blend of Lion's Mane and adaptogenic mushrooms enhances cognitive function and mental clarity."
  },
  {
    icon: '💪',
    title: 'Boosts Natural Energy',
    description: 'Feel energized throughout the day with our carefully formulated supplements that support sustained vitality.'
  },
  {
    icon: '🌙',
    title: 'Promotes Restful Sleep',
    description: 'Natural ingredients like L-Theanine and Passionflower help you fall asleep faster and wake refreshed.'
  },
  {
    icon: '🛡️',
    title: 'Immune System Support',
    description: 'Powerful antioxidants and vitamins work together to strengthen your natural defenses.'
  }
];

// Testimonials - TryAuri style
const testimonials = [
  {
    name: 'Sarah M.',
    image: null,
    content: 'Amazing! These gummies have transformed my daily routine. I feel more focused and energized throughout the day.',
    rating: 5,
  },
  {
    name: 'James R.',
    image: null,
    content: "Finally, supplements that actually work! The focus gummies are incredible - I've noticed a real difference in my concentration.",
    rating: 5,
  },
  {
    name: 'Emily K.',
    image: null,
    content: 'Love the quality and taste! My hair and nails have never looked better after using the Hair, Skin & Nails gummies.',
    rating: 5,
  },
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
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - TryAuri Style with Split Layout */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Background - Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-muted/40" />
          
          <div className="container-wide relative z-10 py-12 lg:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Hero Content - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="order-2 lg:order-1"
              >
                {/* Rating Badge - TryAuri Style */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    | Over 50k+ Customers Worldwide!
                  </span>
                </div>

                {/* Main Headline - TryAuri Style */}
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
                  Premium Supplements{' '}
                  <span className="text-accent">Backed by Science</span>
                </h1>

                {/* CTA Button - TryAuri Style */}
                <Link to="/shop">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 text-lg font-semibold rounded-lg group">
                    SHOP NOW
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                {/* Guarantee Text */}
                <p className="mt-6 text-sm text-muted-foreground font-medium">
                  60-Day Money-Back Guarantee***
                </p>

                {/* Customer Avatars with Quote - TryAuri Style */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i} 
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-background flex items-center justify-center"
                      >
                        <span className="text-lg">👤</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm italic text-foreground/80 max-w-[200px]">
                    "Amazing! It does wonders for my mind and body!"
                  </p>
                </div>
              </motion.div>

              {/* Hero Image - Right Side - TryAuri Floating Products Style */}
              <motion.div
                className="relative order-1 lg:order-2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <div className="relative aspect-[4/3] lg:aspect-square">
                  {/* Background Shape */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted/30 rounded-3xl" />
                  
                  {/* Floating Product Mockups */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4 p-8">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          className="bg-background/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <div className="aspect-[3/4] bg-gradient-to-b from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                            <span className="text-4xl">🍬</span>
                          </div>
                          <p className="text-[10px] text-center mt-2 font-medium text-muted-foreground">
                            Neuvie
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

        {/* Marquee Section - TryAuri Style (Dark Background) */}
        <section className="py-4 bg-primary text-primary-foreground overflow-hidden">
          <div className="flex animate-marquee">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-8 whitespace-nowrap font-medium flex items-center gap-2">
                <Check className="h-4 w-4" />
                {item.text}
              </span>
            ))}
          </div>
        </section>

        {/* Best Sellers Section - TryAuri Style */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container-wide">
            {/* Section Header - Centered, TryAuri Style */}
            <div className="text-center mb-12">
              <motion.h2 
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                BEST SELLERS
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Fuel your best self with our gummy supplements.
              </motion.p>
            </div>

            {/* Products Grid - 4 columns on desktop like TryAuri */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found.</p>
                <p className="text-sm text-muted-foreground">Products will appear here once added to your Shopify store.</p>
              </div>
            )}

            {/* View All Button */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/shop">
                <Button 
                  variant="outline" 
                  className="h-12 px-8 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                >
                  View All Products
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section - TryAuri Style */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <motion.h2 
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                THE NEUVIE DIFFERENCE
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Our supplements are crafted with premium ingredients to deliver real results you can feel.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="bg-card rounded-2xl p-8 text-center shadow-soft hover:shadow-card transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-5xl mb-6 block">{benefit.icon}</span>
                  <h3 className="font-display font-semibold text-xl mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - TryAuri Style */}
        <section className="py-20 bg-background">
          <div className="container-wide">
            <div className="text-center mb-12">
              <motion.h2 
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                WHAT OUR CUSTOMERS SAY
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Join thousands of happy customers who've transformed their wellness.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-card rounded-2xl p-8 shadow-soft"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="font-semibold text-primary text-lg">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - TryAuri Style */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <motion.h2 
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Wellness?
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join over 50,000 customers who've discovered the Neuvie difference. 
              Try risk-free with our 60-day money-back guarantee.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/shop">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 px-12 text-lg font-semibold rounded-lg group">
                  SHOP NOW
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
