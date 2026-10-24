import React from 'react';

interface SpecialProduct {
  id: string;
  tag: string;
  name: string;
  description: string;
  image: string;
  targetName: string;
}

const SPECIAL_PRODUCTS: SpecialProduct[] = [
  {
    id: 'bonomix-pack-8',
    tag: 'FAVORITO DE REGALO',
    name: 'Bonomix Pack x 8',
    description: 'Bombones Surtidos con Rellenos Finos',
    image: '/assets/products/bonomix_pack_x_8.webp',
    targetName: 'Bonomix pack x 8',
  },
  {
    id: 'cafe-especialidad',
    tag: 'CALIDAD MUNDIAL',
    name: 'Café de Especialidad',
    description: 'Geisha Edición Limitada 250g',
    image: '/assets/products/café-de-especialidad-edición-limitada.webp',
    targetName: 'Café de especialidad edición limitada',
  },
  {
    id: 'caja-chocolates-prodigio',
    tag: 'SELECCIÓN GOURMET',
    name: 'Caja de Chocolates Prodigio',
    description: 'Surtido Fino Milk, Kiwicha y Maní',
    image: '/assets/products/caja_de_chocolates_prodigio.webp',
    targetName: 'Caja de chocolates prodigio',
  },
  {
    id: 'botella-licor-cafe',
    tag: 'EDICIÓN ESPECIAL',
    name: 'Botella de Licor de Café Premium',
    description: 'Macerado Artesanal con Pisco 500ml',
    image: '/assets/products/botella_de_licor_de_café_premium.webp',
    targetName: 'Botella de licor de café premium',
  },
];

interface SpecialDaysProps {
  onGoToProduct?: (productName: string) => void;
}

export const SpecialDays: React.FC<SpecialDaysProps> = ({ onGoToProduct }) => {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado Editorial Avelina */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-[#3B241C]">
            PARA DÍAS ESPECIALES{' '}
            <span className="italic font-normal text-[#B58A52] text-2xl md:text-3xl font-serif">
              selección de regalos
            </span>
          </h2>
          <div className="w-12 h-[2px] bg-[#B58A52] mx-auto mt-4" />
        </div>

        {/* Grilla de 4 tarjetas estilo Boutique */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SPECIAL_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-[#FAF7F2] rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition-all duration-300 border border-[#F0EAE1] group"
            >
              {/* Imagen con zoom sutil */}
              <div className="w-full h-56 flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/brand/royal-raymi-logo-azul.png';
                  }}
                />
              </div>

              {/* Tag, Nombre y Descripción */}
              <div className="w-full flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B58A52] font-semibold block mb-2">
                    {product.tag}
                  </span>
                  <h3 className="font-serif text-[#3B241C] text-lg font-medium leading-snug mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#8A7968] font-sans line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Botón Consultar en tienda */}
                <button
                  type="button"
                  onClick={() => onGoToProduct && onGoToProduct(product.targetName)}
                  className="mt-6 w-full py-2.5 px-4 rounded-full border border-[#3B241C] text-[#3B241C] text-xs font-semibold tracking-wider uppercase hover:bg-[#3B241C] hover:text-[#FDFBF7] transition-all duration-200"
                >
                  CONSULTAR EN TIENDA &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
