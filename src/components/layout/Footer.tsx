import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
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
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide py-10 md:py-16 px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-body text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4" style={{ letterSpacing: '-0.02em' }}>
              You're worth this. Let's get started.
            </h3>
            <p className="text-primary-foreground/70 mb-6 md:mb-8 text-sm md:text-base">
              Get 15% off your first order — plus honest wellness insights and new launches. No spam, ever. Just us, showing up for you.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Your email address" 
                className="h-11 md:h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-lg flex-1"
              />
              <Button 
                type="submit"
                className="h-11 md:h-12 bg-accent hover:bg-accent/90 text-accent-foreground px-6 font-semibold rounded-lg w-full sm:w-auto"
              >
                Yes, I'm Worth It
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
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
                className="h-20 md:h-[3.75rem] lg:h-[5.25rem] w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-primary-foreground/70 mb-6 md:mb-8 max-w-sm text-xs md:text-sm leading-relaxed">
              30-second wellness strips for people who believe they're worth taking care of. Designed to fit your life — not the other way around.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-sm md:text-lg mb-4 md:mb-6">Shop</h4>
            <ul className="space-y-2.5 md:space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-sm md:text-lg mb-4 md:mb-6">Company</h4>
            <ul className="space-y-2.5 md:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-sm md:text-lg mb-4 md:mb-6">Support</h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5 md:gap-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4 mb-6 md:mb-8">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm text-primary-foreground/70">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent" />
                {badge}
              </span>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="text-center text-primary-foreground/50 text-[10px] md:text-xs mb-2">
            These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Every Neuvie strip is manufactured in an FDA-registered, GMP-compliant facility in the United States.
          </p>
          <p className="text-center text-primary-foreground/50 text-[10px] md:text-xs mb-2">
            All prices in USD. We currently ship within the United States only.
          </p>
          <p className="text-center text-primary-foreground/50 text-[10px] md:text-sm">
            © {new Date().getFullYear()} Neuvie Nutrition, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
