import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQsProps {
  productHandle?: string;
  customFaqs?: FAQ[];
}

const defaultFaqs: FAQ[] = [
  {
    question: "When should I take my strip?",
    answer: "Most people take theirs in the morning to start the day right. But there's no wrong time — whenever fits your routine. Just place it on your tongue and let it dissolve."
  },
  {
    question: "Will I actually feel a difference?",
    answer: "Most customers notice something within the first few weeks of daily use.* These strips are designed for consistency — the longer you stick with it, the more you'll feel. Give it at least 30 days."
  },
  {
    question: "Why strips instead of pills or powders?",
    answer: "Strips dissolve in seconds, taste good, and don't need water. They're small enough to keep anywhere — your desk, your bag, your nightstand. It's the format that actually gets used."
  },
  {
    question: "Is it safe to take every day?",
    answer: "Yes — every Neuvie strip is designed for daily use. Made in the USA in a GMP-certified facility. If you have a medical condition or take medication, check with your doctor first.*"
  },
  {
    question: "What do they taste like?",
    answer: "Good. Really good. Each product has its own natural flavor — no bitterness, no chalky aftertaste. We use natural sweeteners to make this something you look forward to, not dread."
  },
  {
    question: "Are they independently tested?",
    answer: "Every single batch is third-party tested for purity, potency, and safety. We don't skip steps. All products are manufactured in FDA-registered, cGMP-certified facilities in the USA."
  },
  {
    question: "What if it\u2019s not for me?",
    answer: "No hard feelings. We offer a 14-day money-back guarantee on your first order. Just email hello@neuvie.com and we'll take care of it — no hoops, no hassle."
  },
  {
    question: "Are these vegan and allergen-friendly?",
    answer: "Most of our strips are vegan, gluten-free, and non-GMO. Check the specific product page for full allergen details. We never use artificial colors, gelatin, or unnecessary fillers."
  }
];

const productSpecificFaqs: Record<string, FAQ[]> = {
  mushroom: [
    {
      question: "Are these made with real mushrooms?",
      answer: "Yes \u2014 real functional mushroom extracts including Lion\u2019s Mane, Cordyceps, Maitake, and Shiitake. Each one is carefully sourced and extracted for potency."
    },
    ...defaultFaqs.slice(0, 5)
  ],
  sleep: [
    {
      question: "Will I feel groggy the next morning?",
      answer: "No. The formula supports restful sleep without next-day heaviness. Take it about 30 minutes before bed for the best results."
    },
    ...defaultFaqs.slice(0, 5)
  ],
  energy: [
    {
      question: "Will this give me jitters like coffee?",
      answer: "Not at all. The energy comes from B-vitamins and natural ingredients that support steady, sustained energy \u2014 no spikes, no crashes."
    },
    ...defaultFaqs.slice(0, 5)
  ]
};

export const ProductFAQs = ({ productHandle, customFaqs }: ProductFAQsProps) => {
  const faqs = customFaqs || productSpecificFaqs[productHandle || ''] || defaultFaqs;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-body text-2xl md:text-3xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
              Questions? We\u2019ve got you.
            </h2>
            <p className="text-muted-foreground">
              Still curious? Email us anytime at{' '}
              <a href="mailto:hello@neuvie.com" className="text-primary hover:underline">
                hello@neuvie.com
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`} 
                  className="bg-card rounded-xl border-none px-6"
                >
                  <AccordionTrigger className="py-4 hover:no-underline text-left">
                    <span className="font-medium text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
