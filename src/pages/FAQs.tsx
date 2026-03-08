import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQJsonLd, PageMeta } from '@/components/seo';

const faqs = [
  { 
    q: 'How do I take Neuvie strips?', 
    a: 'Place one strip on your tongue and let it dissolve — usually within 30–60 seconds. No water needed. For best results, follow the specific instructions on each product.' 
  },
  { 
    q: 'What makes strips better than pills?', 
    a: "Strips dissolve directly on your tongue, so the ingredients absorb faster than a pill that needs to break down in your stomach. They're also easier to take — no water, no swallowing large capsules, and they go wherever you go." 
  },
  { 
    q: 'Are your products third-party tested?', 
    a: 'Yes. Every batch of Neuvie strips is independently tested by third-party labs for purity, potency, and safety. We believe in full transparency — what the label says is what you get.' 
  },
  { 
    q: "What if I'm not happy with my order?", 
    a: "We offer a 14-day money-back guarantee on all orders. If it's not working for you, email us and we'll refund you — no questions asked." 
  },
  { 
    q: 'Are Neuvie strips vegan?', 
    a: 'Most of our strips are vegan, made with plant-based ingredients like pullulan. Check the specific product page for detailed ingredient information and dietary notes.' 
  },
  { 
    q: 'How long until I notice a difference?', 
    a: 'It depends on the product. Energy Strips work within minutes. For daily-use products like Hair, Skin & Nails or Sleep Strips, most people notice a difference within 2–4 weeks of consistent use.' 
  },
  { 
    q: 'Do you ship internationally?', 
    a: 'We currently ship within the United States only. Free shipping on all orders over $50, with delivery in 3–5 business days. Sign up for our newsletter to know when we expand.' 
  },
  { 
    q: 'Can I take more than one product?', 
    a: "Absolutely — our products are designed to complement each other. Many people combine Energy Strips in the morning with Sleep Strips at night. If you have specific health concerns, check with your healthcare provider." 
  },
  { 
    q: 'Are there any side effects?', 
    a: 'Our strips are made with carefully selected ingredients, and side effects are rare. If you experience any adverse reactions, stop use and consult your healthcare provider. Always check ingredients if you have known allergies.' 
  },
  { 
    q: 'What makes Neuvie different?', 
    a: "Three things: the format is easier to stick with than pills. The ingredients are dosed at levels that are studied to work. And every batch is independently tested \u2014 so you know exactly what you\u2019re getting." 
  },
  { 
    q: 'How should I store my strips?', 
    a: 'Keep them in a cool, dry place away from direct sunlight. Seal the packaging when not in use to maintain freshness.' 
  },
  { 
    q: 'Are your strips safe during pregnancy or breastfeeding?', 
    a: "We recommend talking to your healthcare provider before starting any supplement during pregnancy or breastfeeding. Some products \u2014 especially those with caffeine or melatonin \u2014 may not be suitable." 
  },
];

export default function FAQs() {
  const faqJsonLdData = faqs.map(faq => ({
    question: faq.q,
    answer: faq.a
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Wellness Strips FAQ \u2013 Your Questions Answered | NEUVIE\u2122"
        description="How do NEUVIE\u2122 dissolving strips work? Ingredients, shipping, returns & more. Third-party tested, 14-day guarantee. Get answers now."
      />
      <FAQJsonLd faqs={faqJsonLdData} />
      
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide text-center">
            <motion.h1 
              className="font-body text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
              style={{ letterSpacing: '-0.02em' }}
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
              Everything you need to know about Neuvie strips. If you don't find your answer here, reach out \u2014 we're happy to help.
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
                Still have a question?
              </p>
              <a 
                href="/contact" 
                className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                Get in touch \u2192
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
