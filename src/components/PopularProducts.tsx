import { PRODUCTS } from '../data/products';
import { PLACEHOLDER, productImages, productName } from '../store/productAdapter';

// Cada destacado referencia una ficha REAL de products.ts; nunca textos ambiguos.
const FEATURED_IDS = [
  'chocolate-tradicional-huamanguino-mani-ajonjoli',
  'polvo-cacao-150g',
  'empaque-grageas-mix-arandanos-aguaymanto',
  'grageas-cafe-tostado-chocolate-blanco',
  'grageas-almendras-chocolate',
  'cafe-tueste-americano-250g',
];

export function PopularProducts({ onGoToProduct }: { onGoToProduct: (key: string) => void }) {
  const featured = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));
  return <section id="popular-products-section" className="bg-[#FDFBF7] px-5 py-12 sm:px-8 lg:py-16">
    <div className="mx-auto max-w-[1360px]">
      <header className="mb-9 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B58A52]">Selección destacada</p>
        <h2 className="mt-1 font-serif text-3xl text-[#3B241C] sm:text-4xl">Los Más Pedidos</h2>
        <div className="mx-auto mt-2 h-0.5 w-10 bg-[#B58A52]" />
        <p className="mt-3 text-xs text-[#7A6B63]">Nuestros clásicos favoritos de chocolate, café de origen y frutos bañados en cacao.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-4">
        {featured.map(product => <article key={product.id} className="group flex min-w-0 flex-col rounded-xl border border-[#E9DDD3] bg-white p-3 shadow-sm transition-shadow hover:shadow-lg">
          <button type="button" onClick={() => onGoToProduct(product.id)} aria-label={`Buscar ${productName(product)} en la tienda`} className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-lg bg-[#FAF7F2] p-2 focus-visible:outline focus-visible:outline-[#B58A52]">
            <img src={productImages(product)[0] ?? PLACEHOLDER} alt={productName(product)} loading="lazy" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" onError={e => {e.currentTarget.onerror=null;e.currentTarget.src=PLACEHOLDER;}} />
          </button>
          <h3 className="mt-3 min-h-[3.3rem] font-serif text-[14px] font-semibold leading-snug text-[#3B241C] sm:text-[15px]">{productName(product)}</h3>
          <div className="mt-auto border-t border-[#E9DDD3] pt-3">
            <button type="button" onClick={() => onGoToProduct(product.id)} className="w-full rounded-full border border-[#B58A52] px-2 py-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#3B241C] transition-colors hover:bg-[#3B241C] hover:text-white">Ver en tienda</button>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
