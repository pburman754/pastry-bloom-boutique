import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, Product } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/shop';

interface ProductCardProps {
  product: Product;
}

/** A bake in the case: arched window, its name, a line about it and the price. */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const shelf = categories.find((c) => c.id === product.category)?.name ?? product.category;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({ title: 'In your box', description: `${product.name}, ${formatPrice(product.price)}.` });
  };

  return (
    <article className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <div className="arch aspect-[4/5] bg-muted border border-foreground">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]"
            />
          </div>

          {product.isNew && (
            <span className="absolute top-7 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--berry))] text-white border border-foreground px-3.5 py-1 fr text-[15px]">
              nouveau
            </span>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to your box`}
            className="absolute -bottom-6 right-6 grid place-items-center w-14 h-14 rounded-full bg-accent text-foreground border border-foreground transition-transform duration-500 ease-silk hover:rotate-90 hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        <div className="pt-8 pr-20">
          <p className="text-[14px] text-muted-foreground">{shelf}</p>
          <h3 className="mt-2 display text-[2rem] leading-[0.95]">{product.name}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground line-clamp-2">{product.description}.</p>
          <p className="mt-4 text-lg font-semibold tabular">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
