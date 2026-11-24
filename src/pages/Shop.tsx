import { useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { products } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import PageHead from '@/components/layout/PageHead';
import { silk } from '@/components/motion/Rise';
import { usePageTitle } from '@/hooks/use-page-title';

const shelves = [
  { id: 'all', label: 'Everything' },
  { id: 'croissants', label: 'Croissants' },
  { id: 'macarons', label: 'Macarons & petits fours' },
  { id: 'breads', label: 'Breads' },
  { id: 'cakes', label: 'Cakes' },
];

const sorts = [
  { id: 'name', label: 'A to Z' },
  { id: 'price-low', label: 'Price, low to high' },
  { id: 'price-high', label: 'Price, high to low' },
  { id: 'rating', label: 'Best loved' },
];

const Shop = () => {
  usePageTitle('Shop');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  // The address is the single source of truth, so every filtered view can be linked and shared.
  const shelf = searchParams.get('category') || 'all';
  const query = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'name';

  const setParam = (key: string, value: string, fallback: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  // The search button in the header lands here with the cursor already in the field.
  useEffect(() => {
    if ((location.state as { focusSearch?: boolean } | null)?.focusSearch) searchRef.current?.focus();
  }, [location.state]);

  const counts = useMemo(() => {
    const byShelf: Record<string, number> = { all: products.length };
    for (const p of products) byShelf[p.category] = (byShelf[p.category] ?? 0) + 1;
    return byShelf;
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => shelf === 'all' || p.category === shelf)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [shelf, query, sortBy]);

  const clearAll = () => setSearchParams(new URLSearchParams(), { replace: true });

  return (
    <div className="overflow-x-clip">
      <PageHead
        kicker="Shop"
        aside={`${products.length} creations, baked daily`}
        title="The whole"
        italic="case."
      >
        {/* Shelves, then search and sort */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-5 xl:gap-10 py-5">
          <nav aria-label="Shelves" className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
            <ul className="flex items-center gap-1 w-max">
              {shelves.map((s) => {
                const active = shelf === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setParam('category', s.id, 'all')}
                      aria-pressed={active}
                      className={`relative inline-flex items-center gap-2 h-11 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                        active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="shelf-pill"
                          className="absolute inset-0 -z-0 rounded-full bg-accent border border-foreground"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{s.label}</span>
                      <span className="relative label text-[10px] tracking-[0.12em] opacity-60 tabular">{counts[s.id] ?? 0}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 xl:ml-auto">
            <label className="relative flex-1 xl:w-72 xl:flex-none">
              <span className="sr-only">Search the shop</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" strokeWidth={1.6} />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setParam('q', e.target.value, '')}
                placeholder="Search the case"
                className="w-full h-11 pl-11 pr-4 rounded-full bg-transparent border border-foreground/30 placeholder:text-foreground/45 focus:border-foreground focus:outline-none transition-colors duration-300 [&::-webkit-search-cancel-button]:hidden"
              />
            </label>
            <label className="relative shrink-0">
              <span className="sr-only">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setParam('sort', e.target.value, 'name')}
                className="appearance-none h-11 pl-4 pr-10 rounded-full bg-transparent border border-foreground/30 text-sm font-medium hover:border-foreground focus:border-foreground focus:outline-none cursor-pointer transition-colors duration-300"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px]">▼</span>
            </label>
          </div>
        </div>
      </PageHead>

      <section className="px-4 sm:px-6 lg:px-10 pt-10 pb-32">
        <div className="flex items-center justify-between gap-4 mb-12 label opacity-70">
          <span aria-live="polite">
            {shown.length === products.length ? 'Showing everything' : `Showing ${shown.length} of ${products.length}`}
          </span>
          {(shelf !== 'all' || query) && (
            <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 uppercase hover:opacity-100">
              <X className="w-3.5 h-3.5" /> <span className="link-animated">Clear</span>
            </button>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {shown.length > 0 ? (
            <motion.div
              key={`${shelf}-${sortBy}-${query}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: silk }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20"
            >
              {shown.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: silk }}
              className="py-16 max-w-2xl"
            >
              <p className="display text-[3.4rem] sm:text-[5rem]">
                Nothing in the case <span className="display-italic">for that.</span>
              </p>
              <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">
                {query ? `No bake matches “${query}”. ` : ''}Try another shelf, or see everything we baked this morning.
              </p>
              <button type="button" onClick={clearAll} className="btn-ink mt-10">
                Show everything
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Shop;
