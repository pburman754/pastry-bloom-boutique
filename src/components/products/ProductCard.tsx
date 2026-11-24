import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';
import { Product } from '@/data/mockData';
import Rating from '@/components/products/Rating';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({ title: 'Added to your box', description: `${product.name} is waiting in your cart.` });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({ title: 'Saved for later', description: `${product.name} is on your wishlist.` });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-muted aspect-[4/5]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(22_40%_8%/0.45)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="rounded-full bg-primary/85 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                Bestseller
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={`Save ${product.name} for later`}
            className="absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full bg-background/90 backdrop-blur text-foreground shadow-card opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 transition-all duration-500 ease-silk hover:text-accent"
          >
            <Heart className="w-4 h-4" strokeWidth={1.8} />
          </button>

          <div className="absolute inset-x-4 bottom-4 translate-y-[calc(100%+1rem)] group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-700 ease-silk">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full h-12 rounded-full bg-background text-foreground font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-luxury hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              Add to box · <span className="tabular">${product.price.toFixed(2)}</span>
            </button>
          </div>
        </div>

        <div className="pt-5 px-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{product.category}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Rating value={product.rating} />
              <span className="tabular">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-[1.65rem] font-semibold leading-tight text-foreground">
              <span className="bg-[linear-gradient(hsl(var(--gold)),hsl(var(--gold)))] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] group-hover:bg-[length:100%_1px] transition-[background-size] duration-700 ease-silk">
                {product.name}
              </span>
            </h3>
            <p className="font-display text-2xl font-semibold text-foreground tabular shrink-0">${product.price.toFixed(2)}</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;
