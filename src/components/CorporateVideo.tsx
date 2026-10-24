import React from 'react';

interface CorporateVideoProps {
  youtubeId?: string;
  onGoToAbout?: () => void;
}

export const CorporateVideo: React.FC<CorporateVideoProps> = ({
  youtubeId = 'VmzlfLbiL7I',
}) => {
  return (
    <section className="w-full bg-[#FAF7F2] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-stone-200/60">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

        {/* Lado Izquierdo: Composición Gourmet & Storytelling */}
        <div className="w-full lg:w-7/12 text-left space-y-5">
          {/* Tag de Colección */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4ECE1] border border-[#E8DEC8] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58A52]"></span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#8C5D38]">
              Tradición & Territorio • Ayacucho
            </span>
          </div>

          {/* Título Editorial Serif */}
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B1B17] font-medium tracking-tight leading-[1.15]">
            Del VRAEM al Mundo: <br className="hidden sm:inline" />
            <span className="italic font-normal text-stone-600">una historia que se saborea</span>
          </h2>

          {/* Narrativa Gourmet */}
          <div className="space-y-3.5 text-stone-700 font-light text-xs sm:text-sm leading-relaxed">
            <p>
              Entre las cordilleras andinas y la exuberante cuenca del VRAEM confluyen microclimas únicos donde la tierra nutre granos de cacao fino de aroma y cafés de estricta altura. Cada fruto es recolectado a mano en su punto exacto de maduración por familias productoras que preservan la sabiduría agrícola de generaciones.
            </p>
            <p className="text-stone-600">
              En <strong className="font-medium text-[#2B1B17]">Royal Raymi</strong> transformamos ese legado en origen: tostados precisos que despiertan notas florales, frutales y achocolatadas, dando vida a tabletas y perfiles premiados internacionalmente que llevan el alma de Ayacucho a cada rincón.
            </p>
          </div>

          {/* Mini Pilares Gourmet / Sellos de Calidad */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-stone-200/60">
            <div className="border-l-2 border-[#B58A52] pl-3">
              <span className="block text-[11px] font-medium text-[#2B1B17] tracking-tight">Cacao Fino de Aroma</span>
              <span className="block text-[10px] text-stone-500 font-light">Variedades nativas</span>
            </div>
            <div className="border-l-2 border-[#B58A52] pl-3">
              <span className="block text-[11px] font-medium text-[#2B1B17] tracking-tight">Tostado en Origen</span>
              <span className="block text-[10px] text-stone-500 font-light">Perfil artesanal</span>
            </div>
            <div className="border-l-2 border-[#B58A52] pl-3 col-span-2 sm:col-span-1">
              <span className="block text-[11px] font-medium text-[#2B1B17] tracking-tight">Comercio Familiar</span>
              <span className="block text-[10px] text-stone-500 font-light">Impacto comunitario</span>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Tarjeta del Video con Marco Elegante */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
          <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-black relative group">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`}
              title="Royal Raymi - Del VRAEM al Mundo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
