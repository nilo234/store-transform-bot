import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMeta } from '@/components/seo';

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly to us, such as:', list: ['Name and contact information when you create an account or place an order', 'Payment information to process transactions (securely processed by our payment providers)', 'Shipping address for order fulfillment', 'Communications when you contact our support team', 'Email address when you subscribe to our newsletter'] },
  { title: 'How We Use Your Information', content: 'We use the information we collect to:', list: ['Process and fulfill your orders', 'Send order confirmations and shipping updates', 'Respond to your questions and provide customer support', 'Send promotional emails (with your consent)', 'Improve our website and services', 'Comply with legal obligations'] },
  { title: 'Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, and fulfilling orders. These providers are contractually obligated to keep your information confidential.' },
  { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.' },
  { title: 'Cookies', content: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings. Disabling cookies may affect certain features of our website.' },
  { title: 'Your Rights', content: 'You have the right to:', list: ['Access and request a copy of your personal data', 'Request correction of inaccurate information', 'Request deletion of your personal data', 'Opt out of marketing communications at any time', 'Lodge a complaint with a supervisory authority'] },
  { title: 'Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at privacy@neuvie.com', email: 'privacy@neuvie.com' },
];

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Privacy Policy | NEUVIE™"
        description="How NEUVIE™ collects, uses, and protects your personal information. Read our privacy policy."
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
              Privacy Policy
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

        {/* Content */}
        <section className="py-20">
          <div className="container-wide max-w-3xl space-y-8">
            {sections.map((section, index) => (
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
                    If you have any questions about this Privacy Policy, please contact us at{' '}
                    <a href={`mailto:${section.email}`} className="text-accent hover:underline">{section.email}</a>
                  </p>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-4">{section.content}</p>
                    {section.list && (
                      <ul className="space-y-2">
                        {section.list.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
