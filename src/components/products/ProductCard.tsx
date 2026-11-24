import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '@/data/mockData';
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
    toast({ title: 'In your box', description: `${product.name}, $${product.price.toFixed(2)}.` });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <div className="arch aspect-[4/5] bg-muted border border-foreground">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.07]"
            />
          </div>

          {product.isNew && (
            <span className="absolute top-6 left-1/2 -translate-x-1/2 label text-[10px] bg-[hsl(var(--berry))] text-white rounded-full px-3 py-1">
              New
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
          <p className="label text-[10px] opacity-60">
            {String(index + 1).padStart(2, '0')} — {product.category}
          </p>
          <h3 className="mt-3 display text-[2rem] leading-[0.95]">{product.name}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
          <p className="mt-4 font-body text-lg font-semibold tabular">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;
