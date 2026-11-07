import { useSyncExternalStore } from 'react';
import type { Product as ProductItem } from '../data/products';
import { productSlug } from './productAdapter';

const CART_KEY = 'royalraymi:cart:v2';
export type CartLine = { key: string; product: ProductItem; quantity: number };
const listeners = new Set<() => void>();
let lines: CartLine[] = [];
const EMPTY: CartLine[] = [];
let hydrated = false;
const notify = () => listeners.forEach(listener => listener());
const ensure = () => {
  if (hydrated) return;
  hydrated = true;
  try {
    const saved = localStorage.getItem(CART_KEY);
    const data: unknown = saved ? JSON.parse(saved) : [];
    if (Array.isArray(data)) {
      lines = data.filter((row): row is CartLine => !!row && typeof row === 'object' && typeof row.key === 'string' && !!row.product && Number.isSafeInteger(row.quantity) && row.quantity > 0);
    }
  } catch { lines = []; }
};
const update = (next: CartLine[]) => {
  lines = next;
  try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch { /* almacenamiento bloqueado */ }
  notify();
};
export function addToCart(product: ProductItem, amount = 1) {
  ensure();
  const quantity = Math.min(99, Math.max(1, Math.floor(amount)));
  const key = productSlug(product);
  const found = lines.find(line => line.key === key);
  if (found) update(lines.map(line => line.key === key ? { ...line, quantity: Math.min(99, line.quantity + quantity) } : line));
  else update([...lines, { key, product, quantity }]);
};
export function changeCartQuantity(key: string, quantity: number) {
  ensure();
  const safe = Math.max(0, Math.min(99, Math.floor(quantity)));
  update(safe === 0 ? lines.filter(row => row.key !== key) : lines.map(row => row.key === key ? { ...row, quantity: safe } : row));
};
export function removeFromCart(key: string) { ensure(); update(lines.filter(row => row.key !== key)); }
export function useCartLines() {
  return useSyncExternalStore(
    callback => {
      ensure(); listeners.add(callback);
      return () => listeners.delete(callback);
    },
    () => { ensure(); return lines; },
    () => EMPTY
  );
}
export function useCartCount() { return useCartLines().reduce((sum, item) => sum + item.quantity, 0); }
