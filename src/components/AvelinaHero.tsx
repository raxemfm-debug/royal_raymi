import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Vite + React: conservar estas rutas relativas al componente.
import bannerCafe from "../assets/banners/cafe_de_calidad_mundial.webp";
import bannerCafeMobile from "../assets/banners/cafe_de_calidad_mundial_mobile.webp";
import bannerChocotejas from "../assets/banners/chocotejas_premium.webp";
import bannerChocotejasMobile from "../assets/banners/chocotejas_premium_mobile.webp";
import bannerRoyalRaymi from "../assets/banners/royal_raymi.webp";
import bannerRoyalRaymiMobile from "../assets/banners/royal_raymi_mobile.webp";
import bannerVariedad from "../assets/banners/todo_un_mundo.webp";
import bannerVariedadMobile from "../assets/banners/todo_un_mundo_mobile.webp";

const AUTOPLAY_MS = 6500;

type HeroBanner = {
  desktop: string;
  mobile: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  contrast: "dark" | "light";
};

const BANNERS: HeroBanner[] = [
  {
    desktop: bannerCafe,
    mobile: bannerCafeMobile,
    alt: "Café Royal Raymi: tueste francés y café Geisha de Ayacucho",
    eyebrow: "Café de",
    title: "CALIDAD MUNDIAL",
    description: "Aromas excepcionales y café de especialidad cultivado en el VRAEM.",
    contrast: "dark",
  },
  {
    desktop: bannerChocotejas,
    mobile: bannerChocotejasMobile,
    alt: "Chocotejas Royal Raymi con cacao premium y rellenos variados",
    eyebrow: "Una exquisita",
    title: "SELECCIÓN DE CHOCOTEJAS",
    description: "Cacao premium, manjar blanco, frutas confitadas y pecanas tostadas.",
    contrast: "dark",
  },
  {
    desktop: bannerRoyalRaymi,
    mobile: bannerRoyalRaymiMobile,
    alt: "Origen del café y cacao Royal Raymi en el VRAEM",
    eyebrow: "Royal Raymi",
    title: "DEL VRAEM AL MUNDO",
    description: "Cacao fino de aroma y café que celebran nuestras raíces ayacuchanas.",
    contrast: "light",
  },
  {
    desktop: bannerVariedad,
    mobile: bannerVariedadMobile,
    alt: "Variedad de chocolates rellenos Royal Raymi",
    eyebrow: "Todo un mundo",
    title: "DE VARIEDAD Y SABOR",
    description: "Sabores memorables elaborados con el mejor cacao de nuestra tierra.",
    contrast: "dark",
  },
];

export function AvelinaHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [hiddenPaused, setHiddenPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const isPaused = hoverPaused || focusPaused || hiddenPaused || prefersReducedMotion;
  const showNext = () => setCurrentIndex((current) => (current + 1) % BANNERS.length);
  const showPrevious = () =>
    setCurrentIndex((current) => (current - 1 + BANNERS.length) % BANNERS.length);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setHiddenPaused(document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setTimeout(() => {
      setCurrentIndex((current) => (current + 1) % BANNERS.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [currentIndex, isPaused]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const x = event.changedTouches[0]?.clientX;
    if (touchStartX.current === null || x === undefined) return;
    const movement = x - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(movement) < 55) return;
    if (movement < 0) showNext();
    else showPrevious();
  };

  return (
    <section
      aria-label="Destacados de Royal Raymi"
      aria-roledescription="carrusel"
      className="relative isolate w-full overflow-hidden bg-[#FAF7F2]"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }
      }}
    >
      <style>{`
        @keyframes rr-hero-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rr-hero-slide { transition: none !important; transform: none !important; }
          .rr-hero-progress { animation: none !important; }
        }
      `}</style>

      <div
        className="relative aspect-[3/4] w-full md:aspect-[1932/814]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {BANNERS.map((banner, index) => {
          const active = index === currentIndex;
          const light = banner.contrast === "light";
          return (
            <div
              key={banner.desktop}
              aria-hidden={!active}
              className={`rr-hero-slide absolute inset-0 overflow-hidden transition-[opacity,transform] duration-1000 ease-out ${
                active
                  ? "z-[1] scale-100 opacity-100"
                  : "pointer-events-none z-0 scale-[1.015] opacity-0"
              }`}
            >
              {/* <picture> descarga solo el formato adecuado al ancho de pantalla. */}
              <picture className="block h-full w-full">
                <source
                  media="(min-width: 768px)"
                  srcSet={banner.desktop}
                  type="image/webp"
                />
                <img
                  src={banner.mobile}
                  alt={banner.alt}
                  className="block h-full w-full object-cover md:object-contain"
                  width={900}
                  height={1200}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  draggable={false}
                />
              </picture>

              {/* Texto HTML legible en móvil; el arte original se conserva en escritorio. */}
              <div className="md:hidden">
                <div
                  className={`absolute inset-x-0 top-0 px-[7%] pt-[7%] ${
                    light ? "text-[#FFFBF4]" : "text-[#4A2E2B]"
                  }`}
                >
                  <p
                    className={`font-serif text-[clamp(0.95rem,4.1vw,1.5rem)] italic tracking-wide ${
                      light ? "text-[#EAD6AA]" : "text-[#BD3027]"
                    }`}
                  >
                    {banner.eyebrow}
                  </p>
                  <h2 className="mt-1 max-w-[94%] font-serif text-[clamp(1.35rem,6.2vw,2.75rem)] leading-[1.04] tracking-[-0.035em]">
                    {banner.title}
                  </h2>
                  <p
                    className={`mt-2 max-w-[85%] text-[clamp(0.65rem,2.8vw,0.98rem)] leading-[1.45] ${
                      light ? "text-white/85" : "text-[#5E4439]"
                    }`}
                  >
                    {banner.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-3 md:px-6">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Ver banner anterior"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/65 bg-white/75 text-[#3B241C] shadow-md backdrop-blur-md transition hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B58A52] sm:h-11 sm:w-11"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Ver banner siguiente"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/65 bg-white/75 text-[#3B241C] shadow-md backdrop-blur-md transition hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B58A52] sm:h-11 sm:w-11"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex items-center justify-center sm:bottom-5">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-md">
            {BANNERS.map((banner, index) => {
              const active = currentIndex === index;
              return (
                <button
                  key={banner.desktop}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir al banner ${index + 1} de ${BANNERS.length}`}
                  aria-current={active ? "true" : undefined}
                  className={`relative h-2.5 overflow-hidden rounded-full transition-[width,background-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B58A52] ${
                    active ? "w-9 bg-[#3B241C]/20" : "w-2.5 bg-[#3B241C]/35 hover:bg-[#3B241C]/65"
                  }`}
                >
                  {active && (
                    <span
                      key={`progress-${currentIndex}`}
                      className="rr-hero-progress absolute inset-0 origin-left rounded-full bg-[#8B5A36]"
                      style={{
                        animation: `rr-hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AvelinaHero;
