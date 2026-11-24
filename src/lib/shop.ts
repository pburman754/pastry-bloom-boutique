/** Prices are shown the same way everywhere: dollars, two decimals. */
export const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

/** Delivery is free from this order value; below it, a flat fee. */
export const FREE_DELIVERY_FROM = 50;
export const DELIVERY_FEE = 5.99;

export const deliveryFor = (subtotal: number) => (subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE);
