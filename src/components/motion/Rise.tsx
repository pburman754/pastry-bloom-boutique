import React from 'react';
import { motion } from 'framer-motion';

/** The house easing: quick to start, long and soft to settle. */
export const silk = [0.22, 1, 0.36, 1] as const;

const line = {
  hidden: { y: '105%' },
  shown: { y: 0 },
};

/**
 * A line of display type rising out of its own mask.
 * With onView it waits until the line scrolls into sight. The mask is what gets watched:
 * the line itself starts clipped out of view, so it could never be "seen" on its own.
 */
export const Rise = ({
  children,
  delay = 0,
  className = '',
  onView = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onView?: boolean;
}) => (
  <motion.span
    className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`}
    initial="hidden"
    {...(onView ? { whileInView: 'shown', viewport: { once: true, amount: 0.3 } } : { animate: 'shown' })}
  >
    <motion.span className="block" variants={line} transition={{ duration: 1.3, delay, ease: silk }}>
      {children}
    </motion.span>
  </motion.span>
);
