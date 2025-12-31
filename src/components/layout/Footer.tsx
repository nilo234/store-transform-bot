import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import neuvieFooterLogo from '@/assets/neuvie-footer-logo.png';

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Performance & Energy', href: '/shop?category=performance' },
    { label: 'Beauty & Skin', href: '/shop?category=beauty' },
    { label: 'Sleep & Relax', href: '/shop?category=sleep' },
    { label: 'Immunity & Health', href: '/shop?category=immunity' },
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
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Join the Neuvie Community
            </h3>
            <p className="text-primary-foreground/70 mb-8 text-base">
              Get 15% off your first order plus exclusive access to new products and wellness tips.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Enter your email" 
                className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 rounded-lg flex-1"
              />
              <Button 
                type="submit"
                className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground px-6 font-semibold rounded-lg"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={neuvieFooterLogo} 
                alt="Neuvie Nutrition" 
                className="h-[3.75rem] md:h-[5.25rem] w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-primary-foreground/70 mb-8 max-w-sm text-sm leading-relaxed">
              Fast-dissolving oral strips with science-backed ingredients. The future of supplements—convenient, effective, and designed for your lifestyle.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Shop</h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {badge}
              </span>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="text-center text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Neuvie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
