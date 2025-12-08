import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How should I take the gummies?', a: 'Take 2 gummies daily with or without food. Consistency is key for best results.' },
  { q: 'Are your products third-party tested?', a: 'Yes! All Neuvie products are third-party tested for purity, potency, and safety.' },
  { q: 'Do you offer a money-back guarantee?', a: 'Absolutely. We offer a 60-day money-back guarantee on all orders.' },
  { q: 'Are the gummies vegan?', a: 'Our gummies are made with pectin and are suitable for vegetarians. Check each product for specific details.' },
  { q: 'How long until I see results?', a: 'Most customers notice benefits within 2-4 weeks of consistent use.' },
];

export default function FAQs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container-wide max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-xl px-6 border-none shadow-soft">
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}