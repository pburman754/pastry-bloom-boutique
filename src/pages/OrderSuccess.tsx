import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Rise, silk } from '@/components/motion/Rise';
import { usePageTitle } from '@/hooks/use-page-title';
import { formatPrice } from '@/lib/shop';

interface PlacedOrder {
  id: string;
  items: { id: string; name: string; image: string; price: number; quantity: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  firstName: string;
  email: string;
  city: string;
}

const OrderSuccess = () => {
  usePageTitle('Merci');
  const { state } = useLocation() as { state: { order?: PlacedOrder } | null };
  const order = state?.order;
  const placedAt = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="overflow-x-clip">
      <section className="bg-accent border-b border-foreground px-4 sm:px-6 lg:px-10 pt-10 pb-28">
        <div className="flex justify-between label opacity-70">
          <span>Order confirmed</span>
          {order && <span className="tabular">{order.id}</span>}
        </div>

        <div className="mt-8 grid grid-cols-12 gap-x-10 gap-y-14 items-start">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="display text-[19vw] sm:text-[13vw] lg:text-[10rem] leading-[0.84]">
              <Rise delay={0.05}>Merci{order?.firstName ? ',' : '.'}</Rise>
              {order?.firstName && (
                <Rise delay={0.18}>
                  <span className="display-italic">{order.firstName}.</span>
                </Rise>
              )}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: silk }}
              className="mt-10 max-w-md text-[19px] leading-relaxed"
            >
              Your box is with our bakers. We&rsquo;ll text you when it leaves the shop
              {order?.city ? ` for ${order.city}` : ''}.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.65, ease: silk }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link to="/shop" className="btn-ink">
                Back to the case <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/" className="btn-line">
                Home
              </Link>
            </motion.div>
          </div>

          {/* The receipt, with the shop's stamp on it */}
          {order ? (
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 1.5 }}
              transition={{ duration: 1.2, delay: 0.3, ease: silk }}
              className="relative col-span-12 sm:col-span-10 sm:col-start-2 lg:col-span-5 lg:col-start-8"
            >
              <div className="bg-card border border-foreground rounded-[1.25rem] px-7 sm:px-9 py-9 font-body">
                <div className="text-center">
                  <p className="display text-[2rem] leading-none">
                    Maison <span className="display-italic">Dorée</span>
                  </p>
                  <p className="label text-[9px] tracking-[0.36em] mt-2 opacity-60">Rue de la Paix · Paris 1er</p>
                </div>

                <div className="mt-7 flex justify-between label text-[10px] opacity-70 tabular">
                  <span>{order.id}</span>
                  <span>Today · {placedAt}</span>
                </div>

                <ul className="mt-5 border-y border-dashed border-foreground/50 py-5 space-y-3">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-4 text-[15px]">
                      <span className="min-w-0">
                        <span className="tabular opacity-60 mr-2">{item.quantity}×</span>
                        {item.name}
                      </span>
                      <span className="tabular shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-5 space-y-2 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="opacity-60">Pieces</dt>
                    <dd className="tabular">{formatPrice(order.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="opacity-60">Delivery</dt>
                    <dd className="tabular">{order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between pt-4 mt-2 border-t border-foreground">
                    <dt className="label">Paid</dt>
                    <dd className="display text-[2.6rem] tabular leading-none">{formatPrice(order.total)}</dd>
                  </div>
                </dl>

                <p className="mt-7 text-center text-xs text-muted-foreground">
                  Receipt sent to <span className="text-foreground">{order.email}</span>
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 2.2, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: -14 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 1.25 }}
                className="absolute -bottom-16 -left-4 sm:-left-16 grid place-items-center w-32 h-32 rounded-full border-2 border-[hsl(var(--berry))] text-[hsl(var(--berry))] mix-blend-multiply"
                aria-hidden
              >
                <span className="absolute inset-1.5 rounded-full border border-[hsl(var(--berry))]" />
                <span className="text-center">
                  <span className="block label text-[9px] tracking-[0.3em]">Maison Dorée</span>
                  <span className="block display-italic text-[2rem] leading-none my-1">Payé</span>
                  <span className="block label text-[9px] tracking-[0.3em] tabular">{placedAt}</span>
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <p className="col-span-12 lg:col-span-5 lg:col-start-8 text-[17px] leading-relaxed">
              We couldn&rsquo;t find the order on this page, but if you&rsquo;ve just paid, the receipt is in your inbox.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderSuccess;
