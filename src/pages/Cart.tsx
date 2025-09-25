import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, X, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();

  const deliveryFee = total > 50 ? 0 : 5.99;
  const subtotal = total;
  const finalTotal = subtotal + deliveryFee;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      });
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover our exquisite collection of artisanal pastries and luxury desserts.
            </p>
            <Button
              asChild
              className="bg-gradient-luxury hover:shadow-luxury font-semibold px-8"
            >
              <Link to="/shop">
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-4">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground text-lg">
            Review your selections and proceed to checkout
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Items ({itemCount})
              </h2>
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-luxury p-6 bg-card border border-border"
                >
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="secondary" className="text-xs mb-2">
                            {item.category}
                          </Badge>
                          <h3 className="font-display font-semibold text-foreground mb-1">
                            <Link
                              to={`/product/${item.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description.substring(0, 100)}...
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-foreground">Qty:</span>
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-3 hover:bg-muted"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-3 hover:bg-muted"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-display font-semibold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card-luxury p-6 bg-card border border-border sticky top-8">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <div className="text-right">
                    {deliveryFee > 0 ? (
                      <>
                        <span className="font-medium text-foreground">${deliveryFee.toFixed(2)}</span>
                        <p className="text-xs text-muted-foreground">
                          Free over $50
                        </p>
                      </>
                    ) : (
                      <span className="font-medium text-accent">Free</span>
                    )}
                  </div>
                </div>

                {total < 50 && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                    <p className="text-sm text-accent font-medium">
                      Add ${(50 - total).toFixed(2)} more for free delivery!
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-display font-bold text-foreground text-xl">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <Button
                  asChild
                  className="w-full bg-gradient-luxury hover:shadow-luxury font-semibold py-3 text-lg"
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full font-medium"
                >
                  <Link to="/shop">
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-border space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-4 h-4 bg-accent rounded-full mr-2 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  Secure checkout with SSL encryption
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-4 h-4 bg-accent rounded-full mr-2 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  Same-day delivery available
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-4 h-4 bg-accent rounded-full mr-2 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  Fresh guarantee on all items
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;