import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { usePageTitle } from '@/hooks/use-page-title';
import PageHead from '@/components/layout/PageHead';
import QtyStepper from '@/components/products/QtyStepper';
import { silk } from '@/components/motion/Rise';
import { deliveryFor, formatPrice, FREE_DELIVERY_FROM } from '@/lib/shop';
import emptyImage from '@/assets/croissants.jpg';

const Cart = () => {
  usePageTitle('Your box');
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();

  const delivery = deliveryFor(total);
  const toFree = Math.max(0, FREE_DELIVERY_FROM - total);
  const progress = Math.min(1, total / FREE_DELIVERY_FROM);

  const remove = (id: string, name: string) => {
    removeItem(id);
    toast({ title: 'Taken out', description: `${name} is no longer in your box.` });
  };

  if (items.length === 0) {
    return (
      <div className="overflow-x-clip">
        <PageHead kicker="Your box" aside="0 pieces" title="Nothing here" italic="yet." />
        <section className="px-4 sm:px-6 lg:px-10 pt-14 pb-32 grid grid-cols-12 gap-x-6 gap-y-12 items-end">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p className="text-[19px] leading-relaxed max-w-md">
              The morning case is full: croissants still warm, macarons piped to order and cakes built for your
              day.
            </p>
            <Link to="/shop" className="btn-ink mt-10">
              Fill your box <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="col-span-8 col-start-3 md:col-span-4 md:col-start-9 arch aspect-[3/4] border border-foreground">
            <img src={emptyImage} alt="Croissants cooling on a tray" className="w-full h-full object-cover" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-x-clip">
      <PageHead
        kicker="Your box"
        aside={`${itemCount} ${itemCount === 1 ? 'piece' : 'pieces'}`}
        title="Your"
        italic="box."
      />

      <section className="px-4 sm:px-6 lg:px-10 pt-4 pb-32 grid grid-cols-12 gap-x-10 gap-y-14 items-start">
        {/* The pieces */}
        <div className="col-span-12 lg:col-span-8">
          <ul>
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -24, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.6, ease: silk }}
                  className="border-b border-foreground/30 py-7 grid grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr_auto] gap-x-5 sm:gap-x-8 gap-y-5 items-center"
                >
                  <Link to={`/product/${item.id}`} className="arch aspect-[4/5] border border-foreground bg-muted row-span-2 sm:row-span-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-silk hover:scale-105" />
                  </Link>

                  <div className="min-w-0">
                    <p className="label text-[10px] opacity-60">{item.category}</p>
                    <h2 className="mt-2 display text-[1.9rem] sm:text-[2.4rem] leading-[0.95]">
                      <Link to={`/product/${item.id}`} className="hover:opacity-70 transition-opacity">
                        {item.name}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground tabular">{formatPrice(item.price)} each</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 col-start-2 sm:col-start-3">
                    <QtyStepper
                      size="sm"
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q)}
                      label={item.name}
                    />
                    <div className="text-right min-w-[5.5rem]">
                      <p className="font-semibold text-lg tabular">{formatPrice(item.price * item.quantity)}</p>
                      <button
                        type="button"
                        onClick={() => remove(item.id, item.name)}
                        className="mt-1 label text-[10px] opacity-60 hover:opacity-100 link-animated"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-8 flex items-center justify-between gap-4 label">
            <Link to="/shop" className="group inline-flex items-center gap-2">
              <span className="link-animated">Keep browsing</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-silk group-hover:translate-x-1" />
            </Link>
            <button type="button" onClick={clearCart} className="uppercase opacity-60 hover:opacity-100 link-animated">
              Empty the box
            </button>
          </div>
        </div>

        {/* The ticket */}
        <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-28">
          <div className="rounded-[1.75rem] border border-foreground bg-card p-7 sm:p-8">
            <p className="label">The ticket</p>

            <dl className="mt-7 space-y-3 text-[15px]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Pieces ({itemCount})</dt>
                <dd className="tabular">{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Delivery, today</dt>
                <dd className="tabular">{delivery === 0 ? 'Free' : formatPrice(delivery)}</dd>
              </div>
            </dl>

            {/* How far to free delivery */}
            <div className="mt-6">
              <div className="h-2 rounded-full border border-foreground overflow-hidden">
                <motion.div
                  className="h-full bg-accent origin-left"
                  initial={false}
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.8, ease: silk }}
                />
              </div>
              <p className="mt-2.5 text-sm">
                {toFree > 0 ? (
                  <>
                    <span className="font-semibold tabular">{formatPrice(toFree)}</span> more and delivery is on us.
                  </>
                ) : (
                  'Delivery is on us.'
                )}
              </p>
            </div>

            <div className="mt-7 pt-6 border-t border-foreground flex items-baseline justify-between gap-4">
              <span className="label">Total</span>
              <span className="display text-[3rem] tabular leading-none">{formatPrice(total + delivery)}</span>
            </div>

            <Link to="/checkout" className="btn-ink w-full mt-8">
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-5 text-center text-sm text-muted-foreground">Order by 2 pm for delivery today.</p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Cart;
