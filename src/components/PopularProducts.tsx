import React from 'react';

interface PopularItem {
  id: string;
  name: string;
  categoryLabel: string;
  searchKey: string;
  image: string;
}

const POPULAR_ITEMS: PopularItem[] = [
  {
    id: 'bombon-jalea',
    name: 'Bombón Relleno con Crema de Cacao',
    categoryLabel: 'BOMBONES FINOS',
    searchKey: 'jalea',
    image: '/assets/products/bombones-con-rellenos-de-jalea.webp',
  },
  {
    id: 'bonomix-pack',
    name: 'Caja Selección Bombones del VRAEM',
    categoryLabel: 'COLECCIÓN ESPECIAL',
    searchKey: 'bonomix',
    image: '/assets/products/bonomix-pack-x-8.webp',
  },
  {
    id: 'choco-berries',
    name: 'Tableta Choco Berries 70% Cacao',
    categoryLabel: 'CHOCOLATES FINOS',
    searchKey: 'berries',
    image: '/assets/products/choco-berries.webp',
  },
  {
    id: 'chocomilk-frutos',
    name: 'Choco Milk 50% con Frutos Secos',
    categoryLabel: 'CHOCOLATES',
    searchKey: 'milk',
    image: '/assets/products/chocomilk.webp',
  },
];

interface PopularProductsProps {
  onGoToProduct: (searchKey: string) => void;
}

export const PopularProducts: React.FC<PopularProductsProps> = ({ onGoToProduct }) => {
  return (
    <section id="popular-products-section" className="relative py-20 lg:py-28 bg-[#F4EDE4] border-y border-[#E3D6C6] overflow-hidden">
      {/* Detalle decorativo de fondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3B241C_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Cabecera */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C5D38] font-bold">
            · Selección Especial ·
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide text-[#2B1B17] uppercase">
            POPULAR PRODUCTS
          </h2>
          <div className="w-14 h-[2px] bg-[#B58A52] mx-auto mt-4" />
        </div>

        {/* Grilla de Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {POPULAR_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onGoToProduct(item.searchKey)}
              className="group cursor-pointer bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-[0_4px_20px_-4px_rgba(59,36,28,0.08)] hover:shadow-[0_12px_28px_-6px_rgba(59,36,28,0.18)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center text-center justify-between min-h-[380px]"
            >
              <div className="w-full aspect-square bg-[#FAF7F2] rounded-xl overflow-hidden flex items-center justify-center p-4 border border-stone-100 group-hover:bg-white transition-colors duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback inteligente entre nombres alternativos sin usar la foto de productores
                    const target = e.currentTarget;
                    if (target.src.includes('chocomilk.webp')) {
                      target.src = '/assets/products/choco-milk-50-con-frutos-secos.webp';
                    } else if (target.src.includes('choco-berries.webp')) {
                      target.src = '/assets/products/tableta-choco-berries-70-cacao.webp';
                    }
                  }}
                />
              </div>

              <div className="w-full mt-4 flex flex-col items-center flex-1 justify-between">
                <h3 className="font-serif text-base font-semibold text-[#2B1B17] group-hover:text-[#8C5D38] transition-colors line-clamp-2">
                  {item.name}
                </h3>

                <span className="text-[11px] uppercase tracking-widest text-[#B58A52] font-semibold mt-2">
                  {item.categoryLabel}
                </span>

                <span className="text-[11px] text-stone-400 mt-3 pt-2 border-t border-stone-100 w-full group-hover:text-[#8C5D38] transition-colors font-sans">
                  Ver en tienda →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
