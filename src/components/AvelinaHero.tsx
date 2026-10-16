import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import bannerChocoBerries from '../assets/banners/choco-berries.webp';
import bannerBombones from '../assets/banners/festival_de_bombones.webp';
import bannerHelados from '../assets/banners/helados.webp';
import bannerSaborAyacuchano from '../assets/banners/sabor_ayacuchano.webp';
import bannerRoyalRaymi from '../assets/banners/royal_raymi.webp';

interface BannerSlide {
  id: string;
  image: string;
  alt: string;
}

const BANNERS: BannerSlide[] = [
  {
    id: 'choco-berries',
    image: bannerChocoBerries,
    alt: 'Choco Berries Royal Raymi',
  },
  {
    id: 'festival-bombones',
    image: bannerBombones,
    alt: 'Festival de Bombones Royal Raymi',
  },
  {
    id: 'helados',
    image: bannerHelados,
    alt: 'Línea de Helados Artesanales Royal Raymi',
  },
  {
    id: 'sabor-ayacuchano',
    image: bannerSaborAyacuchano,
    alt: 'Sabor Ayacuchano del VRAEM para el Mundo',
  },
  {
    id: 'royal-raymi-principal',
    image: bannerRoyalRaymi,
    alt: 'Royal Raymi The Scent of VRAEM',
  },
];

export const AvelinaHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  }, []);

  // Autoplay cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full overflow-hidden select-none bg-white">
      {/* Contenedor ajustado a la proporción real del banner:
          aspect-[16/7] en móvil y aspect-[21/9] en PC para eliminar cualquier franja blanca
      */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[16/7] md:aspect-[21/9] overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNERS.map((banner) => (
            <div
              key={banner.id}
              className="w-full h-full flex-shrink-0 relative overflow-hidden"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Flecha Izquierda */}
        <button
          onClick={prevSlide}
          aria-label="Anterior diapositiva"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55 active:scale-95"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Flecha Derecha */}
        <button
          onClick={nextSlide}
          aria-label="Siguiente diapositiva"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-all hover:bg-black/55 active:scale-95"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Indicadores / Puntos dentro del banner */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a la diapositiva ${idx + 1}`}
              className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-5 sm:w-6 bg-white shadow-sm'
                  : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvelinaHero;
