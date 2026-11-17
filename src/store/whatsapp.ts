import type { Product as ProductItem } from '../data/products';
import {
  formatPrice, productOrderEnabled, productCategory, productName,
  productPrice, productWeight
} from './productAdapter';

// Número comercial indicado en el código de Royal Raymi, formato internacional sin +.
export const ROYAL_RAYMI_WHATSAPP = '51967179747';

/** Construye una consulta; no realiza un cobro ni confirma existencias. */
export function productWhatsAppUrl(product: ProductItem, quantity: number): string {
  const amount = Number.isFinite(quantity) ? Math.max(1, Math.min(99, Math.trunc(quantity))) : 1;
  const price = productPrice(product);
  const weight = productWeight(product);
  const message = [
    '¡Hola, Royal Raymi! Me interesa realizar un pedido:',
    '',
    `*Producto:* ${productName(product)}`,
    `*Categoría:* ${productCategory(product)}`,
    ...(weight ? [`*Presentación:* ${weight}`] : []),
    `*Cantidad:* ${amount} unidad(es)`,
    `*Precio:* ${price === null ? 'Por confirmar' : formatPrice(price)}`,
    '',
    '¿Podrían confirmarme disponibilidad, precio final y opciones de entrega? ¡Gracias!'
  ].join('\n');
  return `https://wa.me/${ROYAL_RAYMI_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/** Navegación COMPLETA a WhatsApp en la MISMA pestaña del navegador. */
export function requestProductWhatsApp(product: ProductItem, quantity = 1): void {
  if (!productOrderEnabled(product)) return;
  window.location.assign(productWhatsAppUrl(product, quantity));
}
