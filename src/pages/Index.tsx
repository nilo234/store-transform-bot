import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronRight, Shield, Truck, FlaskConical, Leaf, Award, Eye } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { ProductCard } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/button';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { HomepageFAQs } from '@/components/home/HomepageFAQs';
import { PageMeta } from '@/components/seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
      <PageMeta
        title="Dissolving Wellness Strips – Science-Backed Ingredients | NEUVIE™"
        description="NEUVIE™ dissolving wellness strips deliver clinically studied ingredients through fast oral absorption. Transparent formulas, third-party tested, made in the USA."
      />
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">

        {/* ─────────────────────────────────────────────
            SECTION 1 — HERO
            Imagery: Close-up of a single strip on a fingertip against
            a clean, light background. Natural light, shallow depth of
            field. No stocky lifestyle models — focus on the product itself.
        ───────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-muted/30" />

          <div className="container-wide relative z-10 py-12 md:py-0 px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1 text-center lg:text-left"
              >
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5">
                  Wellness that dissolves{' '}
                  <span className="text-accent">on your tongue</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Clinically studied ingredients in a fast-dissolving strip.
                  No pills, no water, no guesswork — just place, dissolve, and go.
                </p>

                {/* Trust points */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-5 mb-8">
                  <span className="flex items-center justify-center lg:justify-start gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="font-medium">60-day money-back guarantee</span>
                  </span>
                  <span className="flex items-center justify-center lg:justify-start gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <span className="font-medium">Free US shipping on $50+</span>
                  </span>
                </div>

                {/* 2 CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link to="/shop">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base font-semibold rounded-lg group">
                      Shop wellness strips
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/science">
                    <Button variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg">
                      See how it works
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Visual placeholder */}
              <motion.div
                className="relative order-1 lg:order-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {/* Imagery note: Replace with a high-res product photo — 
                    a single strip held between two fingers, bright natural light,
                    neutral linen or marble surface. Avoid busy backgrounds. */}
                <div className="relative aspect-[4/3] sm:aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20 rounded-3xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <span className="text-7xl md:text-8xl block mb-4">💧</span>
                      <p className="text-sm text-muted-foreground font-medium">Product hero image</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            SECTION 2 — HOW STRIPS WORK
            Imagery: Step-by-step illustrations or short-form photos.
            Step 1 — pouch being torn open (top-down flat lay).
            Step 2 — strip placed on tongue (close-up, clean).
            Step 3 — person going about their day (natural, candid).
        ───────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container-wide px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                How It Works
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                Three steps, about 30 seconds, no water needed.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '1',
                  icon: '📦',
                  title: 'Open the pouch',
                  description: 'Each individually sealed strip stays fresh until you\'re ready.',
                },
                {
                  step: '2',
                  icon: '👅',
                  title: 'Place on your tongue',
                  description: 'The strip dissolves in about 30 seconds. Ingredients are absorbed through the oral mucosa.',
                },
                {
                  step: '3',
                  icon: '✨',
                  title: 'Go about your day',
                  description: 'No water, no swallowing pills. Take it anywhere — at your desk, on a run, or before bed.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-background border-2 border-border/50 flex items-center justify-center shadow-soft">
                    <span className="text-3xl md:text-4xl">{item.icon}</span>
                  </div>
                  <span className="text-xs font-bold text-primary/60 tracking-widest uppercase mb-1 block">
                    Step {item.step}
                  </span>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center text-xs text-muted-foreground mt-10 italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Oral-mucosal delivery allows ingredients to enter the bloodstream without passing through the digestive system first.
            </motion.p>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            SECTION 3 — WHY NEUVIE (proof points)
            Imagery: Lab/testing facility photography or flat-lay of
            ingredient powders in petri dishes. Certificates and lab
            reports (blurred) in the background. Clean, editorial feel.
        ───────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide px-4 md:px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Why NEUVIE
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                What goes into our strips — and what doesn't.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: FlaskConical,
                  title: 'Clinically studied ingredients',
                  description: 'Every formula uses ingredients backed by published research at meaningful dosages. No proprietary blends — full transparency on every label.',
                  evidence: '[Link to ingredient research page]',
                },
                {
                  icon: Shield,
                  title: 'Third-party tested',
                  description: 'Each batch is independently tested for purity, potency, and contaminants by an accredited lab. Certificates of analysis available on request.',
                  evidence: '[Link to COA or lab partner page]',
                },
                {
                  icon: Leaf,
                  title: 'Clean formula',
                  description: 'Non-GMO, no artificial colors, no unnecessary fillers. We publish every ingredient on the label — active and inactive.',
                  evidence: '[Link to full ingredient list per product]',
                },
                {
                  icon: Award,
                  title: 'GMP-certified, made in the USA',
                  description: 'Manufactured in a GMP-certified facility following FDA guidelines for dietary supplements. Domestically sourced where possible.',
                  evidence: '[GMP certification badge / facility info]',
                },
                {
                  icon: Eye,
                  title: 'Full label transparency',
                  description: 'No proprietary blends. Every ingredient and its dosage is listed clearly so you know exactly what you\'re taking.',
                  evidence: '[Link to view product labels]',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <p className="text-xs text-primary/70 italic">{item.evidence}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            SECTION 4 — BEST SELLERS (short preview)
            Imagery: Product packaging shot per card — consistent
            white/light background, same angle, same lighting across
            all four. Think Ritual or AG1 product photography.
        ───────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container-wide px-4 md:px-6">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Best Sellers
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Our most popular strips, chosen by thousands of customers.
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-2">Products will appear here once added to your store.</p>
              </div>
            )}

            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/shop">
                <Button
                  variant="outline"
                  className="h-11 px-8 text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg"
                >
                  View all products
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            SECTION 5 — FAQ (6 questions)
            No imagery needed — clean text accordion.
        ───────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-wide px-4 md:px-6">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Straightforward answers — no fine print.
              </p>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {[
                  {
                    q: 'What are dissolving wellness strips?',
                    a: 'Thin, oral strips that dissolve on your tongue in about 30 seconds. The active ingredients are absorbed through the lining of your mouth, which means they don\'t have to pass through your digestive system first.',
                  },
                  {
                    q: 'What ingredients do you use?',
                    a: 'Every product uses clinically studied ingredients at transparent dosages — no proprietary blends. Full ingredient lists, including inactive ingredients, are published on each product page. Common actives include Vitamin D3, B12, Iron, Lion\'s Mane, Melatonin, and Biotin.',
                  },
                  {
                    q: 'Are the strips tested by a third party?',
                    a: 'Yes. Every batch is independently tested for purity, potency, and contaminants by an accredited laboratory. We can provide Certificates of Analysis on request — email hello@neuvie.com.',
                  },
                  {
                    q: 'How is this different from a pill or gummy?',
                    a: 'Oral strips dissolve and absorb through the oral mucosa, bypassing the digestive tract. This can support faster absorption for certain ingredients. They\'re also more portable — no water, no chewing, no aftertaste.',
                  },
                  {
                    q: 'What is your return policy?',
                    a: 'We offer a 60-day money-back guarantee on your first order. If you\'re not satisfied, email us and we\'ll process a full refund — no hoops, no fine print.',
                  },
                  {
                    q: 'Do you ship outside the US?',
                    a: 'Currently we ship within the United States only. Orders over $50 qualify for free standard shipping (3–5 business days). We typically ship within 1–2 business days of ordering.',
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card rounded-xl border border-border/50 px-6 shadow-soft"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/faqs" className="text-primary hover:text-accent transition-colors font-medium text-sm">
                View all FAQs →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            SECTION 6 — FOOTER MICROCOPY
            Handled by <Footer /> component, which already includes:
            - Free US shipping on orders $50+
            - 60-day money-back guarantee
            - Secure checkout (256-bit SSL)
            - hello@neuvie.com support
            - FDA disclaimer
            - Links to Shipping, Returns, Privacy, Terms
        ───────────────────────────────────────────── */}

      </main>

      <Footer />
    </div>
  );
}
