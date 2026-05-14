import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchModal } from '@/components/search/SearchModal';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { cn } from '@/lib/utils';
import neuvieLogo from '@/assets/neuvie-navbar-logo.png';

const stripsLinks = [
  { label: 'Energy Strip', href: '/shop?goal=performance' },
  { label: 'Beauty + Collagen', href: '/shop?goal=beauty' },
  { label: 'Hair, Skin & Nails', href: '/shop?goal=beauty' },
  { label: 'Gut Health', href: '/shop?goal=gut' },
  { label: 'Sleep & Relax', href: '/shop?goal=relax' },
  { label: 'Immunity', href: '/shop?goal=wellness' },
  { label: 'Focus & Cognitive', href: '/shop?goal=focus' },
  { label: 'Shop All Strips', href: '/shop', highlight: true },
];

const bundlesLinks = [
  { label: 'Morning Routine Bundle', href: '/bundles' },
  { label: 'Beauty From Within Bundle', href: '/bundles' },
  { label: 'Full Day Bundle', href: '/bundles' },
  { label: 'Performance Bundle', href: '/bundles' },
  { label: 'Shop All Bundles', href: '/bundles', highlight: true },
];

const primaryLinks = [
  { href: '/shop', label: 'Shop All', sale: true },
  { href: '/science', label: 'Science' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/blog', label: 'Journal' },
  { href: '/faqs', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'strips' | 'bundles' | null>(null);
  const [mobileStripsOpen, setMobileStripsOpen] = useState(false);
  const [mobileBundlesOpen, setMobileBundlesOpen] = useState(false);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());
  const setCartOpen = useCartStore((state) => state.setOpen);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      // Hide on scroll down past 120px, show on scroll up
      if (y > 120 && y > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-transform duration-300',
          hidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <AnnouncementBar />

        <nav
          className={cn(
            'bg-background transition-all duration-300',
            scrolled ? 'shadow-md' : 'border-b border-border/30'
          )}
        >
          <div className="container-wide px-3 md:px-6">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center flex-shrink-0">
                <img
                  src={neuvieLogo}
                  alt="NEUVIE Nutrition"
                  width={300}
                  height={120}
                  fetchPriority="high"
                  decoding="async"
                  className="h-12 md:h-14 lg:h-16 w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-7">
                {/* Shop All with sale badge */}
                <Link
                  to="/shop"
                  className={cn(
                    'text-sm font-body font-medium tracking-wide transition-colors hover:text-accent inline-flex items-center gap-2',
                    location.pathname === '/shop' ? 'text-accent' : 'text-foreground/80'
                  )}
                >
                  Shop All
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2 py-0.5 rounded-full leading-none">
                    Sale — 25% Off
                  </span>
                </Link>

                {/* Strips dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('strips')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="text-sm font-body font-medium tracking-wide text-foreground/80 hover:text-accent inline-flex items-center gap-1 py-2">
                    Strips
                    <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                  {openDropdown === 'strips' && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-64">
                      <div className="bg-background border border-border rounded-xl shadow-elevated py-2">
                        {stripsLinks.map((l) => (
                          <Link
                            key={l.label}
                            to={l.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm font-body transition-colors hover:bg-secondary hover:text-accent',
                              l.highlight ? 'font-semibold text-primary border-t border-border mt-1 pt-3' : 'text-foreground/80'
                            )}
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bundles dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setOpenDropdown('bundles')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="text-sm font-body font-medium tracking-wide text-foreground/80 hover:text-accent inline-flex items-center gap-1 py-2">
                    Bundles
                    <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                  {openDropdown === 'bundles' && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-64">
                      <div className="bg-background border border-border rounded-xl shadow-elevated py-2">
                        {bundlesLinks.map((l) => (
                          <Link
                            key={l.label}
                            to={l.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm font-body transition-colors hover:bg-secondary hover:text-accent',
                              l.highlight ? 'font-semibold text-primary border-t border-border mt-1 pt-3' : 'text-foreground/80'
                            )}
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {primaryLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'text-sm font-body font-medium tracking-wide transition-colors hover:text-accent',
                      location.pathname === link.href ? 'text-accent' : 'text-foreground/80'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-1 md:gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setSearchOpen(true)}>
                  <Search className="h-5 w-5" strokeWidth={1.75} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10"
                  onClick={() => setCartOpen(true)}
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>

                {/* Mobile menu */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Menu className="h-6 w-6" strokeWidth={1.75} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[400px] p-0 bg-background">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-5 border-b border-border">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                          <img src={neuvieLogo} alt="NEUVIE" className="h-10 w-auto" />
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                          <X className="h-6 w-6" />
                        </Button>
                      </div>

                      <nav className="flex-1 overflow-y-auto">
                        <div className="p-5 space-y-1">
                          <Link
                            to="/shop"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between py-3.5 text-base font-medium border-b border-border/50"
                          >
                            <span>Shop All</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                              25% Off
                            </span>
                          </Link>

                          {/* Strips collapsible */}
                          <button
                            onClick={() => setMobileStripsOpen((v) => !v)}
                            className="flex items-center justify-between w-full py-3.5 text-base font-medium border-b border-border/50"
                          >
                            <span>Strips</span>
                            <ChevronDown className={cn('h-4 w-4 transition-transform', mobileStripsOpen && 'rotate-180')} />
                          </button>
                          {mobileStripsOpen && (
                            <div className="pl-4 pb-2 space-y-1">
                              {stripsLinks.map((l) => (
                                <Link
                                  key={l.label}
                                  to={l.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-2 text-sm text-foreground/75 hover:text-accent"
                                >
                                  {l.label}
                                </Link>
                              ))}
                            </div>
                          )}

                          {/* Bundles collapsible */}
                          <button
                            onClick={() => setMobileBundlesOpen((v) => !v)}
                            className="flex items-center justify-between w-full py-3.5 text-base font-medium border-b border-border/50"
                          >
                            <span>Bundles</span>
                            <ChevronDown className={cn('h-4 w-4 transition-transform', mobileBundlesOpen && 'rotate-180')} />
                          </button>
                          {mobileBundlesOpen && (
                            <div className="pl-4 pb-2 space-y-1">
                              {bundlesLinks.map((l) => (
                                <Link
                                  key={l.label}
                                  to={l.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-2 text-sm text-foreground/75 hover:text-accent"
                                >
                                  {l.label}
                                </Link>
                              ))}
                            </div>
                          )}

                          {primaryLinks.slice(1).map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-3.5 text-base font-medium border-b border-border/50"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </nav>

                      <div className="p-5 border-t border-border bg-secondary/30">
                        <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full bg-primary text-primary-foreground h-12 text-base font-display rounded-xl">
                            Shop All Strips
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

      <CartDrawer />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
