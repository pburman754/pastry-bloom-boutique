import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { usePageTitle } from '@/hooks/use-page-title';
import PageHead from '@/components/layout/PageHead';
import { silk } from '@/components/motion/Rise';
import { deliveryFor, formatPrice } from '@/lib/shop';

type FieldProps = {
  label: string;
  name: string;
  className?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/** A labelled field: small capitals over a round, ink-ruled input. */
const Field = ({ label, name, className = '', hint, ...input }: FieldProps) => (
  <label className={`block ${className}`}>
    <span className="label">{label}</span>
    <input
      name={name}
      className="mt-2 w-full h-14 px-5 rounded-2xl bg-card border border-foreground/25 text-[16px] placeholder:text-foreground/35 focus:border-foreground focus:outline-none transition-colors duration-300"
      {...input}
    />
    {hint && <span className="mt-2 block text-xs text-muted-foreground">{hint}</span>}
  </label>
);

const Step = ({ n, title, children }: { n: string; title: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: Number(n) * 0.08, ease: silk }}
    aria-labelledby={`step-${n}`}
    className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-foreground pt-8 pb-12"
  >
    <div className="col-span-12 md:col-span-3 flex md:block items-baseline gap-4">
      <p className="display text-[2.2rem] leading-none text-muted-foreground tabular">{n}</p>
      <h2 id={`step-${n}`} className="display text-[2.2rem] md:mt-2">
        {title}
      </h2>
    </div>
    <div className="col-span-12 md:col-span-9 grid grid-cols-2 gap-x-4 gap-y-6">{children}</div>
  </motion.section>
);

const Checkout = () => {
  usePageTitle('Checkout');
  const { items, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const orderPlaced = useRef(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  const delivery = deliveryFor(total);
  const grandTotal = total + delivery;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // A demo shop: a short pause stands in for the payment provider.
    await new Promise((resolve) => setTimeout(resolve, 1600));

    const order = {
      id: `MD-${Date.now().toString(36).toUpperCase().slice(-6)}`,
      items: items.map(({ id, name, image, price, quantity }) => ({ id, name, image, price, quantity })),
      subtotal: total,
      deliveryFee: delivery,
      total: grandTotal,
      firstName: form.firstName,
      email: form.email,
      city: form.city,
    };

    toast({ title: 'Order placed', description: `${order.id} is with our bakers.` });
    orderPlaced.current = true;
    navigate('/order-success', { state: { order }, replace: true });
    clearCart();
  };

  if (items.length === 0 && !orderPlaced.current) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="overflow-x-clip">
      <PageHead
        title="Checkout"
        note={
          <Link to="/cart" className="group inline-flex items-center gap-2 text-foreground">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-500 ease-silk group-hover:-translate-x-1" />
            <span className="link-animated">Back to your box</span>
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="px-4 sm:px-6 lg:px-10 pt-10 pb-32 grid grid-cols-12 gap-x-10 gap-y-12 items-start">
        <div className="col-span-12 lg:col-span-8">
          <Step n="1" title="Your details">
            <Field label="First name" name="firstName" value={form.firstName} onChange={onChange} autoComplete="given-name" required className="col-span-2 sm:col-span-1" />
            <Field label="Last name" name="lastName" value={form.lastName} onChange={onChange} autoComplete="family-name" required className="col-span-2 sm:col-span-1" />
            <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" required className="col-span-2 sm:col-span-1" hint="For your receipt, nothing else." />
            <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" required className="col-span-2 sm:col-span-1" hint="The driver rings when they're outside." />
          </Step>

          <Step n="2" title="Delivery">
            <Field label="Street address" name="address" value={form.address} onChange={onChange} autoComplete="street-address" required className="col-span-2" />
            <Field label="City" name="city" value={form.city} onChange={onChange} autoComplete="address-level2" required className="col-span-2 sm:col-span-1" />
            <Field label="Postal code" name="postalCode" value={form.postalCode} onChange={onChange} autoComplete="postal-code" required className="col-span-2 sm:col-span-1" />
            <label className="block col-span-2">
              <span className="label">A note for us (optional)</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={onChange}
                rows={3}
                placeholder="Door code, the date for your cake, a message to pipe on it…"
                className="mt-2 w-full px-5 py-4 rounded-2xl bg-card border border-foreground/25 text-[16px] placeholder:text-foreground/35 focus:border-foreground focus:outline-none transition-colors duration-300 resize-none"
              />
            </label>
          </Step>

          <Step n="3" title="Payment">
            <p className="col-span-2 rounded-2xl bg-secondary border border-foreground px-5 py-4 text-sm leading-relaxed">
              <span className="font-semibold">This is a demo shop.</span> No card is charged. Use 4242 4242 4242 4242,
              any future date and any three digits.
            </p>
            <Field label="Card number" name="cc-number" inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" required className="col-span-2" />
            <Field label="Expiry" name="cc-exp" autoComplete="cc-exp" placeholder="MM / YY" required className="col-span-1" />
            <Field label="CVC" name="cc-csc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" required className="col-span-1" />
            <Field label="Name on card" name="cc-name" autoComplete="cc-name" required className="col-span-2" />
          </Step>
        </div>

        {/* The ticket */}
        <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-28">
          <div className="rounded-[1.75rem] border border-foreground bg-card p-7 sm:p-8">
            <div className="flex items-baseline justify-between">
              <h2 className="display text-[1.9rem]">Summary</h2>
              <p className="label text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'piece' : 'pieces'}
              </p>
            </div>

            <ul className="mt-7 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="grid grid-cols-[3.25rem_1fr_auto] items-center gap-4">
                  <span className="relative arch aspect-[4/5] border border-foreground bg-muted">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium leading-snug truncate">{item.name}</span>
                    <span className="block text-sm text-muted-foreground tabular">× {item.quantity}</span>
                  </span>
                  <span className="tabular">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-7 pt-6 border-t border-foreground/30 space-y-3 text-[15px]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Pieces</dt>
                <dd className="tabular">{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Delivery, today</dt>
                <dd className="tabular">{delivery === 0 ? 'Free' : formatPrice(delivery)}</dd>
              </div>
            </dl>

            <div className="mt-6 pt-6 border-t border-foreground flex items-baseline justify-between gap-4">
              <span className="text-[15px] font-semibold">Total</span>
              <span className="display text-[3rem] tabular leading-none">{formatPrice(grandTotal)}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-ink w-full mt-8 disabled:opacity-80 disabled:cursor-wait ${isSubmitting ? '' : '!justify-between'}`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden />
                  Sending to the bakers
                </>
              ) : (
                <>
                  <span>Place order</span>
                  <span className="tabular font-medium">{formatPrice(grandTotal)}</span>
                </>
              )}
            </button>
            <p className="mt-5 text-center text-sm text-muted-foreground">Order before 2 pm and it arrives today.</p>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;
