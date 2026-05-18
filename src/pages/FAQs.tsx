import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQJsonLd, PageMeta } from '@/components/seo';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';

const faqs = [
  { q: 'How do I take Neuvie strips?', a: 'Place one strip on your tongue and let it dissolve — usually within 30–60 seconds. No water needed. For best results, follow the specific instructions on each product.' },
  { q: 'What makes strips better than pills?', a: "Strips dissolve directly on your tongue, so the ingredients absorb faster than a pill that needs to break down in your stomach. They're also easier to take — no water, no swallowing large capsules, and they go wherever you go." },
  { q: 'Are your products third-party tested?', a: 'Yes. Every batch of Neuvie strips is independently tested by third-party labs for purity, potency, and safety. We believe in full transparency — what the label says is what you get.' },
  { q: "What if I'm not happy with my order?", a: "We offer a 14-day money-back guarantee on all orders. If it's not working for you, email us and we'll refund you — no questions asked." },
  { q: 'Are Neuvie strips vegan?', a: 'Most of our strips are vegan, made with plant-based ingredients like pullulan. Check the specific product page for detailed ingredient information and dietary notes.' },
  { q: 'How long until I notice a difference?', a: 'It depends on the product. Energy Strips work within minutes. For daily-use products like Hair, Skin & Nails or Sleep Strips, most people notice a difference within 2–4 weeks of consistent use.' },
  { q: 'Do you ship internationally?', a: 'We currently ship within the United States only. Free shipping on all orders over $50, with delivery in 3–5 business days. Sign up for our newsletter to know when we expand.' },
  { q: 'Can I take more than one product?', a: "Absolutely — our products are designed to complement each other. Many people combine Energy Strips in the morning with Sleep Strips at night. If you have specific health concerns, check with your healthcare provider." },
  { q: 'Are there any side effects?', a: 'Our strips are made with carefully selected ingredients, and side effects are rare. If you experience any adverse reactions, stop use and consult your healthcare provider. Always check ingredients if you have known allergies.' },
  { q: 'What makes Neuvie different?', a: "Three things: the format is easier to stick with than pills. The ingredients are dosed at levels that are studied to work. And every batch is independently tested — so you know exactly what you're getting." },
  { q: 'How should I store my strips?', a: 'Keep them in a cool, dry place away from direct sunlight. Seal the packaging when not in use to maintain freshness.' },
  { q: 'Are your strips safe during pregnancy or breastfeeding?', a: "We recommend talking to your healthcare provider before starting any supplement during pregnancy or breastfeeding. Some products — especially those with caffeine or melatonin — may not be suitable." },
];

export default function FAQs() {
  const faqJsonLdData = faqs.map(faq => ({ question: faq.q, answer: faq.a }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="FAQs – Dissolving Wellness Strips Questions | NEUVIE™"
        description="Answers about NEUVIE dissolving strips: ingredients, how they work, shipping, returns & more. Everything you need to feel confident."
      />
      <FAQJsonLd faqs={faqJsonLdData} />
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-wide text-center">
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
              style={{ letterSpacing: '-0.02em' }}
              animate={{ opacity: 1, y: 0 }}
            >
              Frequently Asked Questions About Our Wellness Strips
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              We want you to feel completely confident about our dissolving wellness strips. From ingredients to shipping — 
              find answers to common questions below, or{' '}
              <Link to="/contact" className="text-primary hover:underline">reach out to our team</Link> anytime.
            </motion.p>
          </div>
        </section>

        {/* FAQ Accordion */}
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
                    className="bg-card rounded-xl px-6 border border-border/30 shadow-soft data-[state=open]:shadow-card transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline hover:text-accent transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* SEO Content + Links */}
            <motion.div
              className="mt-16 bg-card rounded-2xl p-8 border border-border/30 shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-xl md:text-2xl mb-4 text-center">Learn More About NEUVIE Wellness Strips</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NEUVIE's fast-dissolving wellness strips use{' '}
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6390339/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  oral thin film technology
                </a>{' '}
                to deliver vitamins, minerals, and botanical extracts through the oral mucosa — offering up to 5× faster absorption 
                than traditional pills. Each of our <Link to="/shop" className="text-primary hover:underline">13 dissolving strip formulas</Link> is 
                clinically dosed with ingredients backed by{' '}
                <Link to="/science" className="text-primary hover:underline">peer-reviewed scientific research</Link>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                All products are manufactured in FDA-registered facilities in the USA, are non-GMO, and most are vegan and gluten-free. 
                Save up to 20% with our <Link to="/bundles" className="text-primary hover:underline">curated wellness bundles</Link>, 
                enjoy free shipping on orders over $50, and shop with confidence thanks to our{' '}
                <Link to="/returns" className="text-primary hover:underline">14-day money-back guarantee</Link>.
              </p>

              <div className="flex flex-col items-center gap-4">
                <SocialShareButtons 
                  url="https://tryneuvie.com/faqs" 
                  text="Got questions about dissolving wellness strips? NEUVIE has answers." 
                />
                <Link
                  to="/contact"
                  className="text-accent font-semibold hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Still have a question? Get in touch →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
