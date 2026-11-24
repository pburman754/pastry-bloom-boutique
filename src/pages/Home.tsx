import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, categories } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import Rating from '@/components/products/Rating';
import { useCountUp } from '@/hooks/use-count-up';
import { Rise, silk } from '@/components/motion/Rise';
import { usePageTitle } from '@/hooks/use-page-title';
import heroImage from '@/assets/hero-bakery.jpg';
import storyImage from '@/assets/artisan-bread.jpg';


const testimonials = [
  {
    quote: 'The croissants shatter exactly the way they do in Paris. Delivery arrived still warm.',
    name: 'Camille R.',
    detail: 'Classic Butter Croissant',
    rating: 5,
  },
  {
    quote: 'They designed our wedding cake from a single photo, and it was even better on the day.',
    name: 'Arjun & Meera',
    detail: 'Celebration Cake, 3 tiers',
    rating: 5,
  },
  {
    quote: 'Checkout took under a minute. The macaron box is now my weekly ritual.',
    name: 'Hannah L.',
    detail: 'Rose Petal Macarons',
    rating: 4.8,
  },
];

const ribbon = ['Croissants', 'Macarons', 'Celebration cakes', 'Sourdough', 'Petits fours', 'Pain au chocolat'];

/** The round stamp, its words set on a circle, turning slowly. */
const Stamp = ({ className = '' }: { className?: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -90 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 1.2, delay: 1.1, ease: silk }}
    className={className}
    aria-hidden
  >
    <div className="relative w-full h-full rounded-full bg-accent border border-foreground">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow">
        <defs>
          <path id="stamp-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="fill-current font-body" style={{ fontSize: 15, letterSpacing: '0.32em', fontWeight: 600 }}>
          <textPath href="#stamp-circle">BAKED AT DAWN · DELIVERED BY NOON · </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center display-italic text-[2.6rem]">M</span>
    </div>
  </motion.div>
);

const SectionHead = ({ number, title, italic, aside }: { number: string; title: string; italic: string; aside?: React.ReactNode }) => (
  <div className="grid grid-cols-12 gap-x-6 items-end border-b border-foreground pb-8 mb-14">
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="col-span-12 md:col-span-2 label mb-4 md:mb-2"
    >
      {number}
    </motion.p>
    <h2 className="col-span-12 md:col-span-7 display text-[3.4rem] sm:text-[5rem] lg:text-[6.5rem]">
      <Rise onView>
        {title} <span className="display-italic">{italic}</span>
      </Rise>
    </h2>
    {aside && <div className="col-span-12 md:col-span-3 md:text-right mt-6 md:mt-0">{aside}</div>}
  </div>
);

