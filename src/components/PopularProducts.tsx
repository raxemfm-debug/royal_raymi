import { PRODUCTS } from '../data/products';
import { PLACEHOLDER, productImages, productName } from '../store/productAdapter';

const FEATURED_IDS = [
  'chocolate-tradicional-huamanguino-mani-ajonjoli',
  'polvo-cacao-150g',
  'empaque-grageas-mix-arandanos-aguaymanto',
  'grageas-cafe-tostado-chocolate-blanco',
  'grageas-almendras-chocolate',
  'cafe-tueste-americano-250g',
];

export function PopularProducts({ onGoToProduct }: { onGoToProduct?: (key: string) => void }) {
  const featured = FEATURED_IDS
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));

  const handleOpenProduct = (productId: string) => {
    if (onGoToProduct) {
      onGoToProduct(productId);
    } else {
      // Navegación directa a la ficha del producto
      window.location.assign(`/producto/${productId}`);
    }
  };

  return (
    <section id="popular-products-section" className="bg-[#FAF7F2] px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-[1360px]">
        {/* Encabezado Editorial */}
        <header className="mb-12 text-center">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[#B58A52]">
            Selección Destacada
          </p>
          <h2 className="mt-2 font-serif text-3xl font-light tracking-tight text-[#2C1810] sm:text-4xl lg:text-[42px]">
            Los Más Pedidos
          </h2>
          <div className="mx-auto mt-3 h-[1px] w-12 bg-[#B58A52]/60" />
          <p className="mx-auto mt-3 max-w-lg font-serif italic text-[13px] text-[#7A6B62]">
            Nuestros clásicos favoritos de chocolate, café de origen y frutos bañados en cacao.
          </p>
        </header>

        {/* Grilla estilo Avelina */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6 lg:gap-6">
          {featured.map(product => {
            const name = productName(product);
            const image = productImages(product)[0] ?? PLACEHOLDER;
            const category = product.category || 'Chocolates';

            return (
              <article
                key={product.id}
                className="group flex flex-col items-center text-center transition-transform duration-300"
              >
                {/* Contenedor de Imagen */}
                <button
                  type="button"
                  onClick={() => handleOpenProduct(product.id)}
                  aria-label={`Ver detalle de ${name}`}
                  className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-md focus-visible:outline focus-visible:outline-[#B58A52]"
                >
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER;
                    }}
                  />
                </button>

                {/* Bloque Tipográfico Editorial */}
                <div className="mt-4 flex w-full flex-1 flex-col items-center">
                  <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[#8C7A6B]">
                    {category}
                  </span>

                  <h3
                    onClick={() => handleOpenProduct(product.id)}
                    className="mt-1.5 cursor-pointer font-serif text-[15px] font-normal leading-snug text-[#2C1810] transition-colors duration-200 group-hover:text-[#B58A52] sm:text-[16px]"
                  >
                    {name}
                  </h3>

                  {/* Acción al estilo Boutique */}
                  <div className="mt-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleOpenProduct(product.id)}
                      className="inline-flex items-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B58A52] transition-colors hover:text-[#2C1810]"
                    >
                      <span>Ver producto</span>
                      <span className="text-[12px] leading-none transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
