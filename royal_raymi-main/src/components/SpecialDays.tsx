import React from 'react';

interface SpecialDaysProps {
  onGoToProduct?: (productName: string) => void;
  onGoToShop?: () => void;
}

export const SpecialDays: React.FC<SpecialDaysProps> = ({ onGoToProduct, onGoToShop }) => {

  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Encabezado con Script según referencia Avelina */}
        <div className="inline-flex items-baseline justify-center gap-2 mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl tracking-widest text-[#2B1B17] uppercase">
            PARA DÍAS ESPECIALES
          </h2>
          <span className="font-serif italic text-2xl lg:text-3xl text-[#963E32] -rotate-6">
            selección de regalos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              title: 'Caja Regalo Corazón de Cacao',
              sub: 'Edición Amor & Amistad',
              tag: 'Detalle Especial',
              img: '/assets/products/chocotejas-caja-x-10.webp',
              targetName: 'Chocotejas', // Busca las chocotejas en el catálogo
            },
            {
              title: 'Choco Berries & Naranjas',
              sub: 'Selección de Bayas Andinas',
              tag: 'Favorito',
              img: '/assets/products/choco-berries.webp',
              targetName: 'Choco berries', // Coincide con la tarjeta de la tienda
            },
            {
              title: 'Café Royality Fine Reserve',
              sub: 'Tueste Americano 250g',
              tag: 'Aroma Intenso',
              img: '/assets/products/cafe-de-especialidad-edición-limitada.webp',
              targetName: 'Café', // O el nombre exacto de tu café en el catálogo
            },
            {
              title: 'Pack Degustación Prodigio',
              sub: 'Maca, Cacao 70% & Superfoods',
              tag: 'Colección',
              img: '/assets/products/chocolate-reforzado-con-maca.webp',
              targetName: 'maca', // O 'Prodigio' según figure en tu catálogo
            },

          ].map((card, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-stone-200/60 flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Contenedor de la Imagen */}
              <div className="w-full h-52 bg-[#F9F6F0] rounded-xl overflow-hidden flex items-center justify-center p-4 mb-5 relative group-hover:bg-[#F4ECE1] transition-colors duration-300">
                <img
                  src={card.img}
                  alt={card.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/producers/foto_principal.jpeg';
                  }}
                />
              </div>

              {/* Etiqueta / Tag Superior */}
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#B58A52] mb-1.5">
                {card.tag}
              </span>

              {/* Título del Producto */}
              <h3 className="font-serif text-lg font-medium text-[#2B1B17] tracking-tight line-clamp-1 mb-1">
                {card.title}
              </h3>

              {/* Descripción / Subtítulo */}
              <p className="text-xs text-stone-500 font-light leading-relaxed mb-5 min-h-[32px] flex items-center justify-center">
                {card.sub}
              </p>

              {/* Botón de Acción Estilizado */}
              <div className="w-full mt-auto pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    if (onGoToProduct) {
                      onGoToProduct(card.targetName || card.title);
                    } else if (onGoToShop) {
                      onGoToShop();
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-full border border-[#2B1B17] text-[#2B1B17] text-[11px] font-medium tracking-widest uppercase transition-all duration-300 hover:bg-[#2B1B17] hover:text-[#FAF7F2] active:scale-95 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Consultar en tienda</span>
                  <span className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
