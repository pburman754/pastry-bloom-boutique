import React from 'react';
import { Rise } from '@/components/motion/Rise';

interface PageHeadProps {
  title: React.ReactNode;
  /** One short line of useful context, set beside the title: a count, a way back */
  note?: React.ReactNode;
  children?: React.ReactNode;
}

/** The head of every inner page: a poster line of type over a ruled edge. */
const PageHead = ({ title, note, children }: PageHeadProps) => (
  <header className="paper px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14">
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 pb-6 sm:pb-8">
      <h1 className="display text-[17vw] sm:text-[12vw] lg:text-[9.5rem] xl:text-[11rem] leading-[0.84]">
        <Rise delay={0.05}>{title}</Rise>
      </h1>
      {note && <div className="label text-muted-foreground lg:pb-4">{note}</div>}
    </div>
    <div className="border-t border-foreground">{children}</div>
  </header>
);

export default PageHead;
