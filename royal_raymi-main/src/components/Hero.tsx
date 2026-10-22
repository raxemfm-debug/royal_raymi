import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-8 h-[1px] bg-[#B58A52]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58A52]">
                Cacao Fino de Aroma · Ayacucho
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#3B241C] leading-[1.15] font-normal tracking-tight mb-6">
              El arte del chocolate fino,{" "}
              <span className="italic font-serif text-[#B58A52] font-normal block sm:inline">
                nacido en el corazón del VRAEM.
              </span>
            </h1>
            <p className="text-[#756C64] text-sm sm:text-base leading-relaxed text-editorial-justify max-w-2xl mb-8">
              Transformamos granos nativos seleccionados a mano mediante comercio justo y técnicas artesanales 
              de alta precisión. Explora nuestra colección de 69 variedades exclusivas y solicita tu reserva 
              para recojo directo en nuestras sucursales autorizadas.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#catalogo"
                className="px-7 py-3.5 bg-[#3B241C] text-[#FDFBF7] text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-[#68483A] transition-all shadow-sm"
              >
                Explorar Catálogo
              </a>
              <a
                href="#historia"
                className="px-7 py-3.5 border border-[#D5C7B5] text-[#3B241C] text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-[#F7F2EB] transition-all"
              >
                Nuestra Promesa
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-3 bg-white border border-[#E9E0D6] rounded-2xl shadow-lg max-w-sm sm:max-w-md w-full">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#F7F2EB]">
                <img
                  src="/foto_principal.jpeg"
                  alt="Colección artesanal Royal Raymi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 pb-1 px-2 flex justify-between items-center text-xs text-[#756C64]">
                <span className="font-serif italic text-[#3B241C]">Edición Fina 2026</span>
                <span className="uppercase tracking-widest font-mono text-[10px]">69 Fichas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};