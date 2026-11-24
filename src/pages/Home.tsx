import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChefHat, Award, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, categories } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import Rating from '@/components/products/Rating';
import { useCountUp } from '@/hooks/use-count-up';
import heroImage from '@/assets/hero-bakery.jpg';
import storyImage from '@/assets/artisan-bread.jpg';

const silk = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: silk },
};

const promises = [
  { icon: Clock, title: 'Baked at 5 AM', text: 'Every order leaves the oven the same morning.' },
  { icon: Truck, title: 'Same-day delivery', text: 'Order by 2 PM, free over $50.' },
  { icon: ChefHat, title: 'Bespoke cakes', text: 'Designed with our pastry chef for your day.' },
  { icon: Award, title: 'Award-winning', text: 'Butter, flour and patience since 1892.' },
];

const testimonials = [
  {
    quote: 'The croissants shatter exactly the way they do in Paris. Delivery arrived still warm, which I did not think was possible.',
    name: 'Camille R.',
    detail: 'Classic Butter Croissant',
    rating: 5,
  },
  {
    quote: 'They designed our wedding cake from a single photo and it was even better on the day. Guests are still talking about it.',
    name: 'Arjun & Meera',
    detail: 'Celebration Cake, 3 tiers',
    rating: 5,
  },
  {
    quote: 'Checkout took under a minute and the macaron box made the perfect last-minute gift. My new weekly ritual.',
    name: 'Hannah L.',
    detail: 'Rose Petal Macarons',
    rating: 4.8,
  },
];

const ribbon = ['Croissants', 'Macarons', 'Celebration cakes', 'Sourdough', 'Petits fours', 'Viennoiseries'];

