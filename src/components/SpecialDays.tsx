import { PRODUCTS } from '../data/products';
import { PLACEHOLDER, productImages, productName } from '../store/productAdapter';

const GIFTS = [
  { id: 'bonomix-pack-8', caption: 'Favorito de Regalo', description: 'Bombones surtidos con rellenos finos' },
  { id: 'geisha-cafe-tostado-grano-entero-250g', caption: 'Calidad Mundial', description: 'Café Geisha de especialidad · 250g' },
  { id: 'caja-chocolates-prodigio', caption: 'Selección Gourmet', description: 'Una selección de chocolates para compartir' },
  { id: 'botella-licor-cafe-premium', caption: 'Licores de Origen', description: 'Macerado artesanal con finos granos de Café' },
];

export function SpecialDays({ onGoToProduct }: { onGoToProduct?: (key: string) => void }) {
  const handleOpenProduct = (productId: string) => {
    if (onGoToProduct) {
      onGoToProduct(productId);
    } else {
      window.location.assign(`/producto/${encodeURIComponent(productId)}`);
    }
  };

  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Encabezado Editorial Avelina */}
        <header className="text-center">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[#B58A52]">
            Ediciones & Detalles
          </p>
          <h2 className="mt-2 font-serif text-3xl font-light tracking-wide text-[#2C1810] sm:text-4xl lg:text-[40px]">
            PARA DÍAS ESPECIALES{' '}
            <span className="font-serif italic font-normal text-[#B58A52]">
              selección de regalos
            </span>
          </h2>
          <div className="mx-auto mt-3 h-[1px] w-12 bg-[#B58A52]/60" />
        </header>

        {/* Grilla de Regalos */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {GIFTS.map(gift => {
            const p = PRODUCTS.find(product => product.id === gift.id);
            if (!p) return null;
            const name = productName(p);
            const image = productImages(p)[0] || PLACEHOLDER;

            return (
              <article 
                key={p.id} 
                className="group flex flex-col items-center rounded-3xl border border-[#EFE8DF] bg-[#FAF7F2] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#B58A52]/40 hover:shadow-lg hover:shadow-[#3B241C]/5"
              >
                {/* Imagen del Producto */}
                <button 
                  type="button" 
                  onClick={() => handleOpenProduct(p.id)} 
                  className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-transform duration-500 ease-out focus-visible:outline focus-visible:outline-[#B58A52]" 
                  aria-label={`Ver detalle de ${name}`}
                >
                  <img 
                    src={image} 
                    alt={name} 
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy" 
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }} 
                  />
                </button>

                {/* Subtítulo / Ocasión */}
                <span className="mt-5 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#B58A52]">
                  {gift.caption}
                </span>

                {/* Nombre de Producto Editorial */}
                <h3 
                  onClick={() => handleOpenProduct(p.id)}
                  className="mt-2 min-h-[3.2rem] cursor-pointer font-serif text-[19px] font-normal leading-snug text-[#2C1810] transition-colors duration-200 group-hover:text-[#B58A52] sm:text-[20px]"
                >
                  {name}
                </h3>

                {/* Descripción delicada */}
                <p className="mt-1 min-h-[2.5rem] font-serif italic text-[13px] leading-relaxed text-[#7A6B62]">
                  {gift.description}
                </p>

                {/* Botón Estilo Boutique */}
                <div className="mt-5 w-full pt-2">
                  <button 
                    type="button" 
                    onClick={() => handleOpenProduct(p.id)} 
                    className="w-full rounded-full border border-[#2C1810]/30 bg-transparent py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2C1810] transition-all duration-300 hover:border-[#2C1810] hover:bg-[#2C1810] hover:text-[#FAF7F2]"
                  >
                    Ver producto →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SpecialDays;
