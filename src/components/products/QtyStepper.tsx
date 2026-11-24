import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  /** What is being counted, for screen readers: "Classic Butter Croissant" */
  label: string;
  className?: string;
}

/** A round, ink-ruled quantity control. */
const QtyStepper = ({ value, onChange, min = 1, max = 20, size = 'md', label, className }: QtyStepperProps) => {
  const button = cn(
    'grid place-items-center h-full transition-colors duration-300 hover:bg-foreground hover:text-background disabled:opacity-25 disabled:pointer-events-none',
    size === 'md' ? 'w-12' : 'w-9',
  );
  const icon = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div
      role="group"
      aria-label={`Quantity of ${label}`}
      className={cn(
        'inline-flex items-center overflow-hidden rounded-full border border-foreground',
        size === 'md' ? 'h-14' : 'h-10',
        className,
      )}
    >
      <button type="button" className={button} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="One fewer">
        <Minus className={icon} strokeWidth={1.8} />
      </button>
      <span className={cn('text-center font-semibold tabular', size === 'md' ? 'w-10' : 'w-8 text-sm')} aria-live="polite">
        {value}
      </span>
      <button type="button" className={button} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="One more">
        <Plus className={icon} strokeWidth={1.8} />
      </button>
    </div>
  );
};

export default QtyStepper;
