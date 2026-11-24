import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/shop';

/** Today's batches, in Paris time. Each sells down over the morning; croissants are baked twice. */
const batches = [
  { at: '06:10', id: '1', made: 60 },
  { at: '06:45', id: '6', made: 36 },
  { at: '07:30', id: '3', made: 24 },
  { at: '09:00', id: '2', made: 96 },
  { at: '11:00', id: '5', made: 40 },
  { at: '13:30', id: '1', made: 48, second: true },
];

const OPENS = 6 * 60; // the first batch is out at 06:10
const CLOSES = 19 * 60;
const IN_THE_OVEN = 25; // minutes before a batch comes out
const JUST_OUT = 30; // minutes after
const SELL_THROUGH = 300; // minutes for a batch to sell out

const minutesOf = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Minutes since midnight in Paris, whatever the visitor's own time zone. */
const parisNow = (date: Date) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get('hour') * 60 + get('minute');
};

const clock = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

const wait = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `in ${h} h ${m ? `${m} min` : ''}`.trim() : `in ${m} min`;
};

type Status =
  | { kind: 'later'; text: string }
  | { kind: 'oven'; text: string }
  | { kind: 'fresh'; text: string; left: number }
  | { kind: 'shelf'; text: string; left: number }
  | { kind: 'gone'; text: string };

const statusOf = (now: number, at: number, made: number, closed: boolean): Status => {
  if (closed) return { kind: 'later', text: 'Tomorrow' };
  if (now < at - IN_THE_OVEN) return { kind: 'later', text: `Out ${wait(at - now)}` };
  if (now < at) return { kind: 'oven', text: 'In the oven' };
  const left = Math.max(0, made - Math.floor(((now - at) / SELL_THROUGH) * made));
  if (left === 0) return { kind: 'gone', text: 'Sold out' };
  if (now - at < JUST_OUT) return { kind: 'fresh', text: `Just out, ${left} on the tray`, left };
  return { kind: 'shelf', text: `${left} left`, left };
};

/**
 * The letter board by the till: what came out of the oven this morning, what's still in it,
 * and how many are left. Runs on Paris time and updates while you read it.
 */
const OvenBoard = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [now, setNow] = useState(() => parisNow(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => setNow(parisNow(new Date())), 20_000);
    return () => window.clearInterval(timer);
  }, []);

  const closed = now >= CLOSES || now < OPENS;

  return (
    <div className="letter-board rounded-[2rem] border border-foreground text-background px-5 sm:px-10 pt-8 pb-6">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pb-6 border-b border-background/20">
        <h2 className="display text-[2.6rem] sm:text-[3.4rem]">Out of the oven today</h2>
        <p className="flex items-center gap-2.5 text-[15px]">
          <span className={`w-2 h-2 rounded-full ${closed ? 'bg-background/40' : 'bg-accent animate-pulse'}`} aria-hidden />
          Paris, <span className="tabular font-semibold">{clock(now)}</span>
          {closed && <span className="text-background/60">, the shop is closed</span>}
        </p>
      </div>

      <ul>
        {batches.map((batch) => {
          const product = products.find((p) => p.id === batch.id);
          if (!product) return null;
          const status = statusOf(now, minutesOf(batch.at), batch.made, closed);
          const canAdd = status.kind === 'fresh' || status.kind === 'shelf';
          const canReserve = status.kind === 'later' || status.kind === 'oven';
          return (
            <li
              key={`${batch.at}-${batch.id}`}
              className="grid grid-cols-[4.2rem_1fr_auto] sm:grid-cols-[6rem_1fr_13rem_auto] items-center gap-x-4 gap-y-1 py-4 border-b border-background/15 last:border-b-0"
            >
              <span className="display text-[1.9rem] sm:text-[2.3rem] tabular leading-none">{batch.at}</span>
              <Link to={`/product/${product.id}`} className="min-w-0 group">
                <span className="block text-[17px] sm:text-[19px] font-medium truncate group-hover:underline underline-offset-4 decoration-1">
                  {product.name}
                  {batch.second && <span className="text-background/60 font-normal">, second batch</span>}
                </span>
                <span className="sm:hidden block text-sm text-background/70 mt-0.5">{status.text}</span>
              </Link>
              <span
                className={`hidden sm:inline-flex items-center gap-2 text-[15px] ${
                  status.kind === 'gone' || status.kind === 'later' ? 'text-background/55' : ''
                }`}
              >
                {status.kind === 'fresh' && <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />}
                {status.kind === 'oven' && <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--berry))] animate-pulse" aria-hidden />}
                {status.text}
              </span>
              <button
                type="button"
                disabled={!canAdd && !canReserve}
                onClick={() => {
                  addItem(product);
                  toast({
                    title: canAdd ? 'In your box' : 'Reserved',
                    description: canAdd
                      ? `${product.name}, ${formatPrice(product.price)}.`
                      : `${product.name}, set aside from the ${batch.at} batch.`,
                  });
                }}
                className="justify-self-end h-10 px-4 rounded-full border border-background/40 text-[14px] font-medium transition-colors duration-300 hover:bg-accent hover:text-foreground hover:border-accent disabled:opacity-30 disabled:pointer-events-none"
              >
                {canAdd ? `Add, ${formatPrice(product.price)}` : canReserve ? 'Reserve' : 'Gone'}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="pt-5 text-sm text-background/60 max-w-xl">
        We bake in small batches through the morning. When a tray is gone, it&rsquo;s gone until the next one.
      </p>
    </div>
  );
};

export default OvenBoard;
