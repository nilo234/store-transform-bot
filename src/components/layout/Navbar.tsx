import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/science', label: 'Science' },
  { href: '/about', label: 'About' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());
  const setCartOpen = useCartStore((state) => state.setOpen);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/50">
        {/* Announcement Bar */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
          <span>FREE SHIPPING ON ORDERS OVER $50 • </span>
          <span className="text-accent font-bold">60-DAY MONEY-BACK GUARANTEE</span>
        </div>

        {/* Main Navigation */}
        <nav className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
                Neuvie
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-2",
                    location.pathname === link.href 
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                      : "text-foreground/70"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>

              {/* Account */}
              <Link to="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b">
                      <span className="font-display text-2xl font-bold text-primary">Neuvie</span>
                      <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                        <X className="h-6 w-6" />
                      </Button>
                    </div>
                    <nav className="flex-1 p-6">
                      <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                              "text-lg font-medium py-3 border-b border-border/50 transition-colors",
                              location.pathname === link.href ? "text-primary" : "text-foreground/70"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </nav>
                    <div className="p-6 border-t">
                      <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full btn-primary">
                          Shop Now →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}