const Stat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { ref, value: shown } = useCountUp<HTMLSpanElement>(value);
  return (
    <div className="border-t border-background/25 pt-5">
      <dt className="display text-[4.5rem] text-accent tabular">
        <span ref={ref}>{shown}</span>
        {suffix}
      </dt>
      <dd className="label mt-3 opacity-70">{label}</dd>
    </div>
  );
};

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
      {/* ---------- Hero ---------- */}
      <section ref={heroRef} className="paper relative min-h-[calc(100svh-76px)] flex flex-col px-4 sm:px-6 lg:px-10 pt-6 pb-8">
        <div className="flex justify-between label opacity-70">
          <span>N°1 — Pâtisserie fine</span>
          <span className="hidden sm:inline">Rue de la Paix, Paris 1er</span>
        </div>

        <div className="relative flex-1 flex flex-col justify-center py-8">
          <h1 className="display relative z-0 text-[22vw] lg:text-[19.5vw] leading-[0.8] select-none" aria-label="Maison Dorée">
            <motion.span style={{ x: leftX }} className="block">
              <Rise delay={0.15}>Maison</Rise>
            </motion.span>
            <motion.span style={{ x: rightX }} className="block text-right">
              <Rise delay={0.3}>
                <span className="display-italic">Dorée</span>
              </Rise>
            </motion.span>
          </h1>

          {/* The shop window, standing in front of the name */}
          <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46vw] sm:w-[30vw] lg:w-[22vw]">
          <motion.div style={{ y: archY }} className="relative">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 16px 16px)' }}
              animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 16px 16px)' }}
              transition={{ duration: 1.4, delay: 0.5, ease: silk }}
              className="arch aspect-[3/4] border border-foreground bg-muted"
            >
              <motion.img
                src={heroImage}
                alt="Inside the Maison Dorée shop on Rue de la Paix"
                initial={{ scale: 1.35 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: silk }}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <Stamp className="absolute -right-10 -bottom-10 sm:-right-14 sm:-bottom-12 w-28 h-28 sm:w-36 sm:h-36" />
          </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: silk }}
            className="col-span-12 md:col-span-5 lg:col-span-4 text-[17px] leading-relaxed"
          >
            Croissants laminated by hand, macarons piped to order and cakes built for your day. Baked at
            dawn, at your door the same morning.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: silk }}
            className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-wrap md:justify-end gap-3"
          >
            <Link to="/shop" className="btn-ink">
              Shop the collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/shop?category=cakes" className="btn-line">
              Design a cake
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---------- Ribbon ---------- */}
      <section aria-label="What we bake" className="bg-accent border-y border-foreground overflow-hidden py-4">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
              {ribbon.map((word) => (
                <span key={`${copy}-${word}`} className="flex items-center">
                  <span className="display-italic text-[2.6rem] md:text-[3.4rem] px-8 whitespace-nowrap leading-none">{word}</span>
                  <span className="text-2xl" aria-hidden>✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 01 Bestsellers ---------- */}
      <section className="px-4 sm:px-6 lg:px-10 pt-28 pb-32">
        <SectionHead
          number="01 / Bestsellers"
          title="The morning"
          italic="case"
          aside={
            <Link to="/shop" className="group inline-flex items-center gap-2 label">
              <span className="link-animated">All {products.length} creations</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* ---------- 02 Collections: a list that shows its picture ---------- */}
      <section id="collections" className="paper border-t border-foreground px-4 sm:px-6 lg:px-10 pt-28 pb-32 scroll-mt-20">
        <SectionHead number="02 / Collections" title="Browse by" italic="craft" />
        <div className="grid grid-cols-12 gap-x-10">
          <ul className="col-span-12 lg:col-span-7">
            {categories.map((category, index) => (
              <li key={category.id} className="border-b border-foreground/30 first:border-t">
                <Link
                  to={`/shop?category=${category.id}`}
                  onMouseEnter={() => setHovered(index)}
                  onFocus={() => setHovered(index)}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-7"
                >
                  <span className="label opacity-60 tabular">0{index + 1}</span>
                  <span>
                    <span
                      className={`block display text-[2.6rem] sm:text-[3.6rem] leading-[0.95] transition-transform duration-700 ease-silk ${
                        hovered === index ? 'translate-x-3' : ''
                      }`}
                    >
                      {category.name}
                    </span>
                    <span className="block mt-2 text-sm text-muted-foreground">{category.description}</span>
                  </span>
                  <span
                    className={`grid place-items-center w-12 h-12 rounded-full border border-foreground transition-colors duration-300 ${
                      hovered === index ? 'bg-accent' : ''
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
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
              <p className="mt-4 label opacity-60 text-right">
                {String(hovered + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 03 The house ---------- */}
      <section id="story" ref={storyRef} className="bg-foreground text-background px-4 sm:px-6 lg:px-10 pt-28 pb-32 scroll-mt-20">
        <div className="grid grid-cols-12 gap-x-6 items-end border-b border-background/40 pb-8 mb-16">
          <p className="col-span-12 md:col-span-2 label mb-4 md:mb-2 opacity-70">03 / The house</p>
          <h2 className="col-span-12 md:col-span-10 display text-[3.4rem] sm:text-[5rem] lg:text-[6.5rem]">
            Four generations, <span className="display-italic text-accent">one oven.</span>
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
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: silk }}
              className="display-italic text-[2.2rem] sm:text-[3rem] leading-[1.05]"
            >
              “We bake in small batches, so what reaches you was made for you, that morning.”
            </motion.blockquote>
            <p className="mt-10 max-w-xl text-[17px] leading-relaxed opacity-80">
              Maison Dorée began as a single wood-fired oven on Rue de la Paix. Today twelve bakers still
              laminate every croissant by hand, feed the same sourdough starter every night and pipe each
              macaron to order.
            </p>

            <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <Stat value={130} suffix="+" label="Years of baking" />
              <Stat value={12} suffix="" label="Master bakers" />
              <Stat value={48} suffix="h" label="Sourdough ferment" />
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- 04 Kind words ---------- */}
      <section id="reviews" className="px-4 sm:px-6 lg:px-10 pt-28 pb-32 scroll-mt-20">
        <SectionHead number="04 / Kind words" title="From our" italic="regulars" />
        <div className="grid md:grid-cols-3 border-l border-foreground/30">
          {testimonials.map((t, index) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: silk }}
              className="border-r border-b md:border-b-0 border-foreground/30 px-6 lg:px-10 py-8 flex flex-col"
            >
              <span className="display text-[6rem] leading-[0.6] h-12" aria-hidden>“</span>
              <blockquote className="display text-[1.9rem] leading-[1.05] flex-1">{t.quote}</blockquote>
              <figcaption className="mt-10 flex items-end justify-between gap-4">
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block label text-[10px] opacity-60 mt-1.5">{t.detail}</span>
                </span>
                <Rating value={t.rating} />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ---------- Order ---------- */}
      <section className="bg-accent border-y border-foreground px-4 sm:px-6 lg:px-10 py-24 lg:py-28 overflow-hidden">
        <div className="grid grid-cols-12 gap-6 items-end">
          <h2 className="col-span-12 lg:col-span-9 display text-[18vw] lg:text-[12.5vw] leading-[0.82]">
            <Rise onView>Order by</Rise>
            <Rise onView delay={0.12}>
              <span className="display-italic">2 pm.</span>
            </Rise>
          </h2>
          <div className="col-span-12 lg:col-span-3 lg:pb-6">
            <p className="text-[17px] leading-relaxed max-w-xs">
              Delivered the same day across Paris, or plan a celebration cake with our pastry chef.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-ink">
                Start your box <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
