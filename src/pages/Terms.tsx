import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Terms of Service | NEUVIE™ Nutrition"
        description="Read NEUVIE™'s terms and conditions for using our website and purchasing our dissolving wellness strips. Updated 2025."
      />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container-wide text-center">
            <motion.h1 
              className="font-body text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
              style={{ letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 20 }}
            >
              TERMS OF SERVICE
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Please read these terms carefully before using our website or purchasing our products.
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

        {/* Terms Content */}
        <section className="py-20">
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using the NEUVIE website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">2. Products and Services</h2>
                <p className="text-muted-foreground mb-4">
                  NEUVIE offers dietary supplement oral strips. Our products are not intended to diagnose, treat, cure, or prevent any disease. Please consult with a healthcare professional before starting any supplement regimen.
                </p>
                <p className="text-muted-foreground">
                  We reserve the right to modify, discontinue, or update our products at any time without prior notice.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">3. Ordering and Payment</h2>
                <p className="text-muted-foreground mb-4">
                  When you place an order, you agree to provide accurate and complete information. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraudulent activity.
                </p>
                <p className="text-muted-foreground">
                  Payment must be made at the time of purchase. We accept major credit cards and other payment methods as displayed at checkout.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
                <p className="text-muted-foreground">
                  Shipping times are estimates and not guaranteed. NEUVIE is not responsible for delays caused by shipping carriers, customs, or other factors outside our control. Risk of loss passes to you upon delivery to the carrier.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
                <p className="text-muted-foreground">
                  We offer a 14-day money-back guarantee on all orders. Please see our Returns Policy for complete details on how to initiate a return and receive a refund.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on this website, including text, images, logos, and trademarks, is the property of NEUVIE and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  NEUVIE shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the amount paid for the products in question.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">8. Privacy</h2>
                <p className="text-muted-foreground">
                  Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the new terms.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8">
                <h2 className="font-body text-2xl font-semibold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@neuvie.com" className="text-primary hover:underline">
                    legal@neuvie.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}