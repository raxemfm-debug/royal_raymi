import type { Product as ProductItem } from '../data/products';

const normal = (s: string) => s.toLocaleLowerCase('es').normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

/** Atajos comerciales antiguos de PopularProducts y SpecialDays. */
const aliases: Record<string, string> = {
  'chocolate huamanguino 300g': 'chocolate-huamanguino-tradicional',
  'chocolate huamanguino': 'chocolate-huamanguino-tradicional',
  'chocolate huamanguino tradicional': 'chocolate-huamanguino-tradicional',
  'polvo de cacao 150g': 'polvo-cacao-150g',
  'polvo cacao 150': 'polvo-cacao-150g',
  'grageas arandano aguaymanto': 'empaque-grageas-mix-arandanos-aguaymanto',
  'grageas arandanos aguaymanto': 'empaque-grageas-mix-arandanos-aguaymanto',
  'grageas arandano y aguaymanto': 'empaque-grageas-mix-arandanos-aguaymanto',
  'grageas de cafe 180g': 'empaque-premium-grageas-cafe-chocolate',
  'grageas cafe 180g': 'empaque-premium-grageas-cafe-chocolate',
  'grageas almendras 180g': 'grageas-almendras-chocolate-leche',
  'grageas de almendras 180g': 'grageas-almendras-chocolate-leche',
  'cafe tueste americano': 'cafe-tueste-americano-250g',
  'cafe tueste americano 250g': 'cafe-tueste-americano-250g',
  'bonomix pack x 8': 'bonomix-pack-8',
  'bonomix pack x8': 'bonomix-pack-8',
  'bonomix': 'bonomix-pack-8',
  'cafe de especialidad': 'geisha-cafe-tostado-grano-entero-250g',
  'cafe geisha': 'geisha-cafe-tostado-grano-entero-250g',
  'geisha edicion limitada 250g': 'geisha-cafe-tostado-grano-entero-250g',
  'caja de chocolates prodigio': 'caja-chocolates-prodigio',
  'chocolates prodigio': 'caja-chocolates-prodigio',
  'chocotejas artesanales': 'caja-chocotejas-artesanales',
};

export function lookupFeaturedTarget(key: string, all: ProductItem[]): ProductItem | undefined {
  const k = normal(key);
  // 1. Identificador canónico (nunca deducido a partir de la presentación).
  const exact = all.find(p => normal(p.id) === k || normal(p.name) === k);
  if (exact) return exact;
  // 2. Aliases declarados y basados en las fichas existentes.
  const id = aliases[k];
  if (id) return all.find(p => p.id === id);
  // 3. Nombres publicitarios / claves de recursos, que pueden diferir del SKU.
  // Resolver exclusivamente identificadores presentes en el catálogo.
  let hintedId: string | undefined;
  if (k.includes('bonomix')) hintedId = 'bonomix-pack-8';
  else if (k.includes('prodigio') && k.includes('caja')) hintedId = 'caja-chocolates-prodigio';
  else if (k.includes('geisha') || (k.includes('especialidad') && k.includes('cafe'))) hintedId = 'geisha-cafe-tostado-grano-entero-250g';
  else if (k.includes('huamanguino') && (k.includes('300') || k.includes('tradicional'))) hintedId = 'chocolate-huamanguino-tradicional';
  else if (k.includes('polvo') && k.includes('cacao') && k.includes('150')) hintedId = 'polvo-cacao-150g';
  else if (k.includes('grageas') && k.includes('arandano') && k.includes('aguaymanto')) hintedId = 'empaque-grageas-mix-arandanos-aguaymanto';
  else if (k.includes('grageas') && k.includes('almendra') && k.includes('180')) hintedId = 'grageas-almendras-chocolate-leche';
  else if (k.includes('grageas') && k.includes('cafe') && k.includes('180')) hintedId = 'empaque-premium-grageas-cafe-chocolate';
  else if (k.includes('tueste') && k.includes('americano')) hintedId = 'cafe-tueste-americano-250g';
  if (hintedId) return all.find(p => p.id === hintedId);
  // 4. Coincidencia parcial únicamente cuando el resultado es inequívoco.
  const matches = all.filter(p => normal(p.name).includes(k) && k.length > 8);
  if (matches.length === 1) return matches[0];
  return undefined;
}
