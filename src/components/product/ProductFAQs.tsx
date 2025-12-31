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
    question: "When is the best time to take these strips?",
    answer: "We recommend taking your strip in the morning to start your day right. But you can enjoy them whenever works best for your routine — morning, afternoon, or as directed on the product. Simply place on your tongue and let dissolve."
  },
  {
    question: "Will I actually feel a difference?",
    answer: "Many customers report feeling noticeable benefits within the first few weeks of daily use.* These strips are designed for long-term wellness — consistency is key! For best results, take daily for at least 30 days."
  },
  {
    question: "Why are strips better than pills or powders?",
    answer: "Strips dissolve in seconds, taste great, and require no water. They're portable, mess-free, and designed for optimal absorption. Unlike pills that can be hard to swallow or powders that taste bitter, Neuvie Strips make supplementation something you'll actually look forward to."
  },
  {
    question: "Are these safe to take every day?",
    answer: "Yes — Neuvie Strips are crafted for daily use as part of a healthy lifestyle. Made in the USA with premium ingredients. If you have any medical conditions or are on medication, we recommend checking with your healthcare provider first.*"
  },
  {
    question: "What do they taste like?",
    answer: "Each product has a delicious, natural flavor — no bitterness, no weird aftertaste. We use natural flavoring and sweeteners to make your daily supplement routine enjoyable."
  },
  {
    question: "Are these lab tested?",
    answer: "Yes! Every batch is third-party tested for purity, potency, and safety. We believe in complete transparency. All our products are manufactured in cGMP-certified facilities in the USA."
  },
  {
    question: "What is your return policy?",
    answer: "We stand behind our products with a 14-day money-back guarantee. If you're not completely satisfied, simply contact us at hello@neuvie.com and we'll make it right — no hassle."
  },
  {
    question: "Are these vegan and allergen-free?",
    answer: "Most of our products are vegan, gluten-free, and non-GMO. Check the specific product details for allergen information. We never use artificial colors, gelatin, or unnecessary fillers."
  }
];

const productSpecificFaqs: Record<string, FAQ[]> = {
  mushroom: [
    {
      question: "Are these made with real mushrooms?",
      answer: "Yes! We use real functional mushroom extracts including Lion's Mane, Cordyceps, Maitake, and Shiitake. Each mushroom is carefully sourced and extracted for maximum potency and bioavailability."
    },
    ...defaultFaqs.slice(0, 5)
  ],
  sleep: [
    {
      question: "Will this make me groggy in the morning?",
      answer: "No! Our sleep formula is designed to support restful sleep without next-day grogginess. Take 30 minutes before bed for best results."
    },
    ...defaultFaqs.slice(0, 5)
  ],
  energy: [
    {
      question: "Will this give me jitters like coffee?",
      answer: "No! Our energy formula uses B-vitamins and natural ingredients that support sustained energy without the jitters or crash associated with caffeine."
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
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Have questions? We've got answers. Still need help? Email us at{' '}
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
