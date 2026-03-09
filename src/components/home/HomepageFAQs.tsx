import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do Neuvie strips work?',
    answer: 'Place a strip on your tongue and let it dissolve — about 30 seconds. The ingredients absorb directly through the oral tissue, so they get to work faster than a pill that has to travel through your digestive system first.',
  },
  {
    question: 'Are they safe?',
    answer: 'Yes. Every Neuvie strip is made with non-GMO ingredients in a GMP-certified facility in the USA. Every batch is independently tested by a third-party lab for purity and potency. No artificial colors, no preservatives, no fillers.',
  },
  {
    question: 'How fast do they work?',
    answer: 'Because the strip dissolves in your mouth, ingredients enter your system faster than traditional pills. Most people notice effects within 15–30 minutes, depending on the product. Energy Strips work within minutes.',
  },
  {
    question: "What if I don't like them?",
    answer: "We offer a 14-day money-back guarantee. If you're not happy with your order, email us and we'll refund you — no questions asked, no hoops to jump through.",
  },
  {
    question: 'Do you ship outside the US?',
    answer: 'Not yet — we currently ship within the United States only. Free shipping on all orders over $50. Sign up for our newsletter to be the first to know when we expand.',
  },
];

export function HomepageFAQs() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container-wide">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
            Questions? Good.
          </h2>
          <p className="text-muted-foreground">
            Here are the ones we hear most.
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
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
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
          <Link to="/faqs" className="text-primary hover:text-accent transition-colors font-medium">
            See all FAQs →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
