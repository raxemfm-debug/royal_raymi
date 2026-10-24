import React from 'react';

interface Partner {
  name: string;
  logo: string;
}

const ALLIED_PARTNERS: Partner[] = [
  { name: 'Fraclen', logo: '/empresas_aliadas/fraclen.webp' },
  { name: 'Lamitec', logo: '/empresas_aliadas/lamitec.webp' },
  { name: 'Mall Graph', logo: '/empresas_aliadas/mall_graph.webp' },
  { name: 'Montefino', logo: '/empresas_aliadas/montefino.webp' },
  { name: 'Plaza 4', logo: '/empresas_aliadas/plaza_4.webp' },
  { name: 'Umaru Hotel', logo: '/empresas_aliadas/umaru_hotel.webp' },
  { name: 'VI Market', logo: '/empresas_aliadas/vimarket.webp' },
  { name: 'Suma', logo: '/empresas_aliadas/suma.webp' },
];

export const AlliedCompanies: React.FC = () => {
  // Duplicamos la lista para crear el bucle infinito sin cortes visuales
  const displayPartners = [...ALLIED_PARTNERS, ...ALLIED_PARTNERS];

  return (
    <section className="relative w-full bg-[#FAF7F2] border-y border-[#EAE3D9] py-8 md:py-10 overflow-hidden select-none">
      
      {/* Difuminado suave en los extremos izquierdo y derecho para una transición limpia */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10" />

      {/* Contenedor del carrusel en movimiento continuo */}
      <div className="flex w-full overflow-hidden">
        <div className="flex items-center gap-12 md:gap-20 animate-marquee hover:[animation-play-state:paused] flex-nowrap py-2 cursor-pointer">
          {displayPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              role="button"
              tabIndex={0}
              aria-label={partner.name}
              onClick={(e) => e.preventDefault()}
              className="group flex-shrink-0 flex items-center justify-center p-2 cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-12 w-auto max-w-[130px] md:max-w-[160px] object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300 filter grayscale contrast-125 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Estilos de animación pura en línea para garantizar que corra sin alterar la configuración de Tailwind */}
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScroll 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
