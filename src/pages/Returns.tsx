import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, Check } from 'lucide-react';
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
        {/* Hero */}
        <section className="py-20 md:py-28" style={{ background: 'var(--gradient-hero)' }}>
          <div className="container-wide text-center">
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
              style={{ letterSpacing: '-0.02em' }}
              animate={{ opacity: 1, y: 0 }}
            >
              Returns & Refunds
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

        {/* 14-Day Guarantee */}
        <section className="py-16 bg-accent text-accent-foreground">
          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-accent-foreground/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-10 w-10" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ letterSpacing: '-0.02em' }}>
                You Should Feel Sure
              </h2>
              <p className="text-accent-foreground/80 max-w-2xl text-lg">
                We believe taking care of yourself should feel good from the very first moment — including the moment you decide to try. If it's not right for you, we'll make it right. Full refund within 14 days. No questions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How Returns Work */}
        <section className="py-20">
          <div className="container-wide max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
              <h2 className="font-display text-2xl md:text-3xl text-center mb-12" style={{ letterSpacing: '-0.02em' }}>
                How Returns Work
              </h2>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Contact Us', desc: "Email team@tryneuvie.com with your order number and reason for return. We'll respond within 24 hours." },
                  { step: '2', title: 'Receive Instructions', desc: "We'll provide you with a return shipping label and instructions for sending back your order." },
                  { step: '3', title: 'Get Your Refund', desc: "Once we receive your return, we'll process your refund within 5-7 business days to your original payment method." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start bg-card rounded-xl p-6 border border-border/30 shadow-soft">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-accent">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-display text-lg mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Policy Details */}
        <section className="py-20 bg-secondary/30">
          <div className="container-wide max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="font-display text-2xl md:text-3xl text-center mb-8" style={{ letterSpacing: '-0.02em' }}>
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
                  <div key={item} className="flex items-center gap-3 bg-card p-4 rounded-xl border border-border/30">
                    <Check className="h-5 w-5 text-accent flex-shrink-0" />
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
