import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const silk = [0.22, 1, 0.36, 1] as const;

const navigationItems = [
  { name: 'Shop', path: '/shop' },
  { name: 'Cakes', path: '/shop?category=cakes' },
  { name: 'Our story', path: '/#story' },
  { name: 'Help', path: '/help' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname, location.search, location.hash]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    const [pathname, query] = path.split('?');
    if (path.includes('#')) return false;
    if (query) return location.pathname === pathname && location.search === `?${query}`;
    return location.pathname === pathname && (pathname !== '/shop' || !location.search);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm transition-[border-color] duration-300 border-b ${
        scrolled || isMenuOpen ? 'border-foreground' : 'border-transparent'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[76px]">
          {/* Left: menu on small screens, links on large */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="lg:hidden -ml-2 grid place-items-center w-11 h-11 rounded-full hover:bg-foreground/5"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
            </button>
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
              {navigationItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative label py-2 transition-opacity ${active ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-foreground"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Centre: the wordmark */}
          <Link to="/" className="text-center leading-none" aria-label="Maison Dorée, home">
            <span className="block display text-[1.85rem] sm:text-[2.1rem] tracking-[-0.04em]">
              Maison <span className="display-italic">Dorée</span>
            </span>
            <span className="hidden sm:block fr text-[14px] mt-1 opacity-70">fondée en 1892</span>
          </Link>

          {/* Right: search, bag, order */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              className="hidden md:grid place-items-center w-11 h-11 rounded-full hover:bg-foreground/5"
              aria-label="Search products"
              onClick={() => navigate('/shop', { state: { focusSearch: true } })}
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="relative grid place-items-center w-11 h-11 rounded-full hover:bg-foreground/5"
              onClick={() => navigate('/cart')}
              aria-label={`Cart, ${itemCount} items`}
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.3 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.3, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                    className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-foreground ring-1 ring-foreground text-[10px] font-bold grid place-items-center tabular"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <Link to="/shop" className="hidden md:inline-flex btn-butter !h-11 !px-6 !text-[14px]">
              Order today
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: silk }}
            className="lg:hidden fixed inset-x-0 top-[77px] bottom-0 bg-background paper overflow-y-auto"
            aria-label="Mobile"
          >
            <ul className="px-4 sm:px-6 pt-6">
              {[{ name: 'Home', path: '/' }, ...navigationItems].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + index * 0.05, duration: 0.7, ease: silk }}
                  className="border-b border-foreground/20"
                >
                  <Link to={item.path} className="block py-4">
                    <span className="display text-[3.25rem]">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-4 sm:px-6 py-8">
              <Link to="/shop" className="btn-ink w-full">Order for today</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
