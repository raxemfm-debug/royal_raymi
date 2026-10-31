import { PRODUCTS } from '../data/products';
import { PLACEHOLDER, productImages, productName } from '../store/productAdapter';

const GIFTS = [
  { id: 'bonomix-pack-8', caption: 'Favorito de regalo', description: 'Bombones surtidos con rellenos finos' },
  { id: 'geisha-cafe-tostado-grano-entero-250g', caption: 'Calidad mundial', description: 'Café Geisha de especialidad · 250g' },
  { id: 'caja-chocolates-prodigio', caption: 'Selección gourmet', description: 'Una selección de chocolates para compartir' },
  { id: 'botella-licor-cafe-premium', caption: 'Licores', description: 'Macerado artesanal con finos granos de Café' },
];

export function SpecialDays({ onGoToProduct }: { onGoToProduct: (key: string) => void }) {
  return <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
    <div className="mx-auto max-w-[1320px]">
      <h2 className="text-center font-serif text-2xl uppercase tracking-wide text-[#3B241C] sm:text-4xl">Para días especiales <em className="normal-case font-normal text-[#B58A52]">selección de regalos</em></h2>
      <div className="mx-auto mt-4 h-0.5 w-12 bg-[#B58A52]" />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {GIFTS.map(gift => {
          const p = PRODUCTS.find(product => product.id === gift.id);
          if (!p) return null;
          return <article key={p.id} className="group flex min-w-0 flex-col items-center rounded-3xl border border-[#EFE3D6] bg-[#FAF7F2] px-5 pb-6 pt-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <button type="button" onClick={() => onGoToProduct(p.id)} className="flex h-56 w-full items-center justify-center rounded-xl p-2 focus-visible:outline focus-visible:outline-[#B58A52] sm:h-60" aria-label={`Ver ${productName(p)} en tienda`}>
              <img src={productImages(p)[0] || PLACEHOLDER} alt={productName(p)} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=PLACEHOLDER;}} />
            </button>
            <span className="mt-4 text-[10px] font-semibold uppercase tracking-[.16em] text-[#B58A52]">{gift.caption}</span>
            <h3 className="mt-2 min-h-12 font-serif text-xl leading-tight text-[#3B241C]">{productName(p)}</h3>
            <p className="mt-2 min-h-10 text-xs leading-5 text-[#7A6B63]">{gift.description}</p>
            <button type="button" onClick={() => onGoToProduct(p.id)} className="mt-6 w-full rounded-full border border-[#3B241C] py-2.5 text-[11px] font-semibold uppercase tracking-[.09em] text-[#3B241C] hover:bg-[#3B241C] hover:text-white">Consultar en tienda →</button>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
