import React, { useEffect } from "react";
import { X, Check } from "lucide-react";

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  totalProductsCount: number;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  // Cierre con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Bloquear scroll de fondo cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay oscuro interactivo con backdrop-blur */}
      <div
        className={`fixed inset-0 z-50 bg-[#29231F]/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel lateral deslizante (X-axis translation) */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-[#FDFBF7] shadow-2xl border-l border-[#E9E0D6] transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filtro de Categorías"
      >
        {/* Cabecera del panel */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E9E0D6]">
          <div>
            <h3 className="font-serif text-lg text-[#3B241C] font-semibold">Categorías</h3>
            <p className="text-xs text-[#756C64]">Filtra nuestra colección artesanal</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#756C64] hover:text-[#3B241C] hover:bg-[#F7F2EB] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A52]"
            aria-label="Cerrar panel de categorías"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de categorías */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  onSelectCategory(category);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-[#3B241C] text-[#FDFBF7] shadow-sm"
                    : "text-[#3B241C] bg-[#F7F2EB]/60 hover:bg-[#F7F2EB] hover:text-[#3B241C]"
                }`}
              >
                <span>{category}</span>
                {isSelected && <Check className="w-4 h-4 text-[#B58A52]" />}
              </button>
            );
          })}
        </div>

        {/* Pie del panel */}
        <div className="p-6 border-t border-[#E9E0D6] bg-[#F7F2EB]/40">
          <button
            onClick={() => {
              onSelectCategory("Todos");
              onClose();
            }}
            className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#756C64] hover:text-[#3B241C] transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </aside>
    </>
  );
};
