import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { categories, products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { usePageTitle } from '@/hooks/use-page-title';
import ProductCard from '@/components/products/ProductCard';
import QtyStepper from '@/components/products/QtyStepper';
import Rating from '@/components/products/Rating';
import { Rise, silk } from '@/components/motion/Rise';
import { formatPrice, FREE_DELIVERY_FROM } from '@/lib/shop';
import NotFound from './NotFound';

const promises = [
  { title: 'Baked at dawn', text: 'Out of the oven a few hours before it reaches you.' },
  { title: 'Order by 2 pm', text: 'Delivered the same day across Paris.' },
  { title: 'Free delivery', text: `On every box from ${formatPrice(FREE_DELIVERY_FROM)}.` },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);
  usePageTitle(product?.name ?? 'Not found');

  useEffect(() => setQuantity(1), [id]);

  if (!product) return <NotFound />;

  const shelf = categories.find((c) => c.id === product.category);
  // Same shelf first, then other favourites, so the row is never sparse.
  const related = [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 3);

  const addToBox = () => {
    addItem(product, quantity);
    toast({ title: 'In your box', description: `${quantity} × ${product.name}, ${formatPrice(product.price * quantity)}.` });
  };

  return (
    <div className="overflow-x-clip">
      <section className="paper px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-24">
        {/* Trail */}
        <nav aria-label="You are here" className="flex items-center justify-between gap-4 label opacity-70">
          <button type="button" onClick={() => navigate(-1)} className="group inline-flex items-center gap-2 hover:opacity-100">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-500 ease-silk group-hover:-translate-x-1" />
            <span className="link-animated">Back</span>
          </button>
          <ol className="hidden sm:flex items-center gap-2">
            <li>
              <Link to="/shop" className="link-animated">Shop</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to={`/shop?category=${product.category}`} className="link-animated">
                {shelf?.name ?? product.category}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid grid-cols-12 gap-x-6 lg:gap-x-14 gap-y-14 items-start">
          {/* The shop window */}
          <div className="relative col-span-12 md:col-span-6 lg:col-span-5 md:sticky md:top-28">
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 16px 16px)' }}
              animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 16px 16px)' }}
              transition={{ duration: 1.3, delay: 0.1, ease: silk }}
              className="relative arch aspect-[4/5] border border-foreground bg-muted"
            >
              <motion.img
                src={product.image}
                alt={product.name}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.1, ease: silk }}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.isNew && (
              <motion.span
                initial={{ scale: 0, rotate: -40 }}
                animate={{ scale: 1, rotate: -12 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1 }}
                className="absolute top-10 -left-2 sm:left-2 grid place-items-center w-28 h-28 rounded-full bg-[hsl(var(--berry))] text-white border border-foreground fr text-[1.45rem]"
              >
                nouveau
              </motion.span>
            )}
          </div>

          {/* The label on the shelf */}
          <div className="col-span-12 md:col-span-6 lg:col-span-7">
            <h1 className="display text-[3.6rem] sm:text-[4.6rem] lg:text-[6.2rem] xl:text-[7rem]">
              <Rise delay={0.15}>{product.name}</Rise>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: silk }}
            >
              <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-b border-foreground pb-8">
                <p className="display text-[3.4rem] tabular leading-none">{formatPrice(product.price)}</p>
                <p className="flex items-center gap-3 text-sm">
                  <Rating value={product.rating} />
                  <span className="tabular">{product.rating.toFixed(1)}</span>
                  <span className="opacity-60">from 127 regulars</span>
                </p>
              </div>

              <p className="mt-8 max-w-xl text-[19px] leading-relaxed">{product.description}.</p>

              {product.ingredients && (
                <div className="mt-10">
                  <p className="text-[15px] font-semibold">What goes in</p>
                  <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 display-italic text-[1.6rem] leading-tight">
                    {product.ingredients.map((ingredient) => (
                      <li key={ingredient} className="flex items-center gap-2.5 pr-2">
                        <span aria-hidden className="not-italic text-sm">✺</span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buy */}
              <div className="mt-12 flex flex-wrap items-center gap-3">
                <QtyStepper value={quantity} onChange={setQuantity} max={10} label={product.name} />
                <button type="button" onClick={addToBox} className="btn-ink flex-1 min-w-[15rem] !justify-between">
                  <span>Add to box</span>
                  <span className="tabular font-medium">{formatPrice(product.price * quantity)}</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  addItem(product, quantity);
                  navigate('/checkout');
                }}
                className="mt-5 label link-animated"
              >
                Or buy it now
              </button>

              <dl className="mt-14 grid sm:grid-cols-3 border-t border-foreground/30">
                {promises.map((p) => (
                  <div key={p.title} className="pt-5 pb-2 sm:pr-6">
                    <dt className="font-semibold">{p.title}</dt>
                    <dd className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.text}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More from the case */}
      <section className="border-t border-foreground px-4 sm:px-6 lg:px-10 pt-24 pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-foreground pb-8 mb-14">
          <h2 className="display text-[3.2rem] sm:text-[4.6rem] lg:text-[5.6rem]">Also in the case</h2>
          <Link to="/shop" className="label link-animated">
            See everything
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
