import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RotateCcw, Shield, Check, Mail } from 'lucide-react';
import { PageMeta } from '@/components/seo';

export default function Returns() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Feel Sure About Your Choice – Returns | NEUVIE™"
        description="14-day guarantee on all NEUVIE™ orders. If it's not right for you, we'll make it right. No questions, no hassle."
      />
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
              RETURNS & REFUNDS
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              We want you to feel completely confident in your choice. That's why every order is backed by our guarantee.
            </motion.p>
          </div>
        </section>

        {/* 14-Day Guarantee Hero */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-10 w-10" />
              </div>
              <h2 className="font-body text-3xl md:text-4xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
                14-Day Money-Back Guarantee
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl text-lg">
                Not satisfied with your purchase? No problem. We offer a full refund within 14 days of purchase—no questions asked.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Return Policy Details */}
        <section className="py-20">
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="font-body text-2xl md:text-3xl font-semibold text-center mb-12" style={{ letterSpacing: '-0.02em' }}>
                How Returns Work
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4 items-start bg-card rounded-xl p-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Contact Us</h4>
                    <p className="text-muted-foreground">Email hello@neuvie.com with your order number and reason for return. We'll respond within 24 hours.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-card rounded-xl p-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Receive Instructions</h4>
                    <p className="text-muted-foreground">We'll provide you with a return shipping label and instructions for sending back your order.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-card rounded-xl p-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Get Your Refund</h4>
                    <p className="text-muted-foreground">Once we receive your return, we'll process your refund within 5-7 business days to your original payment method.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Policy Details */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-body text-2xl md:text-3xl font-semibold text-center mb-8" style={{ letterSpacing: '-0.02em' }}>
                Policy Details
              </h2>
              <div className="space-y-4">
                {[
                  'Returns accepted within 14 days of purchase',
                  'Products must be in original packaging',
                  'Opened products are still eligible for return',
                  'Free return shipping for domestic orders',
                  'Refunds processed within 5-7 business days',
                  'Original shipping costs are non-refundable',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-card p-4 rounded-xl">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}