import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Privacy Policy | NEUVIE™ Nutrition"
        description="Read NEUVIE™'s privacy policy. Learn how we collect, use, and protect your personal information when you shop our wellness strips."
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
              PRIVACY POLICY
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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

        {/* Policy Content */}
        <section className="py-20">
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-8">
                <div className="bg-card rounded-xl p-8">
                  <h2 className="font-body text-2xl font-semibold mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">We collect information you provide directly to us, such as:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Name and contact information when you create an account or place an order</li>
                    <li>Payment information to process transactions (securely processed by our payment providers)</li>
                    <li>Shipping address for order fulfillment</li>
                    <li>Communications when you contact our support team</li>
                    <li>Email address when you subscribe to our newsletter</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-8">
                  <h2 className="font-body text-2xl font-semibold mb-4">How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Respond to your questions and provide customer support</li>
                    <li>Send promotional emails (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-8">
                  <h2 className="font-body text-2xl font-semibold mb-4">Information Sharing</h2>
                  <p className="text-muted-foreground">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, and fulfilling orders. These providers are contractually obligated to keep your information confidential.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8">
                  <h2 className="font-body text-2xl font-semibold mb-4">Data Security</h2>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8">
                  <h2 className="font-body text-2xl font-semibold mb-4">Cookies</h2>
                  <p className="text-muted-foreground">
                    We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings. Disabling cookies may affect certain features of our website.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8">
                  <h2 className="font-body text-2xl font-semibold mb-4">Your Rights</h2>
                  <p className="text-muted-foreground mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Access and request a copy of your personal data</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Opt out of marketing communications at any time</li>
                    <li>Lodge a complaint with a supervisory authority</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-8">
                  <h2 className="font-body text-2xl font-semibold mb-4">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at{' '}
                    <a href="mailto:privacy@neuvie.com" className="text-primary hover:underline">
                      privacy@neuvie.com
                    </a>
                  </p>
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