/** One line of the hero headline, rising out of its own mask. */
const Line = ({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span
      className={`block ${className}`}
      initial={{ y: '110%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1.15, delay, ease: silk }}
    >
      {children}
    </motion.span>
  </span>
);

const Stat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { ref, value: shown } = useCountUp<HTMLSpanElement>(value);
  return (
    <div>
      <dt className="font-display text-5xl font-semibold text-foreground tabular">
        <span ref={ref}>{shown}</span>
        {suffix}
      </dt>
      <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{label}</dd>
    </div>
  );
};

const SectionHeading = ({ eyebrow, title, accent, align = 'left' }: { eyebrow: string; title: string; accent: string; align?: 'left' | 'center' }) => (
  <motion.div {...reveal} className={align === 'center' ? 'text-center flex flex-col items-center' : ''}>
    <p className={`eyebrow ${align === 'center' ? 'eyebrow-both' : ''} mb-5`}>{eyebrow}</p>
    <h2 className="display-lg text-foreground">
      {title} <span className="italic-accent text-accent">{accent}</span>
    </h2>
  </motion.div>
);

const Home = () => {
  const featuredProducts = products.filter((product) => product.isFeatured);
  const reduce = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(heroProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const heroContentY = useTransform(heroProgress, [0, 1], ['0%', reduce ? '0%' : '-22%']);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({ target: storyRef, offset: ['start end', 'end start'] });
  const storyImageY = useTransform(storyProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);
  const years = useCountUp<HTMLSpanElement>(130);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] flex items-end overflow-hidden bg-primary grain">
        <motion.div style={{ y: heroImageY }} className="absolute inset-0 will-change-transform">
          <motion.img
            src={heroImage}
            alt="Inside the Maison Dorée boutique"
            initial={{ scale: 1.14 }}
            animate={{ scale: 1.04 }}
            transition={{ duration: 3.2, ease: silk }}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(22_40%_6%/0.55)_0%,hsl(22_40%_6%/0.25)_38%,hsl(22_40%_6%/0.82)_100%)]" />

        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-24"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: silk }}
            className="eyebrow !text-[hsl(var(--gold-soft))] mb-8"
          >
            Paris · Since 1892
          </motion.p>

          <h1 className="display-xl text-white max-w-5xl [text-shadow:0_2px_30px_rgba(20,10,4,0.35)]">
            <Line delay={0.45}>Artisanal excellence,</Line>
            <Line delay={0.6} className="italic font-medium text-[hsl(var(--gold-soft))]">in every bite.</Line>
          </h1>

          <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.05, ease: silk }}
              className="max-w-md text-lg leading-relaxed text-white/80"
            >
              Viennoiseries laminated by hand, macarons piped to order and celebration cakes, baked at
              dawn and at your door the same day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: silk }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link to="/shop" className="group btn-pill-light">
                Shop the collection
                <span className="pill-arrow"><ArrowRight className="w-4 h-4" /></span>
              </Link>
              <Link to="/#story" className="btn-pill-ghost border-white/40 text-white hover:bg-white/10">
                Our story
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute right-6 lg:right-10 bottom-24 hidden md:flex flex-col items-center gap-3 text-white/60"
          aria-hidden
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
          <span className="relative block w-px h-16 overflow-hidden bg-white/20">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-white animate-scroll-cue" />
          </span>
        </motion.div>
      </section>

      {/* Ribbon */}
      <section aria-label="What we bake" className="bg-primary text-primary-foreground border-t border-white/10 overflow-hidden py-5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
              {ribbon.map((word) => (
                <span key={`${copy}-${word}`} className="flex items-center">
                  <span className="font-display italic text-3xl md:text-4xl px-8 whitespace-nowrap">{word}</span>
                  <span className="text-[hsl(var(--gold))] text-lg">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Promises */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {promises.map((item, index) => (
              <motion.div
                key={item.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.08 }}
                className="flex flex-col gap-4 px-5 lg:px-10 py-10"
              >
                <item.icon className="w-6 h-6 text-accent" strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-28 lg:py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <SectionHeading eyebrow="Bestsellers" title="Featured" accent="creations" />
            <motion.div {...reveal}>
              <Link to="/shop" className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                <span className="link-animated">View all</span>
                <span className="grid place-items-center w-10 h-10 rounded-full border border-border transition-all duration-500 ease-silk group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-28 lg:py-36 bg-gradient-cream scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-16">
            <SectionHeading eyebrow="Collections" title="Something for every" accent="occasion" />
            <motion.p {...reveal} className="text-muted-foreground text-lg max-w-sm leading-relaxed">
              From a morning croissant to a three-tier wedding cake, browse by craft.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: index * 0.1, ease: silk }}
                className={`group ${index % 2 === 1 ? 'lg:mt-16' : ''}`}
              >
                <Link to={`/shop?category=${category.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-card">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(22_40%_7%/0.88)] via-[hsl(22_40%_7%/0.15)] to-transparent" />
                    <span className="absolute top-5 left-5 font-display italic text-xl text-white/80">0{index + 1}</span>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-[1.9rem] font-semibold leading-tight text-white">{category.name}</h3>
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-silk">
                        <p className="overflow-hidden text-sm text-white/75 leading-relaxed">
                          <span className="block pt-2">{category.description}</span>
                        </p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--gold-soft))]">
                        Discover
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" ref={storyRef} className="py-28 lg:py-40 scroll-mt-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...reveal} className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxury">
              <motion.img
                style={{ y: storyImageY }}
                src={storyImage}
                alt="Sourdough loaves fresh from the oven"
                className="w-full h-[115%] -mt-[7.5%] object-cover"
              />
            </div>
            <div className="absolute -bottom-10 right-4 md:-right-10 bg-primary text-primary-foreground rounded-[1.5rem] px-8 py-7 shadow-luxury">
              <p className="font-display text-6xl font-semibold leading-none tabular">
                <span ref={years.ref}>{years.value}</span>+
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--gold-soft))]">years of baking</p>
            </div>
          </motion.div>

          <div>
            <SectionHeading eyebrow="Our story" title="Four generations," accent="one oven" />
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
              <p className="mt-8 text-muted-foreground text-lg leading-relaxed">
                Maison Dorée began as a single wood-fired oven on Rue de la Paix. Today our twelve bakers
                still laminate every croissant by hand, feed the same sourdough starter every night and
                pipe each macaron to order.
              </p>
              <p className="mt-5 font-display italic text-2xl text-foreground leading-snug">
                “We bake in small batches, so what reaches you was made for you, that morning.”
              </p>

              <dl className="grid grid-cols-3 gap-6 border-t border-border pt-10 mt-10 mb-12">
                <Stat value={12} suffix="" label="Master bakers" />
                <Stat value={25} suffix="+" label="Awards won" />
                <Stat value={48} suffix="h" label="Sourdough ferment" />
              </dl>

              <Link to="/shop" className="group btn-pill">
                Taste the difference
                <span className="pill-arrow"><ArrowRight className="w-4 h-4" /></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-28 lg:py-36 bg-secondary/70 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <SectionHeading eyebrow="Kind words" title="Loved by our" accent="regulars" align="center" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.figure
                key={t.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.12 }}
                className="relative bg-card rounded-[1.5rem] p-9 shadow-card flex flex-col transition-transform duration-700 ease-silk hover:-translate-y-1"
              >
                <span className="font-display text-7xl leading-none text-[hsl(var(--gold))] h-10" aria-hidden>“</span>
                <blockquote className="font-display text-[1.45rem] leading-snug text-foreground flex-1 mt-2">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mt-1">{t.detail}</p>
                  </div>
                  <Rating value={t.rating} />
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 lg:py-40 bg-primary text-primary-foreground overflow-hidden grain">
        <motion.div {...reveal} className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="ornament mb-10" aria-hidden><span className="text-sm">✦</span></div>
          <h2 className="display-xl mx-auto max-w-4xl">
            Ready to <span className="italic font-medium text-[hsl(var(--gold-soft))]">indulge?</span>
          </h2>
          <p className="mt-8 text-primary-foreground/75 text-lg max-w-xl mx-auto leading-relaxed">
            Order by 2 PM for same-day delivery, or plan a bespoke celebration cake with our pastry chef.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="group btn-pill-light">
              Start shopping
              <span className="pill-arrow"><ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link to="/shop?category=cakes" className="btn-pill-ghost border-primary-foreground/35 text-primary-foreground hover:bg-white/10">
              Design a cake
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
