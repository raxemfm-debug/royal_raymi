import React from 'react';

interface SpecialDaysProps {
  onGoToShop: () => void;
}

export const SpecialDays: React.FC<SpecialDaysProps> = ({ onGoToShop }) => {
  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Encabezado con Script según referencia Avelina */}
        <div className="inline-flex items-baseline justify-center gap-2 mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl tracking-widest text-[#2B1B17] uppercase">
            FOR SPECIAL DAYS
          </h2>
          <span className="font-serif italic text-2xl lg:text-3xl text-[#963E32] -rotate-6">
            with you
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              title: 'Caja Regalo Corazón de Cacao',
              sub: 'Edición Amor & Amistad',
              tag: 'Detalle Especial',
              img: '/assets/products/chocotejas-caja-x-10.webp',
            },
            {
              title: 'Choco Berries & Naranjas',
              sub: 'Selección de Bayas Andinas',
              tag: 'Favorito',
              img: '/assets/products/choco-berries.webp',
            },
            {
              title: 'Café Royality Fine Reserve',
              sub: 'Tueste Americano 250g',
              tag: 'Aroma Intenso',
              img: '/assets/products/cafe-de-especialidad-edición-limitada.webp',
            },
            {
              title: 'Pack Degustación Prodigio',
              sub: 'Maca, Cacao 70% & Superfoods',
              tag: 'Colección',
              img: '/assets/products/chocolate-reforzado-con-maca.webp',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm border border-stone-200/50 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300"
            >
              <div className="w-full h-48 bg-[#F4EFEA] rounded overflow-hidden flex items-center justify-center p-3 mb-4">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/producers/foto_principal.jpeg';
                  }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#A34835] font-semibold">
                {card.tag}
              </span>
              <h3 className="font-serif text-base text-[#2B1B17] font-medium mt-1">
                {card.title}
              </h3>
              <p className="text-xs text-stone-500 mt-1">{card.sub}</p>
              <button
                onClick={onGoToShop}
                className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#2B1B17] border-b border-[#2B1B17] pb-1 hover:text-[#A34835] hover:border-[#A34835] transition-colors"
              >
                Consultar en Tienda
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
