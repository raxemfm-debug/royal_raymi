import React from 'react';

interface CorporateVideoProps {
  youtubeId?: string;
}

export const CorporateVideo: React.FC<CorporateVideoProps> = ({
  youtubeId = 'VmzlfLbiL7I', // ID corregido con 'l' minúscula
}) => {
  return (
    <section className="w-full bg-[#FAF7F2] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200/50">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado Editorial */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#B58A52] block mb-2">
            Nuestra Esencia & Territorio
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2B1B17] font-medium tracking-tight">
            Del VRAEM al Mundo
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-light mt-2 max-w-xl mx-auto">
            Una historia que se saborea: el trabajo, la pasión y el origen detrás de cada uno de nuestros granos y chocolates.
          </p>
        </div>

        {/* Reproductor de Video Full HD */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-stone-200/60 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`}
            title="Royal Raymi - Del VRAEM al Mundo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
};
