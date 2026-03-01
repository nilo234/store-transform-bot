import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQJsonLd, PageMeta } from '@/components/seo';

const faqs = [
  { 
    q: 'How do I take Neuvie strips?', 
    a: 'Simply place one strip on your tongue and let it dissolve completely—usually within 30-60 seconds. No water needed! For best results, follow the specific instructions on each product.' 
  },
  { 
    q: 'What makes oral strips better than pills or capsules?', 
    a: 'Oral strips dissolve directly on your tongue, allowing for faster absorption compared to pills that need to be broken down in your stomach. Plus, they\'re incredibly convenient—no water needed, easy to take anywhere, and no choking on large capsules.' 
  },
  { 
    q: 'Are your products third-party tested?', 
    a: 'Yes! Every batch of Neuvie strips is independently tested by third-party labs for purity, potency, and safety. We publish our test results for complete transparency.' 
  },
  { 
    q: 'Do you offer a money-back guarantee?', 
    a: 'Absolutely. We offer a 14-day money-back guarantee on all orders. If you\'re not completely satisfied with your purchase, simply contact us for a full refund—no questions asked.' 
  },
  { 
    q: 'Are Neuvie strips vegan?', 
    a: 'Most of our strips are vegan, made with plant-based ingredients like pullulan. Please check the specific product page for detailed ingredient information and dietary certifications.' 
  },
  { 
    q: 'How long until I notice results?', 
    a: 'It depends on the product. Energy Strips work within minutes. For supplements like Hair, Skin & Nails or Sleep Strips, most customers notice benefits within 2-4 weeks of consistent daily use.' 
  },
  { 
    q: 'Do you ship internationally?', 
    a: 'We currently ship within the United States only. We offer free shipping on all orders over $50. Orders typically arrive within 3-5 business days. Sign up for our newsletter to be notified when we expand to new markets.' 
  },
  { 
    q: 'Can I take multiple Neuvie products together?', 
    a: 'Yes, our products are designed to complement each other. Many customers combine Energy Strips in the morning with Sleep Strips at night. However, we recommend consulting with your healthcare provider if you have specific health concerns.' 
  },
  { 
    q: 'Are there any side effects?', 
    a: 'Our strips are made with natural, carefully selected ingredients. Side effects are rare. However, if you experience any adverse reactions, discontinue use and consult your healthcare provider. Always check ingredients if you have known allergies.' 
  },
  { 
    q: 'What makes Neuvie different from other supplements?', 
    a: 'Three things: format, quality, and transparency. Our fast-dissolving strips are more convenient than pills. We use premium, science-backed ingredients at clinically studied dosages. And every batch is third-party tested with results you can verify.' 
  },
  { 
    q: 'How should I store my strips?', 
    a: 'Store your Neuvie strips in a cool, dry place away from direct sunlight. Keep the packaging sealed when not in use to maintain freshness and potency.' 
  },
  { 
    q: 'Are your strips safe during pregnancy or breastfeeding?', 
    a: 'We recommend consulting with your healthcare provider before taking any supplements during pregnancy or breastfeeding. Some products, like those containing caffeine or melatonin, may not be suitable.' 
  },
];

export default function FAQs() {
  // Transform FAQs for JSON-LD
  const faqJsonLdData = faqs.map(faq => ({
    question: faq.q,
    answer: faq.a
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* SEO */}
      <PageMeta
        title="Frequently Asked Questions | NEUVIE™ Strips"
        description="Get answers about NEUVIE™ dissolving strips – how they work, ingredients, shipping, returns & more. Third-party tested, 14-day guarantee. Contact our team anytime."
      />
      <FAQJsonLd faqs={faqJsonLdData} />
      
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide text-center">
            <motion.h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Everything you need to know about Neuvie strips. Can't find what you're looking for? Contact our support team.
            </motion.p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`item-${i}`} 
                    className="bg-card rounded-xl px-6 border border-border/50 shadow-soft data-[state=open]:shadow-card transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline hover:text-primary transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Contact CTA */}
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-muted-foreground mb-4">
                Still have questions?
              </p>
              <a 
                href="/contact" 
                className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                Contact our support team →
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
