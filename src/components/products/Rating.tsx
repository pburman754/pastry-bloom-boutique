import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Five-star rating with fractional fill (e.g. 4.6 renders 4 full stars + a 60% star).
 */
const Rating = ({ value, size = 'sm', className }: RatingProps) => {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className={cn('relative inline-block', dim)}>
            <Star className={cn('absolute inset-0 text-accent/30', dim)} />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={cn('text-accent fill-accent', dim)} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
