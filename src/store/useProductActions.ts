import type { Product as ProductItem } from '../data/products';
import { addToCart } from './cart';

export type AddCallback = (product: ProductItem, quantity: number) => void;
/** Si la tienda actual ya tiene carrito, pasar el callback para usarlo sin duplicar el pedido. */
export function addProduct(product: ProductItem, quantity: number, onAddToCart?: AddCallback) {
  if (onAddToCart) onAddToCart(product, quantity);
  else addToCart(product, quantity);
}
