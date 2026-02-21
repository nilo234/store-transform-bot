import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Truck, Clock, Globe, Package } from 'lucide-react';

const shippingInfo = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Enjoy free standard shipping on all orders over $50. No code needed—discount applies automatically at checkout.',
  },
  {
    icon: Clock,
    title: 'Processing Time',
    description: 'Orders are processed within 1-2 business days. You\'ll receive a confirmation email with tracking information once your order ships.',
  },
  {
    icon: Globe,
    title: 'International Shipping',
    description: 'We ship to select international destinations. Shipping costs and delivery times vary by location. Enter your address at checkout for details.',
  },
  {
    icon: Package,
    title: 'Delivery Times',
    description: 'Standard shipping: 3-7 business days. Express shipping: 1-3 business days. International orders may take 7-14 business days.',
  },
];

export default function Shipping() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
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
              SHIPPING INFORMATION
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Fast, reliable shipping to get your wellness strips to you quickly.
            </motion.p>
          </div>
        </section>

        {/* Shipping Info Cards */}
        <section className="py-20">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {shippingInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="bg-card rounded-2xl p-8 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <info.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{info.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
                Shipping FAQs
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <div className="bg-card rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-2">Can I track my order?</h4>
                  <p>Yes! Once your order ships, you'll receive an email with a tracking number and link to monitor your delivery.</p>
                </div>
                <div className="bg-card rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-2">What if my package is lost or damaged?</h4>
                  <p>Contact our support team immediately. We'll work with the carrier to resolve the issue and ensure you receive your order.</p>
                </div>
                <div className="bg-card rounded-xl p-6">
                  <h4 className="font-semibold text-foreground mb-2">Do you ship to PO boxes?</h4>
                  <p>Yes, we can ship to PO boxes via standard shipping. Express shipping requires a physical address.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}