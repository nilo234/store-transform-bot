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
    question: 'How do Neuvie Strips work?',
    answer: 'Simply place a strip on or under your tongue and let it dissolve in about 30 seconds. The active ingredients are absorbed directly through the oral mucosa, bypassing the digestive system for faster, more efficient absorption.',
  },
  {
    question: 'Are Neuvie Strips safe?',
    answer: 'Absolutely. All our strips are made with premium, non-GMO ingredients in a cGMP-certified facility in the USA. Every batch is third-party tested for purity and potency. No artificial colors, preservatives, or harmful additives.',
  },
  {
    question: 'How fast do they work?',
    answer: 'Because strips dissolve directly in your mouth, ingredients can enter your bloodstream faster than traditional pills or capsules. Most people notice effects within 15-30 minutes, depending on the product.',
  },
  {
    question: 'What is your guarantee?',
    answer: "We offer a 14-Day Money-Back Guarantee. If you're not completely satisfied with your results, simply email us and we'll refund your first order—no questions asked, no hoops to jump through.",
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship to the United States only. We offer free shipping on all orders over $50. Orders typically arrive within 3-5 business days.',
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
          <h2 className="font-body text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Got questions? We've got answers.
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
            View All FAQs →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
