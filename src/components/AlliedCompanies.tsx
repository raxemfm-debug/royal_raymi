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

function PartnerList({ duplicated = false }: { duplicated?: boolean }) {
  return (
    <div
      role={duplicated ? undefined : 'list'}
      aria-hidden={duplicated ? true : undefined}
      className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
    >
      {ALLIED_PARTNERS.map((partner) => (
        <div
          key={partner.name}
          role={duplicated ? undefined : 'listitem'}
          className="group flex h-28 w-48 shrink-0 items-center justify-center rounded-xl border border-[#E9E0D6] bg-white p-2 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-[#B58A52]/45 hover:shadow-md sm:h-36 sm:w-60"
        >
          <img
            src={partner.logo}
            alt={duplicated ? '' : `Logotipo de ${partner.name}`}
            width={480}
            height={240}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="block h-full w-full object-contain transition-transform duration-300 motion-reduce:transform-none group-hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  );
}

export const AlliedCompanies: React.FC = () => {
  return (
    <section
      aria-labelledby="allied-companies-title"
      className="overflow-hidden border-y border-[#E9E0D6]/60 bg-[#FAF7F2] py-14 md:py-[72px]"
    >
      <style>{`
        @keyframes alliedCompaniesScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .allied-companies-track {
          animation: alliedCompaniesScroll 42s linear infinite;
          will-change: transform;
        }
        .allied-companies-viewport {
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .allied-companies-viewport:hover .allied-companies-track,
        .allied-companies-viewport:focus-within .allied-companies-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .allied-companies-track { animation: none; will-change: auto; }
          .allied-companies-viewport {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
          }
        }
      `}</style>

      <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="font-serif text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B58A52]">
          Alianzas Estratégicas
        </span>
        <h2
          id="allied-companies-title"
          className="mb-2 mt-1 font-serif text-2xl text-[#3B241C] md:text-3xl"
        >
          Empresas Aliadas
        </h2>
        <div aria-hidden="true" className="mx-auto mb-3 h-0.5 w-10 bg-[#B58A52]" />
        <p className="mx-auto max-w-lg text-xs text-[#7A6B63]">
          Instituciones y marcas que confían en nuestro cacao fino de aroma y café de especialidad.
        </p>
      </div>

      {/* Two equally wide groups make -50% a seamless loop, including the gap. */}
      <div className="allied-companies-viewport w-full overflow-hidden">
        <div className="allied-companies-track flex w-max py-3">
          <PartnerList />
          <PartnerList duplicated />
        </div>
      </div>
    </section>
  );
};

export default AlliedCompanies;
