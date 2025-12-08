import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

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

const marqueeItems = [
  '✓ Naturally Flavored',
  '✓ Gluten Free',
  '✓ Third-Party Tested',
  '✓ Made in USA',
  '✓ Non-GMO',
  '✓ Premium Quality',
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Verified Buyer',
    content: 'Amazing! These gummies have transformed my daily routine. I feel more focused and energized throughout the day.',
    rating: 5,
  },
  {
    name: 'James R.',
    role: 'Verified Buyer',
    content: "Finally, supplements that actually work! The focus gummies are incredible - I've noticed a real difference in my concentration.",
    rating: 5,
  },
  {
    name: 'Emily K.',
    role: 'Verified Buyer',
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
          
          <div className="container-wide relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Rating Badge */}
                <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">Over 50,000+ Happy Customers</span>
                </div>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Premium Supplements{' '}
                  <span className="text-gradient">Backed by Science</span>
                </h1>

                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Discover the power of nature with our carefully crafted gummies. 
                  Third-party tested, non-GMO, and designed for maximum absorption.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link to="/shop">
                    <Button className="btn-primary text-lg px-8 py-6 gap-2">
                      Shop Now
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/science">
                    <Button variant="outline" className="btn-secondary text-lg px-8 py-6">
                      Learn More
                    </Button>
                  </Link>
                </div>

                {/* Trust Points */}
                <div className="flex flex-wrap gap-6">
                  {['60-Day Guarantee', 'Free Shipping $50+', 'Made in USA'].map((point) => (
                    <span key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      {point}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-8xl">🌿</span>
                    <p className="mt-4 text-2xl font-display font-semibold text-primary">Pure & Natural</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-4 bg-primary text-primary-foreground overflow-hidden">
          <div className="flex animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="mx-8 whitespace-nowrap font-medium">
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-20 md:py-28">
          <div className="container-wide">
            <div className="text-center mb-12">
              <motion.h2 
                className="font-display text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Best Sellers
              </motion.h2>
              <p className="text-muted-foreground text-lg">
                Fuel your best self with our gummy supplements.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found.</p>
                <p className="text-sm text-muted-foreground">Products will appear here once added to your Shopify store.</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link to="/shop">
                <Button variant="outline" className="btn-secondary gap-2">
                  View All Products
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                The Neuvie Difference
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our supplements are crafted with premium ingredients to deliver real results you can feel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="bg-card rounded-2xl p-6 shadow-soft text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-5xl mb-4 block">{benefit.icon}</span>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of happy customers who've transformed their wellness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-card rounded-2xl p-6 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-semibold text-primary">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Wellness?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join over 50,000 customers who've discovered the Neuvie difference. 
              Try risk-free with our 60-day money-back guarantee.
            </p>
            <Link to="/shop">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-6 gap-2">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}