import { useMemo, useState } from 'react';
import { Grid2X2, Grid3X3, Search } from 'lucide-react';
import type { Product as ProductItem } from '../data/products';
import { productCategory, productName, productPrice } from './productAdapter';
import type { AddCallback } from './useProductActions';
import ProductCard from '../components/ProductCard';

type Props = { products: ProductItem[]; onAddToCart?: AddCallback };
export default function ShopCatalog({ products, onAddToCart }: Props) {
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('original');
  const [dense, setDense] = useState(true);
  const categories = useMemo(() => ['Todos', ...new Set(products.map(productCategory))], [products]);
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('es');
    const results = products.filter(p => (category === 'Todos' || productCategory(p) === category) && (!query || `${productName(p)} ${productCategory(p)}`.toLocaleLowerCase('es').includes(query)));
    if (sort === 'name') results.sort((a, b) => productName(a).localeCompare(productName(b), 'es'));
    if (sort === 'price-asc') results.sort((a, b) => (productPrice(a) ?? Number.MAX_VALUE) - (productPrice(b) ?? Number.MAX_VALUE));
    if (sort === 'price-desc') results.sort((a, b) => (productPrice(b) ?? -1) - (productPrice(a) ?? -1));
    return results;
  }, [products, category, search, sort]);
  return <main className="mx-auto max-w-[1600px] px-4 pb-20 pt-9 text-[#3B241C] sm:px-8">
    <div className="mb-10 text-center"><p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#B58A52]">El sabor de Ayacucho</p><h1 className="mt-3 font-serif text-3xl sm:text-5xl">Nuestra tienda</h1><p className="mt-3 text-sm text-[#867567]">Chocolates de origen, café de especialidad y sabores para compartir.</p></div>
    <div className="mb-7 flex flex-col gap-4 border-b border-[#E7DCD1] pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex max-w-3xl flex-wrap gap-2">{categories.map(item => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full border px-4 py-2 text-xs transition ${category === item ? 'border-[#3B241C] bg-[#3B241C] text-white' : 'border-[#E4D7CB] bg-white text-[#756258] hover:border-[#B58A52]'}`}>{item}</button>)}</div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-[190px] flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#968779]"/><span className="sr-only">Buscar productos</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar productos" className="h-10 w-full rounded-lg border border-[#E4D7CB] bg-white pl-9 pr-3 text-sm outline-[#B58A52]"/></label>
        <label><span className="sr-only">Ordenar productos</span><select value={sort} onChange={e => setSort(e.target.value)} className="h-10 rounded-lg border border-[#E4D7CB] bg-white px-3 text-xs text-[#3B241C]"><option value="original">Destacados</option><option value="name">Nombre A-Z</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option></select></label>
        <div className="hidden items-center gap-1 xl:flex"><button type="button" onClick={() => setDense(false)} aria-label="Ver cuatro columnas" aria-pressed={!dense} className={`rounded-md p-2 ${!dense ? 'bg-[#EBDFD1]' : 'text-[#A9A19B]'}`}><Grid2X2 size={20}/></button><button type="button" onClick={() => setDense(true)} aria-label="Ver seis columnas" aria-pressed={dense} className={`rounded-md p-2 ${dense ? 'bg-[#EBDFD1]' : 'text-[#A9A19B]'}`}><Grid3X3 size={20}/></button></div>
      </div>
    </div>
    <p className="mb-6 text-xs text-[#89786e]">Mostrando {filtered.length} de {products.length} productos</p>
    {filtered.length ? <div className={`grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 ${dense ? '2xl:grid-cols-6' : '2xl:grid-cols-4'}`}>{filtered.map((p, i) => <ProductCard key={`${String((p as unknown as Record<string, unknown>).id ?? productName(p))}-${i}`} product={p} onAddToCart={onAddToCart}/>)}</div> : <div className="rounded-xl border border-[#E4D7CB] py-20 text-center text-sm text-[#8C7E73]">No encontramos productos con esos filtros.</div>}
  </main>;
}
