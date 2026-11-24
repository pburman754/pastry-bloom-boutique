import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rise, silk } from '@/components/motion/Rise';
import { usePageTitle } from '@/hooks/use-page-title';

/** Shown for any address we don't have, and for a product that no longer exists. */
const NotFound = () => {
  usePageTitle('Not found');
  const { pathname } = useLocation();

  return (
    <section className="paper overflow-x-clip min-h-[calc(100svh-76px)] flex flex-col px-4 sm:px-6 lg:px-10 pt-10 pb-20">

      <div className="flex-1 flex flex-col justify-center py-12">
        <h1 className="display text-[19vw] lg:text-[13rem] leading-[0.82] max-w-[9ch]">
          <Rise delay={0.05}>Not on the shelf</Rise>
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: silk }}
          className="mt-12 grid grid-cols-12 gap-6 items-end"
        >
          <p className="col-span-12 md:col-span-5 text-[19px] leading-relaxed">
            There&rsquo;s no page at <span className="font-semibold break-all">{pathname}</span>. It may have moved, or
            the link has a typo.
          </p>
          <div className="col-span-12 md:col-span-7 flex flex-wrap md:justify-end gap-3">
            <Link to="/shop" className="btn-ink">
              See today&rsquo;s case
            </Link>
            <Link to="/" className="btn-line">
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
