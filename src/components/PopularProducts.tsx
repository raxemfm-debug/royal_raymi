import React from 'react';

interface PopularProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  targetName?: string;
}

const POPULAR_ITEMS: PopularProduct[] = [
  {
    id: 'choc-huamanguino',
    name: 'Chocolate Huamanguino 300g',
    category: 'CHOCOLATES TRADICIONAL',
    image: '/assets/products/chocolate-huamanguino-300-g.webp',
    targetName: 'Chocolate Huamanguino 300g'
  },
  {
    id: 'polvo-cacao-150',
    name: 'Polvo de Cacao 150g',
    category: 'DERIVADOS',
    image: '/assets/products/polvo_de_cacao_150g.webp',
    targetName: 'Polvo de Cacao 150g'
  },
  {
    id: 'grageas-arandanos-100',
    name: 'Grageas de Arándanos y Aguaymanto 100g',
    category: 'GRAGEADOS',
    image: '/assets/products/grageas-de-arandanos-y-aguaymanto-100-g.webp',
    targetName: 'Grageas de arándanos y aguaymanto'
  },
  {
    id: 'grageas-cafe-180',
    name: 'Grageas de Café 180g',
    category: 'GRAGEADOS',
    image: '/assets/products/grageas-de-cafe-180-g.webp',
    targetName: 'Grageas de café'
  },
  {
    id: 'grageas-almendras-180',
    name: 'Grageas de Almendras 180g',
    category: 'GRAGEADOS',
    image: '/assets/products/grageas-de-almendras-180-g.webp',
    targetName: 'Grageas de almendras'
  },
  {
    id: 'cafe-tueste-americano-250',
    name: 'Café Tueste Americano 250g',
    category: 'CAFÉ',
    image: '/assets/products/café_tueste_americano_250g.webp',
    targetName: 'Café Tueste Americano 250g'
  }
];

interface PopularProductsProps {
  onGoToProduct?: (productName: string) => void;
}

export const PopularProducts: React.FC<PopularProductsProps> = ({ onGoToProduct }) => {
  return (
    <section className="w-full bg-[#FAF7F2] py-16 px-4 md:px-8 border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado Editorial Avelina */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B58A52] font-semibold">
            · SELECCIÓN ESPECIAL ·
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3B241C] mt-2">
            LOS MÁS PEDIDOS
          </h2>
          <div className="w-12 h-[2px] bg-[#B58A52] mx-auto mt-4" />
        </div>

        {/* Grilla de 6 productos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {POPULAR_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition-all duration-300 border border-[#F0EAE1] group"
            >
              {/* Imagen con zoom sutil */}
              <div className="w-full h-44 md:h-48 flex items-center justify-center overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/brand/royal-raymi-logo-azul.png';
                  }}
                />
              </div>

              {/* Categoría y Título */}
              <div className="w-full flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A7968] font-medium block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-[#3B241C] text-sm md:text-base font-medium line-clamp-2 leading-snug">
                    {item.name}
                  </h3>
                </div>

                {/* Botón Ver en tienda */}
                <button
                  type="button"
                  onClick={() => onGoToProduct && onGoToProduct(item.targetName || item.name)}
                  className="mt-4 text-xs font-semibold text-[#B58A52] group-hover:text-[#3B241C] flex items-center justify-center gap-1 transition-colors duration-200"
                >
                  Ver en tienda &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
