import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products, categories } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import Rating from '@/components/products/Rating';
import Awning from '@/components/home/Awning';
import OvenBoard from '@/components/home/OvenBoard';
import { Rise, silk } from '@/components/motion/Rise';
import { usePageTitle } from '@/hooks/use-page-title';
import heroImage from '@/assets/hero-bakery.jpg';
import storyImage from '@/assets/artisan-bread.jpg';

const testimonials = [
  {
    quote: 'The croissants shatter exactly the way they do in Paris. Delivery arrived still warm.',
    name: 'Camille R.',
    detail: 'Classic butter croissant',
    rating: 5,
  },
  {
    quote: 'They designed our wedding cake from a single photo, and it was even better on the day.',
    name: 'Arjun & Meera',
    detail: 'Celebration cake, three tiers',
    rating: 5,
  },
  {
    quote: 'Checkout took under a minute. The macaron box is now my weekly ritual.',
    name: 'Hannah L.',
    detail: 'Rose petal macarons',
    rating: 4.8,
  },
];

/** The round wax-seal stamp of the house, its words set on a circle, turning slowly. */
const Seal = ({ className = '' }: { className?: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -90 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 1.2, delay: 1.3, ease: silk }}
    className={className}
    aria-hidden
  >
    <div className="relative w-full h-full rounded-full bg-accent border border-foreground">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow">
        <defs>
          <path id="seal-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="fill-current font-body" style={{ fontSize: 15, letterSpacing: '0.3em', fontWeight: 600 }}>
          <textPath href="#seal-circle">MAISON DORÉE ✺ FONDÉE EN 1892 ✺ PARIS ✺ </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center display-italic text-[2.6rem]">M</span>
    </div>
  </motion.div>
);

const SectionHead = ({ title, aside }: { title: React.ReactNode; aside?: React.ReactNode }) => (
  <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-foreground pb-8 mb-14">
    <h2 className="display text-[3.4rem] sm:text-[5rem] lg:text-[6.5rem] max-w-[14ch]">{title}</h2>
    {aside}
  </div>
);

