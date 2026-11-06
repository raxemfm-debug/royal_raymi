import React from "react";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import type { NavPage } from "./Navbar";

export interface AvelinaSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: NavPage) => void;
}

interface MenuLink {
  label: string;
  page?: NavPage;
  action?: () => void;
}

export const AvelinaSidebar: React.FC<AvelinaSidebarProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const handleNav = (page: NavPage) => {
    onClose();
    if (window.location.pathname.startsWith("/producto")) {
      window.location.assign(page === "inicio" ? "/" : `/${page}`);
    } else {
      onNavigate?.(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePopularScroll = () => {
    onClose();
    if (window.location.pathname.startsWith("/producto")) {
      window.location.assign("/#popular-products-section");
    } else {
      onNavigate?.("inicio");
      setTimeout(() => {
        const el = document.getElementById("popular-products-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  const MENU_ITEMS: MenuLink[] = [
    { label: "Inicio", page: "inicio" },
    { label: "Tienda", page: "tienda" },
    { label: "Nosotros", page: "nosotros" },
    { label: "Nuestros Productores", page: "productores" },
    { label: "Puntos de Venta", page: "puntos_de_venta" },
    { label: "Blog", page: "blog" },
    { label: "Productos Populares", action: handlePopularScroll },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Drawer Móvil */}
      <aside
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de Navegación Royal Raymi"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-[#FAF7F2] border-l border-[#E9E0D6] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div>
          <div className="flex items-center justify-between border-b border-[#E9E0D6] px-6 py-5 bg-white/70">
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
              className="p-2 text-[#756C64] hover:text-[#3B241C] hover:bg-[#EFE8DD] rounded-full transition-colors active:scale-95"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de enlaces completa */}
          <nav className="flex flex-col p-6 space-y-1">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.page) {
                    handleNav(item.page);
                  }
                }}
                className="group flex items-center justify-between text-left font-serif text-[17px] text-[#3B241C] hover:text-[#B58A52] py-3 border-b border-[#E9E0D6]/60 transition-colors"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#B58A52]" />
              </button>
            ))}
          </nav>
        </div>

        {/* Pie del menú con contacto directo */}
        <div className="p-6 border-t border-[#E9E0D6] bg-white/80 space-y-2">
          <p className="text-xs text-[#6E5D53]">
            Jr. 28 de Julio 262, Huamanga, Ayacucho
          </p>
          <a
            href="https://wa.me/51967179747"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#B58A52] hover:text-[#3B241C] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>+51 967 179 747 (Pedidos WhatsApp)</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default AvelinaSidebar;
