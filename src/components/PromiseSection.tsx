import React from 'react';
import { ShieldCheck, Users, Leaf } from 'lucide-react';

export const PromiseSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF7F2] border-b border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Lado Izquierdo: Foto Doris | Lado Derecho: Descripción */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#3B241C]/20 to-[#B58A52]/20 rounded-2xl filter blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-stone-200/70">
                <img
                  src="/assets/producers/ing_doris_Gerente_General.jpg"
                  alt="Ing. Doris - Gerente General Royal Raymi"
                  className="w-full h-[400px] object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/producers/foto_principal.jpeg';
                  }}
                />
                <div className="mt-3 text-center">
                  <p className="font-serif text-[#3B241C] font-semibold text-lg">Ing. Doris</p>
                  <p className="text-xs uppercase tracking-widest text-[#B58A52] font-medium">Gerente General</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B58A52] font-semibold">
              Compromiso & Calidad
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B241C] leading-tight">
              Nuestra Promesa con el Cacao de Ayacucho
            </h2>
            <div className="w-16 h-[2px] bg-[#B58A52]" />
            <p className="text-stone-700 leading-relaxed font-light text-base sm:text-lg">
              En Royal Raymi transformamos los granos de cacao más selectos del VRAEM mediante procesos tradicionales y sostenibles, asegurando un comercio justo con nuestras familias productoras y llevando al mundo la pureza del aroma ayacuchano.
            </p>
            <div className="pt-2 flex items-center gap-6 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3B241C]" />
                <span>100% Cacao Nativo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B58A52]" />
                <span>Comercio Justo</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pilares con Productores */}
        <div id="productores" className="space-y-10 pt-8 border-t border-stone-200/60">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B58A52]">
              El Corazón de Royal Raymi
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3B241C]">
              Nuestros Productores del VRAEM
            </h2>
            <p className="text-[#756C64] text-sm leading-relaxed">
              En Royal Raymi cosechamos un futuro más justo mediante el trabajo directo con comunidades cacaoteras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-[#E9E0D6] rounded-2xl shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7F2EB] flex items-center justify-center text-[#B58A52]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3B241C]">Comercio Justo Real</h3>
              <p className="text-[#756C64] text-xs sm:text-sm leading-relaxed">
                Garantizamos precios competitivos y condiciones dignas para que los pequeños productores transformen su calidad de vida.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E9E0D6] rounded-2xl shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7F2EB] flex items-center justify-center text-[#B58A52]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3B241C]">Asistencia Técnica</h3>
              <p className="text-[#756C64] text-xs sm:text-sm leading-relaxed">
                Capacitamos a nuestros agricultores en técnicas de cultivo avanzadas y manejo productivo optimizado.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E9E0D6] rounded-2xl shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F7F2EB] flex items-center justify-center text-[#B58A52]">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3B241C]">Sostenibilidad</h3>
              <p className="text-[#756C64] text-xs sm:text-sm leading-relaxed">
                Promovemos una agricultura limpia que respeta el medio ambiente y conserva los recursos naturales del VRAEM.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PromiseSection;
