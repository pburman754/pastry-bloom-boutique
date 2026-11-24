import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { name: 'Croissants', href: '/shop?category=croissants' },
      { name: 'Macarons', href: '/shop?category=macarons' },
      { name: 'Artisan breads', href: '/shop?category=breads' },
      { name: 'Celebration cakes', href: '/shop?category=cakes' },
    ],
  },
  {
    title: 'House',
    links: [
      { name: 'Our story', href: '/#story' },
      { name: 'Collections', href: '/#collections' },
      { name: 'Reviews', href: '/#reviews' },
    ],
  },
  {
    title: 'Help',
    links: [
      { name: 'Delivery', href: '/help#delivery' },
      { name: 'Returns', href: '/help#returns' },
      { name: 'Questions', href: '/help#faq' },
      { name: 'Contact', href: '/help#contact' },
    ],
  },
];

/** The weekly letter: a demo, so it thanks you and keeps nothing. */
const Newsletter = () => {
  const [sent, setSent] = useState(false);
  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.p
          key="sent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-md border-b border-foreground py-4 text-[17px]"
          role="status"
        >
          Merci. The first letter arrives Thursday, with the new bakes.
        </motion.p>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0, y: -10 }}
          className="mt-8 flex max-w-md border-b border-foreground"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <input
            id="footer-email"
            type="email"
            required
            placeholder="Your email"
            className="flex-1 bg-transparent py-4 text-[17px] placeholder:text-foreground/45 focus:outline-none"
          />
          <button type="submit" className="group grid place-items-center w-12" aria-label="Subscribe">
            <ArrowRight className="w-5 h-5 transition-transform duration-500 ease-silk group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="paper border-t border-foreground overflow-hidden">
    <div className="px-4 sm:px-6 lg:px-10 pt-20">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="display text-[2.6rem] leading-[0.95] max-w-md">New bakes, first, once a week.</p>
          <p className="mt-3 text-[15px] text-muted-foreground max-w-sm">A short letter on Thursdays: what&rsquo;s new in the case and what&rsquo;s coming.</p>
          <Newsletter />
        </div>

        {footerSections.map((section) => (
          <div key={section.title} className="col-span-6 sm:col-span-4 lg:col-span-2">
            <p className="label text-muted-foreground">{section.title}</p>
            <ul className="mt-5 space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="link-animated text-[15px]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
          <p className="label text-muted-foreground">Visit</p>
          <address className="mt-5 not-italic text-[15px] leading-relaxed">
            123 Rue de la Paix<br />Paris 75001<br />7 am – 7 pm
          </address>
        </div>
      </div>

      <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-foreground/30 pt-6 label">
        <span className="text-muted-foreground">© 2026 Maison Dorée, a concept shop designed and built by Priyanshu Burman</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="link-animated">Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 transition-transform duration-500 ease-silk group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>

    <p
      aria-hidden
      className="display text-[21vw] leading-[0.75] tracking-[-0.06em] whitespace-nowrap text-center translate-y-[18%] mt-10 select-none"
    >
      Maison <span className="display-italic">Dorée</span>
    </p>
  </footer>
);

export default Footer;
