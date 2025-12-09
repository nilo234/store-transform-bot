import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { 
    q: 'How should I take the gummies?', 
    a: 'Take 2 gummies daily with or without food. For best results, take them at the same time each day. Consistency is key for optimal results.' 
  },
  { 
    q: 'Are your products third-party tested?', 
    a: 'Yes! All Neuvie products are third-party tested for purity, potency, and safety. We exceed industry standards and publish our test results for complete transparency.' 
  },
  { 
    q: 'Do you offer a money-back guarantee?', 
    a: 'Absolutely. We offer a 60-day money-back guarantee on all orders. If you\'re not completely satisfied, simply contact us for a full refund - no questions asked.' 
  },
  { 
    q: 'Are the gummies vegan?', 
    a: 'Our gummies are made with pectin (plant-based) instead of gelatin, making them suitable for vegetarians. Please check each product page for specific dietary information.' 
  },
  { 
    q: 'How long until I see results?', 
    a: 'Most customers notice benefits within 2-4 weeks of consistent daily use. However, individual results may vary based on your unique physiology and lifestyle.' 
  },
  { 
    q: 'Do you ship internationally?', 
    a: 'Currently, we ship within the United States. International shipping is coming soon! Sign up for our newsletter to be notified when we expand.' 
  },
  { 
    q: 'Can I take multiple products together?', 
    a: 'Yes, our products are designed to work synergistically. However, we recommend consulting with your healthcare provider before starting any new supplement regimen.' 
  },
  { 
    q: 'Are there any side effects?', 
    a: 'Our supplements are made with natural, carefully selected ingredients. Side effects are rare, but if you experience any adverse reactions, discontinue use and consult your doctor.' 
  },
  { 
    q: 'How do I cancel my subscription?', 
    a: 'You can easily manage or cancel your subscription through your account dashboard, or by contacting our customer support team at support@neuvie.com.' 
  },
  { 
    q: 'What makes Neuvie different from other supplements?', 
    a: 'We use only premium, science-backed ingredients in clinically studied dosages. Every batch is third-party tested, and we never use artificial colors, flavors, or preservatives.' 
  },
];

export default function FAQs() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - TryAuri Style */}
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
              Find answers to common questions about our products, shipping, and more.
            </motion.p>
          </div>
        </section>

        {/* FAQ Section - TryAuri Style */}
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
                Can't find what you're looking for?
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
