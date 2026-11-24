import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Cakes', path: '/shop?category=cakes' },
  { name: 'Our Story', path: '/#story' },
  { name: 'Reviews', path: '/#reviews' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname, location.search]);

  // Over the home hero the bar is clear glass with ivory type; everywhere else, and once
  // the page scrolls, it settles into frosted ivory.
  const overHero = isHome && !scrolled && !isMenuOpen;

  const isActive = (path: string) => {
    const [pathname, query] = path.split('?');
    if (path.includes('#')) return false;
    if (query) return location.pathname === pathname && location.search === `?${query}`;
    return location.pathname === pathname && (pathname !== '/shop' || !location.search);
  };

  const iconBtn = `relative grid place-items-center w-10 h-10 rounded-full transition-colors duration-300 ${
    overHero ? 'text-white/90 hover:bg-white/10' : 'text-foreground/80 hover:bg-foreground/5 hover:text-foreground'
  }`;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`${isHome ? 'fixed inset-x-0' : 'sticky'} top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        overHero
          ? 'bg-transparent border-b border-white/10'
          : 'bg-background/85 backdrop-blur-xl border-b border-border/80 shadow-[0_1px_0_hsla(22,40%,15%,0.03)]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-20">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Maison Dorée, home">
            <span
              className={`grid place-items-center w-10 h-10 rounded-full border transition-colors duration-500 ${
                overHero ? 'border-white/50 text-white' : 'border-[hsl(var(--gold))] text-foreground'
              }`}
            >
              <span className="font-display italic text-xl leading-none -mt-0.5">M</span>
            </span>
            <span className="leading-none">
              <span className={`block font-display text-[1.6rem] font-semibold tracking-[-0.01em] transition-colors duration-500 ${overHero ? 'text-white' : 'text-foreground'}`}>
                Maison Dorée
              </span>
              <span className={`block text-[9px] font-semibold uppercase tracking-[0.38em] mt-1 transition-colors duration-500 ${overHero ? 'text-white/65' : 'text-muted-foreground'}`}>
                Pâtisserie · Paris
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navigationItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                    overHero
                      ? active ? 'text-white' : 'text-white/75 hover:text-white'
                      : active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-4 right-4 -bottom-0.5 h-px bg-[hsl(var(--gold))]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" className={`${iconBtn} hidden md:grid`} aria-label="Search products" onClick={() => navigate('/shop')}>
              <Search className="w-[18px] h-[18px]" strokeWidth={1.6} />
            </button>
            <button type="button" className={`${iconBtn} hidden sm:grid`} aria-label="Wishlist">
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.6} />
            </button>
            <button type="button" className={`${iconBtn} hidden sm:grid`} aria-label="Account">
              <User className="w-[18px] h-[18px]" strokeWidth={1.6} />
            </button>
            <button type="button" className={iconBtn} onClick={() => navigate('/cart')} aria-label={`Cart, ${itemCount} items`}>
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.6} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                    className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold grid place-items-center tabular"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`${iconBtn} lg:hidden`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" strokeWidth={1.6} /> : <Menu className="w-5 h-5" strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
            aria-label="Mobile"
          >
            <div className="container mx-auto px-4 py-6 space-y-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center justify-between py-3 font-display text-3xl font-semibold text-foreground border-b border-border/70"
                  >
                    {item.name}
                    <span className="text-xs font-body font-semibold tracking-[0.2em] text-muted-foreground">0{index + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
