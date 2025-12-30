import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';
import neuvieLogo from '@/assets/neuvie-logo.png';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/science', label: 'Science' },
  { href: '/about', label: 'About' },
  { href: '/faqs', label: 'FAQ' },
  { href: '/contact', label: 'Contact Us' },
];

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1">
      <span className="bg-background text-foreground px-2 py-0.5 text-sm font-bold border border-foreground">
        {formatNumber(timeLeft.hours)} HRS
      </span>
      <span className="text-primary-foreground">:</span>
      <span className="bg-background text-foreground px-2 py-0.5 text-sm font-bold border border-foreground">
        {formatNumber(timeLeft.minutes)} MIN
      </span>
      <span className="text-primary-foreground">:</span>
      <span className="bg-background text-foreground px-2 py-0.5 text-sm font-bold border border-foreground">
        {formatNumber(timeLeft.seconds)} SEC
      </span>
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());
  const setCartOpen = useCartStore((state) => state.setOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Announcement Bar */}
        <div className="bg-primary text-primary-foreground py-2.5">
          <div className="container-wide flex items-center justify-center gap-4 flex-wrap">
            <span className="font-semibold text-sm tracking-wide">
              HOLIDAY SALE: UP TO{' '}
              <span className="font-bold underline">45% OFF</span>
            </span>
            <CountdownTimer />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className={cn(
          "bg-background transition-all duration-300 border-b border-foreground",
          scrolled && "shadow-soft"
        )}>
          <div className="container-wide">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img 
                  src={neuvieLogo} 
                  alt="Neuvie Nutrition" 
                  className="h-12 md:h-14 w-auto"
                />
              </Link>

              {/* Desktop Navigation - Centered */}
              <div className="hidden lg:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-all hover:opacity-60 relative py-2 uppercase tracking-wide",
                      location.pathname === link.href 
                        ? "text-foreground" 
                        : "text-foreground"
                    )}
                  >
                    {link.label}
                    {location.pathname === link.href && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-1 md:gap-3">
                {/* Search */}
                <Button variant="ghost" size="icon" className="hidden md:flex h-10 w-10 hover:bg-transparent hover:opacity-60">
                  <Search className="h-5 w-5" />
                </Button>

                {/* Account */}
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-transparent hover:opacity-60">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Cart */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative h-10 w-10 hover:bg-transparent hover:opacity-60"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-foreground text-background text-xs font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>

                {/* Mobile Menu Toggle */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-transparent hover:opacity-60">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-background border-l border-foreground">
                    <div className="flex flex-col h-full">
                      {/* Mobile Header */}
                      <div className="flex items-center justify-between p-6 border-b border-foreground">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                          <img 
                            src={neuvieLogo} 
                            alt="Neuvie Nutrition" 
                            className="h-10 w-auto"
                          />
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="hover:bg-transparent hover:opacity-60">
                          <X className="h-6 w-6" />
                        </Button>
                      </div>

                      {/* Mobile Navigation Links */}
                      <nav className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-1">
                          <Link
                            to="/"
                            className={cn(
                              "block py-4 text-lg font-medium border-b border-foreground/20 transition-colors uppercase tracking-wide",
                              location.pathname === "/" ? "text-foreground" : "text-foreground"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Home
                          </Link>
                          {navLinks.map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              className={cn(
                                "block py-4 text-lg font-medium border-b border-foreground/20 transition-colors uppercase tracking-wide",
                                location.pathname === link.href ? "text-foreground" : "text-foreground"
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </nav>

                      {/* Mobile CTA */}
                      <div className="p-6 border-t border-foreground">
                        <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full bg-primary text-primary-foreground h-14 text-lg font-semibold border border-foreground">
                            Shop Now →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
