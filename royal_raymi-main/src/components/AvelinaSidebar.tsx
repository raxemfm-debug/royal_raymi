import React from "react";
import { X } from "lucide-react";
import type { NavPage } from "./Navbar";

export interface AvelinaSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: NavPage) => void;
}

export const AvelinaSidebar: React.FC<AvelinaSidebarProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const handleNav = (target: "inicio" | "popular" | "blog") => {
    onClose();
    if (target === "inicio") {
      onNavigate?.("inicio");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "popular") {
      onNavigate?.("inicio");
      setTimeout(() => {
        const el = document.getElementById("popular-products-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else if (target === "blog") {
      onNavigate?.("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Drawer */}
      <aside
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menú Royal Raymi"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#FAF7F2] border-l border-[#E9E0D6] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div>
          <div className="flex items-center justify-between border-b border-[#E9E0D6] px-6 py-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B58A52]">
                Ayacucho — VRAEM
              </p>
              <h3 className="font-serif text-xl font-bold text-[#3B241C]">
                Royal Raymi
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#756C64] hover:text-[#3B241C] hover:bg-[#F7F2EB] rounded-full transition-colors"
              aria-label="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Enlaces solicitados: Inicio, Productos Populares, Blog */}
          <nav className="flex flex-col p-6 space-y-3">
            <button
              type="button"
              onClick={() => handleNav("inicio")}
              className="text-left font-serif text-lg text-[#3B241C] hover:text-[#B58A52] py-2.5 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Inicio
            </button>

            <button
              type="button"
              onClick={() => handleNav("popular")}
              className="text-left font-serif text-lg text-[#3B241C] hover:text-[#B58A52] py-2.5 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Productos Populares
            </button>

            <button
              type="button"
              onClick={() => handleNav("blog")}
              className="text-left font-serif text-lg text-[#3B241C] hover:text-[#B58A52] py-2.5 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Blog & Noticias
            </button>
          </nav>
        </div>

        {/* Pie del menú */}
        <div className="p-6 border-t border-[#E9E0D6] bg-white/60">
          <p className="text-xs text-[#6E5D53]">
            Portal Independencia N° 63, Ayacucho
          </p>
          <p className="text-[11px] text-[#B58A52] font-semibold mt-1">
            +51 966 651 861
          </p>
        </div>
      </aside>
    </>
  );
};
