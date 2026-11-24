import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Rise, silk } from '@/components/motion/Rise';
import { usePageTitle } from '@/hooks/use-page-title';

/** Shown for any address we don't have, and for a product that no longer exists. */
const NotFound = () => {
  usePageTitle('Not found');
  const { pathname } = useLocation();

  return (
    <section className="paper overflow-x-clip min-h-[calc(100svh-76px)] flex flex-col px-4 sm:px-6 lg:px-10 pt-10 pb-20">
      <div className="flex justify-between gap-4 label opacity-70">
        <span>404</span>
        <span className="truncate max-w-[60%] normal-case tracking-normal font-normal text-sm">{pathname}</span>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12">
        <h1 className="display text-[24vw] lg:text-[17rem] leading-[0.82]">
          <Rise delay={0.05}>
            Sold <span className="display-italic">out.</span>
          </Rise>
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: silk }}
          className="mt-12 grid grid-cols-12 gap-6 items-end"
        >
          <p className="col-span-12 md:col-span-5 text-[19px] leading-relaxed">
            This page went the way of the last croissant. Everything else is still warm.
          </p>
          <div className="col-span-12 md:col-span-7 flex flex-wrap md:justify-end gap-3">
            <Link to="/shop" className="btn-ink">
              See today&rsquo;s case <ArrowRight className="w-4 h-4" />
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
