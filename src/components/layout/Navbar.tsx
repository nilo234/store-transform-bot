import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/search/SearchModal';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import neuvieLogo from '@/assets/neuvie-navbar-logo.png';
const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/bundles', label: 'Bundles' },
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
    <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-sm">
      <span className="bg-background text-foreground px-1.5 md:px-2 py-0.5 rounded font-bold">
        {formatNumber(timeLeft.hours)}
        <span className="hidden md:inline"> HRS</span>
      </span>
      <span className="text-primary-foreground">:</span>
      <span className="bg-background text-foreground px-1.5 md:px-2 py-0.5 rounded font-bold">
        {formatNumber(timeLeft.minutes)}
        <span className="hidden md:inline"> MIN</span>
      </span>
      <span className="text-primary-foreground">:</span>
      <span className="bg-background text-foreground px-1.5 md:px-2 py-0.5 rounded font-bold">
        {formatNumber(timeLeft.seconds)}
        <span className="hidden md:inline"> SEC</span>
      </span>
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
        {/* Announcement Bar - Mobile optimized */}
        <div className="bg-primary text-primary-foreground py-2 md:py-2.5">
          <div className="container-wide flex items-center justify-center gap-2 md:gap-4 flex-wrap px-3 md:px-6">
            <span className="font-semibold text-xs md:text-sm tracking-wide">
              SALE: UP TO{' '}
              <span className="text-accent font-bold">45% OFF</span>
            </span>
            <CountdownTimer />
          </div>
        </div>

        {/* Main Navigation - Mobile optimized */}
        <nav className={cn(
          "bg-background transition-all duration-300",
          scrolled ? "shadow-md" : "border-b border-border/30"
        )}>
          <div className="container-wide px-3 md:px-6">
            <div className="flex items-center justify-between h-14 md:h-20">
              {/* Logo - Responsive sizing */}
              <Link to="/" className="flex items-center">
                <img 
                  src={neuvieLogo} 
                  alt="Neuvie Nutrition" 
                  className="h-20 md:h-[3.75rem] lg:h-[5.25rem] w-auto"
                />
              </Link>

              {/* Desktop Navigation - Centered */}
              <div className="hidden lg:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary relative py-2",
                      location.pathname === link.href 
                        ? "text-primary" 
                        : "text-foreground/80"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-1 md:gap-3">
                {/* Search */}
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>

                {/* Account */}
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Cart */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative h-10 w-10"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>

                {/* Mobile Menu Toggle - TryAuri Hamburger */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-background">
                    <div className="flex flex-col h-full">
                      {/* Mobile Header */}
                      <div className="flex items-center justify-between p-6 border-b border-border">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                          <img src={neuvieLogo} alt="Neuvie Nutrition" className="h-8 w-auto" />
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                          <X className="h-6 w-6" />
                        </Button>
                      </div>

                      {/* Mobile Navigation Links */}
                      <nav className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-1">
                          <Link
                            to="/"
                            className={cn(
                              "block py-4 text-lg font-medium border-b border-border/50 transition-colors",
                              location.pathname === "/" ? "text-primary" : "text-foreground"
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
                                "block py-4 text-lg font-medium border-b border-border/50 transition-colors",
                                location.pathname === link.href ? "text-primary" : "text-foreground"
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </nav>

                      {/* Mobile CTA */}
                      <div className="p-6 border-t border-border bg-muted/30">
                        <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full bg-primary text-primary-foreground h-14 text-lg font-semibold rounded-lg">
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
      
      {/* Search Modal */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
