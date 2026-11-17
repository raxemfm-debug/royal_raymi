import { X, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import type { ProductItem } from "../types";

interface ProductDetailModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: ProductItem, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  // Resolver imagen con compatibilidad webp/jpg igual que en ProductCard
  const anyProd = product as any;
  const rawImage = anyProd.imageUrl ?? anyProd.image_url ?? anyProd.image ?? "";
  const resolvedImage = rawImage ? rawImage.replace(/\.(jpg|jpeg|png)$/i, ".webp") : "";

  const handleAdd = () => {
    onAddToCart?.(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Fondo para cerrar */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MiniCard centrada estática en la pantalla */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-[#FAF7F2] border border-[#E9E0D6] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#3B241C] backdrop-blur hover:bg-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-60 w-full bg-white flex items-center justify-center p-4">
          <img
            src={resolvedImage}
            alt={product.name}
            className="h-full w-full object-contain"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-[#3B241C]/80 px-2.5 py-0.5 text-[11px] tracking-wider text-[#FAF7F2] uppercase font-sans">
            {product.category}
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-serif text-xl font-bold text-[#3B241C]">
            {product.name}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[#6E5D53]">
            {product.description ||
              "Elaborado con cacao fino de aroma y granos seleccionados del VRAEM. Tradición y pureza artesanal en cada bocado."}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-[#E9E0D6] bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-base font-bold text-[#3B241C] hover:bg-[#F3ECE1] transition-colors"
              >
                -
              </button>
              <span className="px-3 text-sm font-semibold text-[#3B241C]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 text-base font-bold text-[#3B241C] hover:bg-[#F3ECE1] transition-colors"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-sm font-medium transition-all duration-200 ${
                added
                  ? "bg-emerald-700 text-white"
                  : "bg-[#3B241C] text-[#FAF7F2] hover:bg-[#2A1811] active:scale-[0.98]"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>¡Añadido!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>Añadir al carrito</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
