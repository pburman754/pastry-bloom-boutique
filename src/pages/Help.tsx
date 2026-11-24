import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHead from '@/components/layout/PageHead';
import { silk } from '@/components/motion/Rise';
import { usePageTitle } from '@/hooks/use-page-title';
import { DELIVERY_FEE, FREE_DELIVERY_FROM, formatPrice } from '@/lib/shop';

const questions = [
  {
    q: 'How fresh is it, really?',
    a: 'Everything is baked the morning it leaves the shop. Croissants are at their best that day; sourdough keeps for three days wrapped in a cloth.',
  },
  {
    q: 'Can I order a cake for a date?',
    a: 'Celebration cakes need 48 hours. Add the cake to your box and write the date and any message in the note at checkout.',
  },
  {
    q: 'Do you cater for allergies?',
    a: 'Our kitchen handles nuts, gluten, eggs and dairy every day, so we can’t promise any bake is free of them. Every product page lists what goes in.',
  },
  {
    q: 'Can I collect instead?',
    a: 'Yes. Leave a note at checkout and your box will wait for you at the counter on Rue de la Paix, 7 am to 7 pm.',
  },
];

const Section = ({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.9, ease: silk }}
    className="scroll-mt-28 grid grid-cols-12 gap-x-6 gap-y-6 border-b border-foreground py-12 lg:py-16"
  >
    <div className="col-span-12 md:col-span-4 lg:col-span-5 flex md:block items-baseline gap-4">
      <p className="label opacity-60">{n}</p>
      <h2 className="display text-[2.8rem] sm:text-[3.6rem] md:mt-4">{title}</h2>
    </div>
    <div className="col-span-12 md:col-span-8 lg:col-span-7 text-[17px] leading-relaxed">{children}</div>
  </motion.section>
);

const Help = () => {
  usePageTitle('Help');

  return (
    <div className="overflow-x-clip">
      <PageHead kicker="Help" aside="Delivery · Returns · Questions" title="Good to" italic="know." />

      <div className="px-4 sm:px-6 lg:px-10 pb-32">
        <Section id="delivery" n="01" title="Delivery">
          <p>
            Order before 2 pm and your box leaves the shop the same day, anywhere in Paris. Order in the evening and it
            arrives by noon the next morning, baked that dawn.
          </p>
          <dl className="mt-8 grid sm:grid-cols-2 border-t border-foreground/30">
            <div className="pt-5 sm:pr-6">
              <dt className="label opacity-60">From {formatPrice(FREE_DELIVERY_FROM)}</dt>
              <dd className="mt-2 display text-[2.4rem]">Free</dd>
            </div>
            <div className="pt-5">
              <dt className="label opacity-60">Below that</dt>
              <dd className="mt-2 display text-[2.4rem] tabular">{formatPrice(DELIVERY_FEE)}</dd>
            </div>
          </dl>
        </Section>

        <Section id="returns" n="02" title="Returns">
          <p>
            Pastry can&rsquo;t come back to the shop. If something arrives damaged or isn&rsquo;t what you ordered, tell
            us the same day and we&rsquo;ll bake it again or refund it in full.
          </p>
        </Section>

        <Section id="faq" n="03" title="Questions">
          <ul className="border-t border-foreground/30">
            {questions.map((item) => (
              <li key={item.q} className="border-b border-foreground/30">
                <details className="group">
                  <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="display text-[1.7rem] leading-tight">{item.q}</span>
                    <span className="grid place-items-center shrink-0 w-10 h-10 rounded-full border border-foreground transition-[transform,background-color] duration-500 ease-silk group-open:rotate-45 group-open:bg-accent">
                      <Plus className="w-4 h-4" strokeWidth={1.8} />
                    </span>
                  </summary>
                  <p className="pb-6 pr-16 text-muted-foreground">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" n="04" title="Contact">
          <p>
            Maison Dorée is a concept shop, designed and built by Priyanshu Burman. No real orders are baked or charged,
            so feel free to try every part of it, checkout included.
          </p>
          <Link to="/shop" className="btn-ink mt-8">
            Try the shop
          </Link>
        </Section>
      </div>
    </div>
  );
};

export default Help;
