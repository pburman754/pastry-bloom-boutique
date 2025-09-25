import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Heart } from 'lucide-react';
import { Product } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`}>
        <div className="card-luxury overflow-hidden bg-card border border-border group-hover:border-primary/20">
          {/* Product Image */}
          <div className="relative overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay with badges */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              {product.isNew && (
                <Badge className="bg-accent text-accent-foreground font-medium">
                  New
                </Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-primary text-primary-foreground font-medium">
                  Featured
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
            >
              <Heart className="w-4 h-4" />
            </Button>

            {/* Quick Add Button */}
            <Button
              onClick={handleAddToCart}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-foreground hover:bg-primary hover:text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {/* Product Details */}
          <div className="p-4 space-y-3">
            {/* Category */}
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="font-display font-medium text-lg text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-accent fill-accent'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xl font-display font-semibold text-foreground">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Free delivery over $50
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;