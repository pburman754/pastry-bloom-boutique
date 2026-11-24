import { motion, useReducedMotion } from 'framer-motion';
import { silk } from '@/components/motion/Rise';

const STRIPE = 44; // width of one stripe, in px
const DROP = 58; // straight part before the scallop

/**
 * The shop's striped awning with its scalloped edge, unrolling over the front of the house.
 * Drawn as one SVG pattern so the stripes and scallops stay crisp at any width.
 */
const Awning = ({ className = '' }: { className?: string }) => {
  const reduce = useReducedMotion();
  const r = STRIPE / 2 - 1;
  const stripe = (x: number) =>
    `M${x + 1},0 H${x + STRIPE - 1} V${DROP} A${r},${r} 0 0 1 ${x + 1},${DROP} Z`;

  return (
    <motion.div
      aria-hidden
      className={`relative h-[86px] ${className}`}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1.1, delay: 0.1, ease: silk }}
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="awning-stripes" width={STRIPE * 2} height="86" patternUnits="userSpaceOnUse">
            <path d={stripe(0)} fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.25" />
            <path d={stripe(STRIPE)} fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.25" />
          </pattern>
        </defs>
        <rect width="100%" height="86" fill="url(#awning-stripes)" />
        {/* The rail the awning rolls out from */}
        <rect width="100%" height="7" fill="hsl(var(--foreground))" />
      </svg>
    </motion.div>
  );
};

export default Awning;
