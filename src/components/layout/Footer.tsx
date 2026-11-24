import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
      { name: 'Contact', href: '/contact' },
      { name: 'Delivery', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
];

const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'Pinterest', href: '#' },
  { name: 'TikTok', href: '#' },
];

const Footer = () => (
  <footer className="paper border-t border-foreground overflow-hidden">
    <div className="px-4 sm:px-6 lg:px-10 pt-20">
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="label opacity-60">The morning letter</p>
          <p className="mt-4 display text-[2.6rem] leading-[0.95] max-w-md">
            New bakes, first. <span className="display-italic">Once a week.</span>
          </p>
          <form
            className="mt-8 flex max-w-md border-b border-foreground"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent py-4 text-[17px] placeholder:text-foreground/45 focus:outline-none"
            />
            <button type="submit" className="grid place-items-center w-12" aria-label="Subscribe">
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </form>
        </div>

        {footerSections.map((section) => (
          <div key={section.title} className="col-span-6 sm:col-span-4 lg:col-span-2">
            <p className="label opacity-60">{section.title}</p>
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

        <div className="col-span-6 sm:col-span-4 lg:col-span-1">
          <p className="label opacity-60">Visit</p>
          <address className="mt-5 not-italic text-[15px] leading-relaxed">
            123 Rue de la Paix<br />Paris 75001<br />7 am – 7 pm
          </address>
        </div>
      </div>

      <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-foreground/30 pt-6 label text-[10px]">
        <span className="opacity-60">© 2026 Maison Dorée · A concept by Priyanshu Burman</span>
        <span className="flex gap-6">
          {socialLinks.map((s) => (
            <a key={s.name} href={s.href} className="link-animated">{s.name}</a>
          ))}
        </span>
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
