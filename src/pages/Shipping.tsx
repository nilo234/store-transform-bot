import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Truck, Clock, Globe, Package, MapPin, ShieldCheck, Mail, AlertTriangle } from 'lucide-react';
import { PageMeta } from '@/components/seo';

const policySections = [
  { icon: Clock, title: 'Processing Time', content: ['Orders placed before 2 PM ET on business days are typically processed the same day. Orders placed after 2 PM ET, or on weekends and holidays, are processed the next business day.', "You'll receive a confirmation email as soon as your order is placed, and a second email with tracking details once it ships."] },
  { icon: Truck, title: 'Shipping Methods & Delivery Times', content: ['Standard Shipping — 3–5 business days, $4.99 flat rate.', 'Express Shipping — 1–3 business days, $9.99 flat rate.', "All delivery estimates begin once the order has shipped, not when it's placed. Delivery times are estimates, not guarantees, and may vary due to carrier volume or weather."] },
  { icon: Package, title: 'Free Shipping', content: ['Orders of $50 or more ship free via standard shipping within the contiguous United States. No code needed — the discount applies automatically at checkout.', 'Free shipping is not available for express delivery, PO boxes outside the contiguous US, or international orders.'] },
  { icon: MapPin, title: 'Address Accuracy', content: ["Please double-check your shipping address before completing checkout. Once an order ships, we're unable to redirect it to a different address.", "If a package is returned to us due to an incorrect or incomplete address, we'll reship it at no extra charge — just reach out to our support team."] },
  { icon: ShieldCheck, title: 'Tracking Your Order', content: ["Every order includes tracking. Once your package ships, you'll receive an email with a tracking number and a direct link to follow your delivery in real time.", "Tracking information can take up to 24 hours to update after your shipping confirmation email. If tracking hasn't updated after 48 hours, please contact us."] },
  { icon: AlertTriangle, title: 'Lost or Damaged Packages', content: ["If your package arrives damaged, please take a photo and email us at hello@neuvie.com within 7 days of delivery. We'll send a replacement or issue a full refund — your choice.", "If tracking shows \"delivered\" but you haven't received your order, please check with neighbors and your building's mail area first. If it's still missing after 48 hours, contact us and we'll work with the carrier to resolve it."] },
  { icon: Globe, title: 'International Shipping', content: ["We currently ship within the United States only. We're exploring international shipping options and will announce availability through our newsletter.", 'Sign up for updates at the bottom of any page to be notified when we expand to new markets.'] },
  { icon: Mail, title: "Questions? We're Here.", content: ['If you have any questions about your order or shipping, reach us at hello@neuvie.com. Our team responds within 1 business day, Monday through Friday.'] },
];

export default function Shipping() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Shipping That Respects Your Time – NEUVIE™"
        description="Free US shipping on orders $50+. Ships within 1 business day. Because your self-care shouldn't wait."
      />
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
              Shipping Policy
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              We want your strips to reach you as quickly and smoothly as possible. Here's everything you need to know — no fine print, no surprises.
            </motion.p>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-16 md:py-20">
          <div className="container-wide max-w-3xl space-y-6">
            {policySections.map((section, index) => (
              <motion.div
                key={section.title}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-display text-lg md:text-xl text-foreground">{section.title}</h2>
                    {section.content.map((paragraph, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed text-sm md:text-base">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* At a Glance */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-wide max-w-2xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>At a Glance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { text: 'Free US shipping on orders $50+', icon: Truck },
                  { text: 'Ships within 1–2 business days', icon: Clock },
                  { text: 'Tracking included with every order', icon: ShieldCheck },
                  { text: '14-day money-back guarantee', icon: Package },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 bg-card rounded-xl p-4 text-left border border-border/30">
                    <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground pt-4">
                Questions? Reach us at{' '}
                <a href="mailto:hello@neuvie.com" className="text-accent hover:underline">hello@neuvie.com</a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
