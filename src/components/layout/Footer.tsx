import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import neuvieFooterLogo from '@/assets/neuvie-footer-logo.png';

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Performance & Energy', href: '/shop?goal=performance' },
    { label: 'Beauty & Skin', href: '/shop?goal=beauty' },
    { label: 'Sleep & Relax', href: '/shop?goal=relax' },
    { label: 'Immunity & Health', href: '/shop?goal=wellness' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Science', href: '/science' },
    { label: 'Journal', href: '/blog' },
    { label: 'Wellness Guides', href: '/guides' },
    { label: 'Take the Quiz', href: '/quiz' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Become Affiliated', href: 'https://af.uppromote.com/lovable-project-99js2/register', external: true },
  ],
  guides: [
    { label: 'Caffeine-Free Energy', href: '/caffeine-free-energy' },
    { label: 'Energy Without Stimulants', href: '/energy-without-stimulants' },
    { label: 'OTC Energy Supplements', href: '/otc-stimulants-for-energy' },
    { label: 'Caffeine Pill Alternatives', href: '/caffeine-pills-alternative' },
    { label: 'Natural Sleep Aid', href: '/natural-sleep-aid-without-melatonin' },
    { label: 'Magnesium for Sleep', href: '/magnesium-for-sleep-and-anxiety' },
    { label: 'Hangover Prevention', href: '/hangover-prevention-supplements' },
    { label: 'Gut Health Supplements', href: '/best-supplements-for-gut-health' },
    { label: 'Collagen for Skin', href: '/collagen-strips-for-skin' },
    { label: 'Methylene Blue Drops', href: '/methylene-blue-drops-benefits' },
    { label: 'Respiratory Drops', href: '/respiratory-drops' },
    { label: 'Vitamin Strips vs Pills', href: '/vitamin-strips-vs-pills' },
  ],
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 3.76.92V6.69Z" />
  </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.48 1.806 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2Z" />
  </svg>
);

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/tryneuvie/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/people/Neu-Vie/pfbid0Q1XZ9DgKm3jE2XeGypS3vdWDniuNWp1Vskuz5kJnCGrdRHALD6tcXBqDVVLs8sodl/', label: 'Facebook' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@tryneuvie', label: 'TikTok' },
  { icon: PinterestIcon, href: 'https://pin.it/3Guqd3sio', label: 'Pinterest' },
];

const trustBadges = [
  'Third-Party Tested',
  'Non-GMO',
  'Ethically Sourced',
  'Made in USA',
  'Fast-Dissolving',
  'FDA-Registered Facility',
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('klaviyo-subscribe', {
        body: { email, source: 'footer-newsletter' },
      });

      if (error) {
        console.error('Newsletter subscribe error:', error);
        toast.error('Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setEmail('');
      toast.success('Welcome to the Neuvie family!');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Newsletter error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide py-10 md:py-16 px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4" style={{ letterSpacing: '-0.02em' }}>
              You're Worth This
            </h3>
            <p className="text-primary-foreground/60 mb-6 md:mb-8 text-sm md:text-base font-body leading-relaxed">
              Get 15% off your first order — plus honest wellness insights and new launches. No spam, ever. Just us, showing up for you.
            </p>

            {isSuccess ? (
              <div className="flex items-center justify-center gap-2 text-accent font-semibold py-3">
                <Check className="h-5 w-5" />
                <span>You're in! Check your inbox for your welcome discount.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 md:h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-xl flex-1 font-body"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 md:h-12 bg-accent hover:bg-accent/90 text-accent-foreground px-6 font-display font-semibold rounded-xl w-full sm:w-auto shadow-glow"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Yes, I'm Worth It
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-10 md:py-16 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-4 md:mb-6">
              <img
                src={neuvieFooterLogo}
                alt="Neuvie Nutrition"
                className="h-20 md:h-[4.75rem] lg:h-[8.25rem] w-auto brightness-0 invert"
                width={300}
                height={120}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-primary-foreground/60 mb-6 md:mb-8 max-w-sm text-xs md:text-sm font-body leading-relaxed">
              30-second wellness strips for people who believe they're worth taking care of. Designed to fit your life — not the other way around.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-foreground/10 hover:bg-accent/30 hover:text-accent flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-base md:text-lg mb-4 md:mb-6">Shop</h4>
            <ul className="space-y-2.5 md:space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/60 hover:text-accent transition-colors text-xs md:text-sm font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-base md:text-lg mb-4 md:mb-6">Company</h4>
            <ul className="space-y-2.5 md:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/60 hover:text-accent transition-colors text-xs md:text-sm font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-base md:text-lg mb-4 md:mb-6">Support</h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5 md:gap-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-foreground/60 hover:text-accent transition-colors text-xs md:text-sm font-body"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-primary-foreground/60 hover:text-accent transition-colors text-xs md:text-sm font-body"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wellness Guides — internal-linking band for SEO authority transfer */}
        <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-primary-foreground/10">
          <h4 className="font-display text-base md:text-lg mb-4 md:mb-5 text-center md:text-left">Wellness Guides</h4>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2.5">
            {footerLinks.guides.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-primary-foreground/60 hover:text-accent transition-colors text-xs md:text-sm font-body"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4 mb-6 md:mb-8">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm text-primary-foreground/60 font-body">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent" />
                {badge}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-primary-foreground/40 text-[10px] mb-2 my-[20px] md:text-xs font-body">
            These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Every Neuvie strip is manufactured in an FDA-registered, GMP-compliant facility in the United States.
          </p>
          <p className="text-center text-primary-foreground/40 text-[10px] md:text-xs mb-2 font-body">
            All prices in USD. We currently ship within the United States only.
          </p>
          <p className="text-center text-primary-foreground/40 text-[10px] md:text-sm font-body">
            © {new Date().getFullYear()} Neuvie Nutrition, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
