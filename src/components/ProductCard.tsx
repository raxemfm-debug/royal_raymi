import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import type { ProductItem } from '../data/products';

interface ProductCardProps {
  product: ProductItem;
  onAddToCart?: (product: ProductItem, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // 1. Detección automática y conversión estricta a .webp
  const rawImage = (product as any).imageUrl || (product as any).image || (product as any).image_url || '';
  const imgSrc = rawImage.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    setShowDetail(false);
    setQuantity(1);
  };

  return (
    <div 
      className="relative bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group min-h-[380px]"
      onClick={() => !showDetail && setShowDetail(true)}
    >
      {/* VISTA FRONTAL ESTÁTICA */}
      <div className="flex flex-col items-center text-center w-full">
        {/* Imagen del producto en .webp real */}
        <div className="w-full aspect-square bg-[#FAF7F2] rounded-xl p-4 flex items-center justify-center overflow-hidden mb-4">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Categoría */}
        <span className="text-[10px] uppercase tracking-widest text-[#B58A52] font-semibold mb-1">
          {product.category}
        </span>

        {/* Nombre del Producto */}
        <h3 className="font-serif font-semibold text-[#2B1B17] text-base leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Formato / Gramaje */}
        {(product as any).weight && (
          <p className="text-xs text-stone-500 mt-1">Formato: {(product as any).weight}</p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center text-xs text-[#8C5D38] font-medium">
        <span>Tocar para ver detalle</span>
      </div>

      {/* MINICARD DESPLEGABLE EN EL MISMO LUGAR ESTÁTICO */}
      {showDetail && (
        <div 
          className="absolute inset-0 z-20 bg-[#FAF7F2] rounded-2xl p-5 border-2 border-[#B58A52]/60 shadow-xl flex flex-col justify-between animate-in fade-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cabecera con botón de cerrar */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-[10px] uppercase tracking-widest bg-[#3B241C] text-white px-2 py-0.5 rounded font-medium">
              {product.category}
            </span>
            <button
              onClick={() => setShowDetail(false)}
              className="p-1 rounded-full text-stone-500 hover:text-[#3B241C] hover:bg-stone-200/60 transition-colors"
              title="Cerrar detalle"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contenido descriptivo */}
          <div className="my-auto py-2 text-center space-y-2">
            <h4 className="font-serif font-semibold text-[#2B1B17] text-sm sm:text-base leading-snug">
              {product.name}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-light line-clamp-4">
              {product.description || 'Elaborado con selectos granos de cacao fino de aroma y técnicas artesanales de Ayacucho.'}
            </p>
          </div>

          {/* Selector de cantidad y botón añadir al carrito */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded border border-stone-300 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-100"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-semibold text-[#2B1B17] w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded border border-stone-300 bg-white flex items-center justify-center text-stone-700 hover:bg-stone-100"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-2 px-3 bg-[#3B241C] text-white rounded-xl text-xs font-medium hover:bg-[#2B1B17] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Añadir al carrito</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
