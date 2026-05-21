import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';
import { SocialShareButtons } from '@/components/seo/SocialShareButtons';

const termsSections = [
  { title: '1. Acceptance of Terms', content: 'By accessing or using the NEUVIE website and purchasing our dissolving wellness strips, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.' },
  { title: '2. Products and Services', content: 'NEUVIE offers fast-dissolving dietary supplement oral strips. Our wellness strips are not intended to diagnose, treat, cure, or prevent any disease. Please consult with a healthcare professional before starting any supplement regimen.\n\nWe reserve the right to modify, discontinue, or update our products at any time without prior notice.' },
  { title: '3. Ordering and Payment', content: 'When you place an order for NEUVIE wellness strips, you agree to provide accurate and complete information. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraudulent activity.\n\nPayment must be made at the time of purchase. We accept major credit cards and other payment methods as displayed at checkout.' },
  { title: '4. Shipping and Delivery', content: "Shipping times are estimates and not guaranteed. NEUVIE is not responsible for delays caused by shipping carriers, customs, or other factors outside our control. Risk of loss passes to you upon delivery to the carrier." },
  { title: '5. Returns and Refunds', content: 'We offer a 30-day money-back guarantee on all wellness strip orders. Please see our Returns Policy for complete details on how to initiate a return and receive a refund.' },
  { title: '6. Intellectual Property', content: 'All content on this website, including text, images, logos, and trademarks, is the property of NEUVIE and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.' },
  { title: '7. Limitation of Liability', content: 'NEUVIE shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our wellness strips or services. Our total liability shall not exceed the amount paid for the products in question.' },
  { title: '8. Privacy', content: 'Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.' },
  { title: '9. Changes to Terms', content: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the new terms.' },
  { title: '10. Contact Information', content: 'If you have any questions about these Terms of Service, please contact us at legal@neuvie.com', email: 'legal@neuvie.com' },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Terms of Service | NEUVIE™ Wellness Strips"
        description="NEUVIE terms and conditions for using our website and purchasing dissolving wellness strips. Updated January 2025."
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
              Terms of Service
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Please read these terms carefully before using our website or purchasing NEUVIE dissolving wellness strips.
            </motion.p>
            <motion.p
              className="text-sm text-muted-foreground mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Last updated: January 2025
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container-wide max-w-3xl space-y-8">
            {termsSections.map((section, index) => (
              <motion.div
                key={section.title}
                className="bg-card rounded-2xl p-8 border border-border/30 shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <h2 className="font-display text-xl md:text-2xl mb-4">{section.title}</h2>
                {section.email ? (
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms of Service, please contact us at{' '}
                    <a href={`mailto:${section.email}`} className="text-accent hover:underline">{section.email}</a>
                  </p>
                ) : (
                  section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-muted-foreground mb-4 last:mb-0">{para}</p>
                  ))
                )}
              </motion.div>
            ))}

            {/* Links + Social */}
            <motion.div
              className="text-center pt-4 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-muted-foreground">
                See also our{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>,{' '}
                <Link to="/returns" className="text-primary hover:underline">Returns & Refund Policy</Link>, and{' '}
                <Link to="/shipping" className="text-primary hover:underline">Shipping Information</Link>. 
                Browse our{' '}
                <Link to="/shop" className="text-primary hover:underline">full collection of dissolving wellness strips</Link>.
              </p>
              <SocialShareButtons 
                url="https://tryneuvie.com/terms" 
                text="NEUVIE's terms of service for dissolving wellness strips." 
                className="justify-center"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
