import { useEffect, useMemo, useState } from 'react';
import { Grid2X2, Grid3X3, Search, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { productPrice } from '../store/productAdapter';

interface ShopViewProps {
  targetProduct?: string | null;
  onClearTarget?: () => void;
  selectedCategory?: string;
  onReserveProduct?: (product: Product) => void;
}

const normalize = (text: string) => (text || '').toLocaleLowerCase('es')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

const matchesCategory = (p: Product, selected: string): boolean => {
  const value = normalize(selected);
  if (!value || value === 'todos') return true;
  if (value === normalize(p.categoryKey) || value === normalize(p.category)) return true;
  if (value === 'chocolates') return p.categoryKey.startsWith('chocolates_');
  if (value === 'polvos y nibs') return p.categoryKey === 'derivados';
  return normalize(p.category).includes(value) || value.includes(normalize(p.category));
};

export const ShopView = ({ targetProduct, onClearTarget, selectedCategory = 'Todos' }: ShopViewProps) => {
  const [category, setCategory] = useState(selectedCategory);
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('buscar') || '');
  const [sort, setSort] = useState('relevancia');
  const [columns, setColumns] = useState<'normal'|'compact'>('normal');
  const [highlightedId, setHighlightedId] = useState<string|null>(null);

  useEffect(() => { setCategory(selectedCategory || 'Todos'); }, [selectedCategory]);

  useEffect(() => {
    // /tienda?producto=ID: la selección sobrevive a la recarga, navegación y Vercel.
    const params = new URLSearchParams(window.location.search);
    const key = params.get('producto') || targetProduct;
    if (!key) return;
    const found = PRODUCTS.find(p => normalize(p.id) === normalize(key) || normalize(p.name) === normalize(key));
    if (!found) return;
    setCategory('Todos');
    setQuery('');
    setSort('relevancia');
    setHighlightedId(found.id);
    let attempts = 0;
    // Esperar el render del filtrado antes de posicionar el producto en pantalla.
    const scroll = window.setInterval(() => {
      const element = document.getElementById(`product-${found.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.clearInterval(scroll);
      } else if (++attempts >= 12) window.clearInterval(scroll);
    }, 140);
    const clear = window.setTimeout(() => { setHighlightedId(null); onClearTarget?.(); }, 6500);
    return () => { window.clearInterval(scroll); window.clearTimeout(clear); };
  }, [targetProduct, onClearTarget]);

  const products = useMemo(() => {
    const term = normalize(query);
    const result = PRODUCTS.filter(p => matchesCategory(p, category) &&
      (!term || normalize(`${p.name} ${p.description} ${p.category}`).includes(term)));
    if (sort === 'az') result.sort((a,b) => a.name.localeCompare(b.name, 'es'));
    if (sort === 'za') result.sort((a,b) => b.name.localeCompare(a.name, 'es'));
    if (sort === 'priceLow') result.sort((a,b) => (productPrice(a) ?? Infinity) - (productPrice(b) ?? Infinity));
    if (sort === 'priceHigh') result.sort((a,b) => (productPrice(b) ?? -Infinity) - (productPrice(a) ?? -Infinity));
    return result;
  }, [category, query, sort]);

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-4 pb-24 pt-12 text-[#3B241C] sm:px-6 lg:px-8" aria-label="Tienda Royal Raymi">
      <div className="mx-auto max-w-[1580px]">
        <header className="mb-9 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#B58A52]">Desde Ayacucho · The Scent of VRAEM</span>
          <h1 className="mt-2 font-serif text-3xl sm:text-5xl">Nuestros productos</h1>
          <div className="mx-auto mt-4 h-0.5 w-14 bg-[#B58A52]" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#7A6B63]">Descubre nuestra selección de chocolates, cacao y café de origen.</p>
        </header>

        <div className="mb-7 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por categoría">
          {PRODUCT_CATEGORIES.map(item => (
            <button type="button" key={item.id} onClick={() => setCategory(item.id)}
              aria-pressed={normalize(category) === normalize(item.id) || (item.id === 'todos' && normalize(category) === 'todos')}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                (normalize(category) === normalize(item.id) || (item.id === 'todos' && normalize(category) === 'todos'))
                  ? 'border-[#3B241C] bg-[#3B241C] text-white shadow-sm'
                  : 'border-[#E9E0D6] bg-white text-[#6E5D53] hover:border-[#B58A52]'
              }`}>{item.name === 'cafe' ? 'Café' : item.name}</button>
          ))}
        </div>

        <div className="mb-7 flex flex-col gap-3 border-b border-[#E7DAD0] pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-[#7A6B63]" role="status">{products.length} productos</span>
            <div className="hidden gap-2 md:flex" role="group" aria-label="Cambiar visualización">
              <button type="button" aria-label="Cuadrícula amplia" aria-pressed={columns === 'normal'} onClick={() => setColumns('normal')} className={`rounded-lg p-2 ${columns === 'normal' ? 'bg-[#E8DCCB] text-[#3B241C]' : 'text-[#A89787] hover:bg-white'}`}><Grid2X2 size={18}/></button>
              <button type="button" aria-label="Cuadrícula compacta" aria-pressed={columns === 'compact'} onClick={() => setColumns('compact')} className={`rounded-lg p-2 ${columns === 'compact' ? 'bg-[#E8DCCB] text-[#3B241C]' : 'text-[#A89787] hover:bg-white'}`}><Grid3X3 size={18}/></button>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3 sm:flex-row md:max-w-[550px]">
            <label className="relative flex-1">
              <span className="sr-only">Buscar productos</span>
              <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9E8B7B]" />
              <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar chocolates, café..." className="w-full rounded-xl border border-[#E7DAD0] bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-[#B58A52] focus:ring-2 focus:ring-[#B58A52]/20" />
            </label>
            <label className="relative flex items-center gap-2 rounded-xl border border-[#E7DAD0] bg-white px-3">
              <SlidersHorizontal size={16} className="text-[#9E8B7B]" />
              <span className="sr-only">Ordenar</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="min-h-11 bg-transparent text-xs text-[#3B241C] outline-none sm:text-sm">
                <option value="relevancia">Orden original</option>
                <option value="az">Nombre: A–Z</option>
                <option value="za">Nombre: Z–A</option>
                <option value="priceLow">Menor precio disponible</option>
                <option value="priceHigh">Mayor precio disponible</option>
              </select>
            </label>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-[#E9E0D6] bg-white px-6 py-16 text-center">
            <h2 className="font-serif text-2xl">No encontramos productos</h2>
            <p className="mt-3 text-sm text-[#7A6B63]">Prueba otra búsqueda o selecciona Todas las categorías.</p>
            <button type="button" className="mt-6 rounded-lg bg-[#3B241C] px-5 py-3 text-sm text-white" onClick={() => { setCategory('Todos'); setQuery(''); }}>Mostrar todos</button>
          </div>
        ) : (
          <div className={`grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6 ${columns === 'compact' ? 'lg:grid-cols-5 2xl:grid-cols-6' : 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
            {products.map(product => <div key={product.id} id={`product-${product.id}`} className={`min-w-0 rounded-2xl transition-all duration-500 ${highlightedId === product.id ? 'ring-4 ring-[#B58A52] ring-offset-4 shadow-2xl' : ''}`}>
              <ProductCard product={product} />
            </div>)}
          </div>
        )}
      </div>
    </section>
  );
};
export default ShopView;
