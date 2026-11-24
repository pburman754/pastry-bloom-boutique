import { motion } from 'framer-motion';
import { Check, Truck, Mail, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
  const { state } = useLocation() as { state: { order?: PlacedOrder } | null };
  const order = state?.order;

  return (
    <div className="min-h-[80vh] py-16 bg-gradient-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-3xl shadow-luxury p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-3">
            Order confirmed
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Merci{order?.firstName ? `, ${order.firstName}` : ''}!
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Our bakers have your order. We&rsquo;ll have it ready and on its way to you today.
          </p>

          {order && (
            <div className="text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-muted rounded-xl px-5 py-4 mb-6">
                <span className="text-sm text-muted-foreground">Order number</span>
                <span className="font-display text-lg font-semibold tracking-wide">{order.id}</span>
              </div>

              <ul className="space-y-4 mb-6">
                {order.items.map(item => (
                  <li key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <Separator className="mb-4" />
              <dl className="space-y-2 text-sm mb-8">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>${order.subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery</dt>
                  <dd>{order.deliveryFee === 0 ? 'Free' : `$${order.deliveryFee.toFixed(2)}`}</dd>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2">
                  <dt>Total</dt>
                  <dd className="font-display text-xl">${order.total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                <div className="flex gap-3 items-start rounded-xl border border-border p-4">
                  <Truck className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Same-day delivery</p>
                    <p className="text-sm text-muted-foreground">To {order.city || 'your address'}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start rounded-xl border border-border p-4">
                  <Mail className="w-5 h-5 text-accent mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Receipt sent</p>
                    <p className="text-sm text-muted-foreground truncate">{order.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-gradient-luxury font-semibold px-8 rounded-full">
              <Link to="/shop">
                Continue shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-semibold px-8 bg-transparent">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
