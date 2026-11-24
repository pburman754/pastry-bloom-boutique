import React from 'react';
import { Rise } from '@/components/motion/Rise';

interface PageHeadProps {
  /** Small capitals above the title, left: "Shop", "Your box" */
  kicker: string;
  /** Small capitals above the title, right */
  aside?: React.ReactNode;
  title: string;
  /** The last words, set in italic */
  italic?: string;
  children?: React.ReactNode;
}

/** The head of every inner page: a poster line of type over a ruled edge. */
const PageHead = ({ kicker, aside, title, italic, children }: PageHeadProps) => (
  <header className="paper px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10">
    <div className="flex items-center justify-between gap-4 label opacity-70">
      <span>{kicker}</span>
      {aside && <span className="text-right">{aside}</span>}
    </div>
    <h1 className="display mt-6 sm:mt-8 text-[17vw] sm:text-[12vw] lg:text-[9.5rem] xl:text-[11rem] leading-[0.84] pb-6 sm:pb-8">
      <Rise delay={0.05}>
        {title} {italic && <span className="display-italic">{italic}</span>}
      </Rise>
    </h1>
    <div className="border-t border-foreground">{children}</div>
  </header>
);

export default PageHead;
