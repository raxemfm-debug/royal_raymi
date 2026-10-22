import React, { useState, useEffect } from "react"
import { BrandLogo } from "./BrandLogo";

export type NavPage = "inicio" | "tienda" | "nosotros" | "productores" | "sucursales" | "blog";

export interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSidebar?: () => void; // <-- AGREGA ESTA LÍNEA
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSidebar,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { id: NavPage; label: string }[] = [
    { id: "tienda", label: "Tienda" },
    { id: "nosotros", label: "Nosotros" },
    { id: "productores", label: "Nuestros Productores" },
    { id: "sucursales", label: "Puntos de Ventas" },
    { id: "blog", label: "Blog" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
          ? "bg-[#FDFBF7]/90 backdrop-blur-md shadow-sm border-b border-[#E9E0D6] py-3.5"
          : "bg-[#FDFBF7] border-b border-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Extremo Izquierdo: Logo Oficial */}
        <button
          onClick={() => onNavigate("inicio")}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B241C] cursor-pointer"
          aria-label="Ir a Inicio de Royal Raymi"
        >
          <BrandLogo />
        </button>

        {/* Centro: Enlaces de Navegación Independientes */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A52] rounded ${isActive
                    ? "text-[#3B241C] font-semibold"
                    : "text-[#756C64] hover:text-[#3B241C]"
                  }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B58A52] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Extremo Derecho: Botón Categorías + Hamburguesa de Líneas Delgadas Estilo Avelina */}
        <div className="flex items-center gap-4">

          {/* Icono de menú extendido de líneas delgadas (Avelina) */}
          <button
            onClick={onOpenSidebar}
            className="p-2 text-[#3B241C] hover:text-[#B58A52] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A52] rounded"
            aria-label="Abrir panel lateral de menú"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className="w-6 h-[1.5px] bg-[#3B241C] rounded-full transition-all" />
              <span className="w-4 h-[1.5px] bg-[#3B241C] rounded-full transition-all" />
              <span className="w-5 h-[1.5px] bg-[#3B241C] rounded-full transition-all" />
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};
