import React from 'react';

const videos = [
  {
    image: '/assets/float_images/almond_and_vino.webp',
    fallback: '/assets/float_images/almond_and_vino.jpg',
    alt: 'Almond and vino',
    url: 'https://www.tiktok.com/@royal_raymi/video/7528275839235017990',
  },
  {
    image: '/assets/float_images/chocolate_delight.webp',
    fallback: '/assets/float_images/chocolate_delight.jpg',
    alt: 'Chocolate delight',
    url: 'https://www.tiktok.com/@royal_raymi/video/7697051193838750996',
  },
  {
    image: '/assets/float_images/deluxe_chocolate.webp',
    fallback: '/assets/float_images/deluxe_chocolate.jpg',
    alt: 'Deluxe chocolate',
    url: 'https://www.tiktok.com/@royal_raymi/video/7691727506784783636',
  },
  {
    image: '/assets/float_images/ruby_&_dark.webp',
    fallback: '/assets/float_images/ruby_&_dark.jpg',
    alt: 'Ruby and dark chocolate',
    url: 'https://www.tiktok.com/@royal_raymi/video/7624679251098324245',
  },
];

export const TikTokGallery: React.FC = () => {
  return (
    <section className="overflow-hidden bg-[#F4ECE1] px-4 py-14 sm:px-6 sm:py-20 border-t border-[#E8DEC8]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A34835]">
            Desde nuestro mundo
          </span>
          <h2 className="mt-2 font-serif text-3xl text-[#2B1B17] sm:text-4xl font-medium tracking-tight">
            Royal Raymi en movimiento
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-stone-600 font-light">
            Descubre momentos, procesos e historias detrás de nuestros chocolates y café.
          </p>
        </div>

        <div className="grid grid-cols-2 items-center gap-4 sm:gap-6 md:grid-cols-4">
          {videos.map((video, index) => (
            <a
              key={video.url}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver video en TikTok: ${video.alt}`}
              className={`group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-[#E8DEC8] bg-white p-2 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                index % 2 === 1 ? 'md:translate-y-4' : 'md:-translate-y-2'
              }`}
            >
              <img
                src={video.image}
                alt={video.alt}
                onError={(e) => {
                  if (e.currentTarget.src !== video.fallback) {
                    e.currentTarget.src = video.fallback;
                  }
                }}
                className="h-full w-full rounded-xl object-cover transition duration-700 ease-out group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TikTokGallery;
