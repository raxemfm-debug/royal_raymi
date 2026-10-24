import React from 'react';
import cosecha1 from '../assets/blog_items/cosecha_1.webp';
import cosecha2 from '../assets/blog_items/cosecha_2.webp';
import cosecha3 from '../assets/blog_items/cosecha_3.webp';


interface BlogViewProps {
  onGoToShop?: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onGoToShop }) => {
  return (
    <article className="min-h-screen bg-[#FAF7F2] text-[#2B1B17] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Editorial */}
        <header className="text-center space-y-4 mb-10">
          <span className="inline-block px-3 py-1 bg-[#F4EFE6] text-[#8C5D38] border border-[#E8DEC8] rounded-full text-xs font-semibold tracking-widest uppercase">
            Origen &amp; Territorio • VRAEM
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2B1B17] leading-tight">
            Café peruano: un sabor que nace entre montañas y contrastes
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto italic font-serif">
            Detrás de cada taza hay montañas, clima, tierra y el trabajo de quienes convierten los frutos de su región en una experiencia sensorial.
          </p>
          <div className="w-16 h-[2px] bg-[#B58A52] mx-auto mt-4" />
        </header>

        {/* Imagen Principal (Hero del artículo) */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-[#E8DEC8] mb-12">
          <img
            src={cosecha1}
            alt="Cosecha de café peruano en el VRAEM"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-md">
            Productores de Ayacucho &amp; VRAEM
          </span>
        </div>

        {/* Cuerpo del artículo */}
        <div className="space-y-8 text-stone-800 text-base sm:text-lg leading-relaxed font-light">
          
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#3B241C]">
            El café peruano tiene una riqueza que va mucho más allá de su aroma y sabor. Su personalidad nace de la diversidad geográfica del Perú, donde las montañas, los suelos, la altitud y los cambios de temperatura crean condiciones particulares para el cultivo del café.
          </p>

          <p>
            Un ejemplo fascinante se encuentra en Ayacucho, especialmente en las zonas cafetaleras de Huanta y el VRAEM, donde los paisajes de ceja de selva ofrecen contrastes climáticos que pueden marcar la diferencia. En determinadas zonas, los días son calurosos y las noches considerablemente más frescas. Estas variaciones, junto con la altitud y otros factores ambientales, pueden influir en la maduración de las cerezas y en el desarrollo de sus características.
          </p>

          {/* Galería de dos columnas: Detalle de cerezas + Paisaje */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="space-y-2">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-[#E8DEC8]">
                <img
                  src={cosecha2}
                  alt="Cerezas maduras de café en el arbusto"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <p className="text-xs text-stone-500 text-center italic">
                Cerezas de café en su punto óptimo de maduración.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-[#E8DEC8]">
                <img
                  src={cosecha3}
                  alt="Paisaje de montañas y valles cafetaleros"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <p className="text-xs text-stone-500 text-center italic">
                Geografía montañosa y contrastes térmicos del VRAEM.
              </p>
            </div>
          </div>

          <p>
            Pero el territorio es solo el comienzo. La variedad del cafeto, el cuidado del productor, la selección de los frutos maduros y los procesos de fermentación, secado y tostado también determinan el perfil final de cada café. Por eso, una misma región puede ofrecer granos con notas dulces, achocolatadas, frutales o florales, cada uno con una identidad propia.
          </p>

          {/* Cita Destacada */}
          <blockquote className="my-10 p-6 sm:p-8 bg-[#F4EFE6] border-l-4 border-[#B58A52] rounded-r-2xl italic font-serif text-[#3B241C] text-lg sm:text-xl">
            "La peculiaridad del café peruano está en su diversidad. Cada zona productora tiene condiciones particulares y cada cosecha representa una oportunidad para descubrir nuevos aromas y sabores."
          </blockquote>

          <p>
            En Ayacucho, esta riqueza constituye una oportunidad para dar mayor visibilidad a los productores y a los cafés del VRAEM, un territorio cuyo potencial merece ser conocido y valorado.
          </p>

          <p className="font-medium text-[#2B1B17]">
            Porque detrás de cada taza hay mucho más que café: hay montañas, clima, tierra y el trabajo de quienes convierten los frutos de su región en una experiencia para los sentidos.
          </p>

          {/* Cierre institucional */}
          <div className="mt-12 p-8 bg-white border border-[#E8DEC8] rounded-2xl shadow-sm text-center space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-[#3B241C]">
              El compromiso de Royal Raymi
            </h3>
            <p className="text-stone-700 text-sm sm:text-base max-w-xl mx-auto">
              Royal Raymi celebra la riqueza de los productos peruanos y el valor de los territorios que les dan origen. Descubrir el café del Perú es también descubrir la diversidad, la historia y el carácter de nuestra tierra.
            </p>
            {onGoToShop && (
              <button
                type="button"
                onClick={onGoToShop}
                className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#3B241C] hover:bg-[#2B1B17] text-white text-sm font-medium transition-colors shadow-sm"
              >
                Explorar nuestra línea de cafés
              </button>
            )}
          </div>

        </div>

      </div>
    </article>
  );
};
