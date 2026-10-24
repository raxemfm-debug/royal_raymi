import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Importación directa de los 5 banners desde src/assets/banners/
import cafeDeCalidad from '../assets/banners/café_de_calidad.webp';
import chocotejasPremium from '../assets/banners/chocotejas_premium.webp';
import helados from '../assets/banners/helados.webp';
import royalRaymi from '../assets/banners/royal_raymi.webp';
import todoUnMundo from '../assets/banners/todo_un_mundo.webp';

const BANNERS = [
  {
    id: 1,
    image: chocotejasPremium,
    alt: 'Chocotejas Premium Royal Raymi'
  },
  {
    id: 2,
    image: todoUnMundo,
    alt: 'Todo un mundo de variedad y sabor'
  },
  {
    id: 3,
    image: cafeDeCalidad,
    alt: 'Café de calidad mundial'
  },
  {
    id: 4,
    image: royalRaymi,
    alt: 'Royal Raymi tradición'
  },
  {
    id: 5,
    image: helados,
    alt: 'Helados y novedades Royal Raymi'
  }
];

export const AvelinaHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white p-0 m-0">
      {/* Carrusel a pantalla completa horizontal */}
      <div className="relative w-full">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNERS.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0">
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-auto block select-none object-cover"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Flecha Izquierda */}
        <button
          onClick={handlePrev}
          aria-label="Banner anterior"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/25 hover:bg-black/45 text-white backdrop-blur-sm flex items-center justify-center transition-all shadow-md"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Flecha Derecha */}
        <button
          onClick={handleNext}
          aria-label="Siguiente banner"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/25 hover:bg-black/45 text-white backdrop-blur-sm flex items-center justify-center transition-all shadow-md"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Indicadores (dots) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir al banner ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-white shadow'
                  : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvelinaHero;
