import type { Product as ProductItem } from '../data/products';

/** Adaptador tolerante: conserva el contrato existente src/data/products.ts */
type Loose = Record<string, unknown>;
const fields = (product: ProductItem): Loose => product as unknown as Loose;
const readString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : typeof value === 'number' ? String(value) : '';
const number = (value: unknown): number | null => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;
  const cleaned = value.replace(/[^0-9.,-]/g, '').replace(/,/g, '');
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
};
export const productName = (p: ProductItem) => readString(fields(p).name) || 'Producto Royal Raymi';
export const productCategory = (p: ProductItem) => readString(fields(p).category) || 'Productos';
export const productDescription = (p: ProductItem) => readString(fields(p).description) || 'Descubre el sabor y la calidad de Royal Raymi, desde Ayacucho.';
export const productWeight = (p: ProductItem) => readString(fields(p).weight ?? fields(p).presentation ?? fields(p).size);
export const productSku = (p: ProductItem) => readString(fields(p).sku ?? fields(p).SKU);
export const productPrice = (p: ProductItem) => number(fields(p).price ?? fields(p).salePrice ?? fields(p).price_soles);
export const productOldPrice = (p: ProductItem) => number(fields(p).compareAtPrice ?? fields(p).originalPrice ?? fields(p).oldPrice);
export const productStock = (p: ProductItem) => number(fields(p).stock);
/** Existencias declaradas en catálogo; la categoría no determina el stock. */
export const productAvailable = (p: ProductItem) =>
  fields(p).available !== false && (productStock(p) === null || (productStock(p) ?? 0) > 0);

/** Los artículos con venta restringida se informan, pero no permiten pedidos directos. */
export const productAgeRestricted = (p: ProductItem) =>
  productCategory(p).toLocaleLowerCase('es') === 'licores';
export const productOrderEnabled = (p: ProductItem) =>
  productAvailable(p) && !productAgeRestricted(p);
export const formatPrice = (n: number) => `S/ ${n.toFixed(2)}`;
export const productImages = (p: ProductItem): string[] => {
  const data = fields(p);
  const main = data.imageUrl ?? data.image_url ?? data.image;
  const others = data.images ?? data.gallery;
  const result: string[] = [];
  const append = (value: unknown) => {
    let src: string;
    if (typeof value === 'string') src = value.trim();
    else if (value && typeof value === 'object') {
      const obj = value as Loose;
      src = readString(obj.src ?? obj.url ?? obj.imageUrl);
    } else return;
    if (src && !result.includes(src)) result.push(src);
  };
  append(main);
  if (Array.isArray(others)) others.forEach(append);
  return result;
};

export const PLACEHOLDER =
  'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="#f6f1eb"/><text x="300" y="292" text-anchor="middle" fill="#6c4e3b" font-family="Georgia" font-size="42">ROYAL RAYMI</text><text x="300" y="332" text-anchor="middle" fill="#af8b65" font-family="Arial" font-size="18">IMAGEN NO DISPONIBLE</text></svg>');

const slugify = (text: string): string => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const productSlug = (p: ProductItem) => {
  const d = fields(p);
  const explicit = readString(d.slug);
  return slugify(explicit || readString(d.id) || productName(p));
};
export const productUrl = (p: ProductItem) => `/producto/${encodeURIComponent(productSlug(p))}`;
export const lookupProduct = (products: ProductItem[], slug: string): ProductItem | undefined => {
  let decoded = slug;
  try { decoded = decodeURIComponent(slug); } catch { /* conservar slug sin decodificar */ }
  return products.find(p => productSlug(p) === decoded);
};
