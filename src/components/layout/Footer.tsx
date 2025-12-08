import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

const trustBadges = [
  'Third-Party Tested',
  'Non-GMO',
  'Ethically Sourced',
  'Made in USA',
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide py-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Join the Neuvie Family
            </h3>
            <p className="text-primary-foreground/70 mb-6">
              Get 15% off your first order and stay updated on new products and wellness tips.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-3xl font-bold">Neuvie</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Premium supplements crafted with science-backed ingredients to help you feel your best, naturally.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {badge}
              </span>
            ))}
          </div>
          <p className="text-center text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Neuvie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}