import React from "react";
import { ShieldCheck, Users, Leaf, } from "lucide-react";

interface ProducerProfile {
  id: number;
  name: string;
  role: string;
  region: string;
  image: string;
  bio: string;
}

const PRODUCERS: ProducerProfile[] = [
  {
    id: 1,
    name: "Ing. Doris Paucar Pizarro",
    role: "Gerente General & Dirección de Calidad",
    region: "Ayacucho / VRAEM",
    image: "/assets/producers/ing_doris_Gerente_General.jpg", // 👈 .jpg
    bio: "Lidera la visión sostenible de Royal Raymi..."
  },
  {
    id: 2,
    name: "Familias Cacaoteras del Valle",
    role: "Guardianes del Cacao Nativo de Aroma",
    region: "Kimbiri y Pichari, VRAEM",
    image: "/assets/producers/productores.jpg", // 👈 .jpg
    bio: "Pequeños agricultores asociados que conservan variedades ancestrales..."
  },
  {
    id: 3,
    name: "Productores de Café de Altura",
    role: "Comunidad de Selva Alta",
    region: "Valle del Río Apurímac",
    image: "/assets/producers/productores2.jpg", // 👈 .jpg
    bio: "Cultivan microlotes de café arábica bajo sombra..."
  },
  {
    id: 4,
    name: "Selección Manual de Cosecha",
    role: "Artesanos de Selección en Planta",
    region: "Planta Artesanal, Ayacucho",
    image: "/assets/producers/foto_principal.jpeg", // 👈 .jpeg
    bio: "Cada lote recibido pasa por una rigurosa separación manual..."
  }
];



export const ProducersSection: React.FC = () => {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 animate-page-transition">
      {/* Cabecera Editorial */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#B58A52]">
          El Corazón de Royal Raymi
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#3B241C] mt-2 mb-6">
          Nuestros Productores del VRAEM
        </h1>
        <div className="w-16 h-px bg-[#B58A52]/40 mx-auto mb-6" />
        <p className="text-[#756C64] text-base leading-relaxed text-justify">
          En Royal Raymi no solo comercializamos café y cacao orgánico de alta calidad; cosechamos un futuro más justo. Trabajamos mano a mano con las familias agricultoras del VRAEM, un valle bendecido por una biodiversidad única donde nacen los mejores sabores de Ayacucho.
        </p>
      </div>

      {/* Grid Orgánico de Productores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        {PRODUCERS.map((item) => (
          <article
            key={item.id}
            className="group bg-[#F7F2EB] rounded-2xl overflow-hidden border border-[#E9E0D6] flex flex-col sm:flex-row hover:shadow-xl transition-all duration-300"
          >
            {/* Foto Real */}
            <div className="sm:w-1/2 aspect-[4/5] sm:aspect-auto overflow-hidden bg-[#E9E0D6] relative">
            <img
  src={item.image}
  alt={item.name}
  loading="lazy"
  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
  onError={() => {
    console.error("No se pudo cargar la imagen del productor:", item.image);
  }}
/>


              <span className="absolute bottom-3 left-3 bg-[#3B241C]/80 backdrop-blur-sm text-[#FDFBF7] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                {item.region}
              </span>
            </div>

            {/* Información Armoniosa */}
            <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-serif italic text-[#B58A52] block mb-1">
                  {item.role}
                </span>
                <h3 className="font-serif text-xl text-[#3B241C] font-semibold mb-3">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#756C64] leading-relaxed text-justify">
                  {item.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E9E0D6]/60 mt-4 flex items-center justify-between text-xs text-[#3B241C] font-medium">
                <span>Comercio Directo</span>
                <span className="text-[#B58A52]">Ayacucho</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Los 3 Pilares Fundamentales */}
      <div className="pt-10 border-t border-[#E9E0D6]">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B58A52] font-semibold">Alianza Ética</span>
          <h2 className="text-3xl font-serif text-[#3B241C] mt-1">Nuestros Tres Pilares</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#E9E0D6] text-center space-y-4 hover:border-[#B58A52] transition-colors">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F2EB] flex items-center justify-center text-[#B58A52]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#3B241C] font-medium">Comercio Justo Real</h3>
            <p className="text-xs text-[#756C64] leading-relaxed text-justify">
              Garantizamos precios competitivos y condiciones dignas para que los pequeños productores transformen su calidad de vida y fortalezcan sus comunidades.
            </p>
          </div>

          <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#E9E0D6] text-center space-y-4 hover:border-[#B58A52] transition-colors">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F2EB] flex items-center justify-center text-[#B58A52]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#3B241C] font-medium">Asistencia Técnica</h3>
            <p className="text-xs text-[#756C64] leading-relaxed text-justify">
              Capacitamos a nuestros agricultores en técnicas de cultivo avanzadas y manejo productivo, asegurando cosechas de nivel mundial.
            </p>
          </div>

          <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-[#E9E0D6] text-center space-y-4 hover:border-[#B58A52] transition-colors">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F2EB] flex items-center justify-center text-[#B58A52]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#3B241C] font-medium">Sostenibilidad del Origen</h3>
            <p className="text-xs text-[#756C64] leading-relaxed text-justify">
              Promovemos una agricultura limpia que respeta el medio ambiente, conserva los recursos naturales del VRAEM y protege la tierra para futuras generaciones.
            </p>
          </div>
        </div>
      </div>

      {/* Promesa de la Gerente General */}
              {/* Tarjeta Editorial: Nuestra Promesa con Fotografía */}
        <div className="relative mt-16 bg-[#2B1B17] text-white rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl border border-[#3B241C]">
          {/* Marca de agua de comillas de fondo */}
          <div className="absolute top-4 right-6 text-white/5 font-serif text-[140px] leading-none select-none pointer-events-none">
            “
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Lado Izquierdo: Fotografía de la Ing. Doris */}
            <div className="md:col-span-4 lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#B58A52]/40 shadow-xl group">
                <img
                  src="/assets/producers/ing_doris_Gerente_General.jpg"
                  alt="Ing. Doris Paucar Pizarro - Gerente General"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/producers/foto_principal.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-medium tracking-wider text-[#FAF7F2] uppercase bg-[#B58A52]/80 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  Gerencia General
                </span>
              </div>
            </div>

            {/* Lado Derecho: Declaración y Cita */}
            <div className="md:col-span-8 lg:col-span-8 space-y-5 text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B58A52] font-semibold">
                Nuestra Promesa
              </span>
              <blockquote className="font-serif italic text-base sm:text-lg lg:text-xl text-[#FAF7F2]/95 leading-relaxed font-light">
                "En Royal Raymi S.A.C., la calidad no solo se mide en la pureza de nuestro café o el porcentaje de nuestro cacao; se mide en los lazos que construimos. Ser ayacuchanos es nuestro mayor sello de identidad. Llevamos la riqueza del VRAEM al mercado global con la firme convicción de que el desarrollo sostenible de nuestra región es la clave de nuestro éxito internacional."
              </blockquote>
              <div className="pt-2 border-t border-white/10">
                <p className="font-serif font-semibold text-lg text-white tracking-wide">
                  Ing. Doris Paucar Pizarro
                </p>
                <p className="text-xs text-[#B58A52] uppercase tracking-widest font-medium">
                  Gerente General, Royal Raymi S.A.C.
                </p>
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}