const Home = () => {
  usePageTitle();
  const reduce = useReducedMotion();
  const featured = products.filter((p) => p.isFeatured);
  const [hovered, setHovered] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const leftX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%']);
  const archY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-10%']);

  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({ target: storyRef, offset: ['start end', 'end start'] });
  const storyImageY = useTransform(storyProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <div className="overflow-x-clip">
      {/* ---------- The shopfront: awning, name, window ---------- */}
      <section ref={heroRef} className="paper relative min-h-[calc(100svh-76px)] flex flex-col pb-10">
        <Awning />

        <div className="relative flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-10 py-6">
          <h1 className="display relative z-0 text-[22vw] lg:text-[19.5vw] leading-[0.8] select-none" aria-label="Maison Dorée">
            <motion.span style={{ x: leftX }} className="block">
              <Rise delay={0.5}>Maison</Rise>
            </motion.span>
            <motion.span style={{ x: rightX }} className="block text-right">
              <Rise delay={0.62}>
                <span className="display-italic">Dorée</span>
              </Rise>
            </motion.span>
          </h1>

          {/* The shop window, standing in front of the name */}
          <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46vw] sm:w-[30vw] lg:w-[21vw]">
            <motion.div style={{ y: archY }} className="relative">
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 16px 16px)' }}
                animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 16px 16px)' }}
                transition={{ duration: 1.4, delay: 0.85, ease: silk }}
                className="arch aspect-[3/4] border border-foreground bg-muted"
              >
                <motion.img
                  src={heroImage}
                  alt="Inside the Maison Dorée shop on Rue de la Paix"
                  initial={{ scale: 1.35 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, delay: 0.85, ease: silk }}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <Seal className="absolute -right-10 -bottom-10 sm:-right-14 sm:-bottom-12 w-28 h-28 sm:w-36 sm:h-36" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.35, ease: silk }}
          className="px-4 sm:px-6 lg:px-10 grid grid-cols-12 gap-6 items-end"
        >
          <p className="col-span-12 md:col-span-5 lg:col-span-4 text-[18px] leading-relaxed max-w-[34ch]">
            Croissants laminated by hand, macarons piped to order and cakes built for your day, on
            Rue de la Paix since 1892.
          </p>
          <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-wrap md:justify-end gap-3">
            <Link to="/shop" className="btn-ink">
              Shop today&rsquo;s bakes
            </Link>
            <Link to="/shop?category=cakes" className="btn-line">
              Order a cake
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ---------- What's out of the oven, live ---------- */}
      <section id="today" className="px-4 sm:px-6 lg:px-10 pt-6 pb-28 scroll-mt-24">
        <OvenBoard />
      </section>

      {/* ---------- Bestsellers ---------- */}
      <section className="px-4 sm:px-6 lg:px-10 pb-32">
        <SectionHead
          title="Bestsellers"
          aside={
            <Link to="/shop" className="label link-animated">
              See all {products.length} bakes
            </Link>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ---------- What we bake: a list that shows its picture ---------- */}
      <section id="collections" className="paper border-t border-foreground px-4 sm:px-6 lg:px-10 pt-28 pb-32 scroll-mt-20">
        <SectionHead title="What we bake" />
        <div className="grid grid-cols-12 gap-x-10">
          <ul className="col-span-12 lg:col-span-7">
            {categories.map((category, index) => (
              <li key={category.id} className="border-b border-foreground/30 first:border-t">
                <Link
                  to={`/shop?category=${category.id}`}
                  onMouseEnter={() => setHovered(index)}
                  onFocus={() => setHovered(index)}
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 py-7"
                >
                  <span>
                    <span
                      className={`block display text-[2.6rem] sm:text-[3.6rem] leading-[0.95] transition-transform duration-700 ease-silk ${
                        hovered === index ? 'translate-x-3' : ''
                      }`}
                    >
                      {category.name}
                    </span>
                    <span className="block mt-2 text-[15px] text-muted-foreground">{category.description}.</span>
                  </span>
                  <span
                    className={`hidden sm:inline-flex items-center h-11 px-5 rounded-full border border-foreground text-[14px] font-medium transition-colors duration-300 ${
                      hovered === index ? 'bg-accent' : ''
                    }`}
                  >
                    {products.filter((p) => p.category === category.id).length} in the case
                  </span>
                </Link>
                {/* On small screens the picture sits in the row */}
                <div className="lg:hidden arch aspect-[16/10] border border-foreground mb-7">
                  <img src={category.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block col-span-5">
            <div className="sticky top-28">
              <div className="relative arch aspect-[4/5] border border-foreground bg-muted">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={categories[hovered].id}
                    src={categories[hovered].image}
                    alt={categories[hovered].name}
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: silk }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- The house ---------- */}
      <section id="story" ref={storyRef} className="bg-foreground text-background px-4 sm:px-6 lg:px-10 pt-28 pb-32 scroll-mt-20">
        <div className="border-b border-background/40 pb-8 mb-16">
          <h2 className="display text-[3.4rem] sm:text-[5rem] lg:text-[6.5rem] max-w-[16ch]">
            Four generations, one oven.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-x-10 gap-y-14 items-start">
          <div className="col-span-12 md:col-span-5">
            <div className="arch aspect-[3/4] border border-background/60">
              <motion.img
                style={{ y: storyImageY }}
                src={storyImage}
                alt="Sourdough loaves fresh from the oven"
                className="w-full h-[116%] -mt-[8%] object-cover"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-6">
            <blockquote className="display-italic text-[2.2rem] sm:text-[3rem] leading-[1.05] max-w-[22ch]">
              “We bake in small batches, so what reaches you was made for you, that morning.”
            </blockquote>
            <p className="mt-10 max-w-xl text-[17px] leading-relaxed opacity-80">
              Maison Dorée began as a single wood-fired oven on Rue de la Paix. Today twelve bakers still
              laminate every croissant by hand, feed the same sourdough starter every night and pipe each
              macaron to order.
            </p>

            <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { value: '1892', label: 'The oven was first lit' },
                { value: '12', label: 'Bakers, every one trained here' },
                { value: '48 h', label: 'For each sourdough to rise' },
              ].map((stat) => (
                <div key={stat.label} className="border-t border-background/25 pt-5">
                  <dt className="display text-[4.2rem] text-accent tabular leading-none">{stat.value}</dt>
                  <dd className="mt-3 text-[15px] opacity-70">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- Regulars ---------- */}
      <section id="reviews" className="px-4 sm:px-6 lg:px-10 pt-28 pb-32 scroll-mt-20">
        <SectionHead title="What regulars say" />
        <div className="grid md:grid-cols-3 border-l border-foreground/30">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-r border-b md:border-b-0 border-foreground/30 px-6 lg:px-10 py-8 flex flex-col">
              <span className="display text-[6rem] leading-[0.6] h-12" aria-hidden>
                “
              </span>
              <blockquote className="display text-[1.9rem] leading-[1.05] flex-1">{t.quote}</blockquote>
              <figcaption className="mt-10 flex items-end justify-between gap-4">
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-muted-foreground mt-1">{t.detail}</span>
                </span>
                <Rating value={t.rating} />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- Order ---------- */}
      <section className="bg-accent border-y border-foreground px-4 sm:px-6 lg:px-10 py-24 lg:py-28 overflow-hidden">
        <div className="grid grid-cols-12 gap-6 items-end">
          <h2 className="col-span-12 lg:col-span-9 display text-[16vw] lg:text-[10.5vw] leading-[0.84]">
            Order by 2&nbsp;pm, eat it today.
          </h2>
          <div className="col-span-12 lg:col-span-3 lg:pb-6">
            <p className="text-[17px] leading-relaxed max-w-xs">
              Delivered across Paris the same afternoon, or plan a celebration cake with our pastry chef.
            </p>
            <Link to="/shop" className="btn-ink mt-8">
              Start your box
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
