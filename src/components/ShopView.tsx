import React, { useState, useEffect } from 'react';
import { PRODUCTS, type Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  targetProduct?: string | null;
  onClearTarget?: () => void;
  selectedCategory?: string;
  onReserveProduct?: (product: any) => void;
}

const CATEGORIES = [
  'TODOS',
  'CHOCOLATES TRADICIONAL',
  'CHOCOLATES DE SABORES',
  'GRAGEADOS',
  'CAFÉ',
  'DERIVADOS',
  'LICORES',
  'BOMBONES',
];

const normalize = (text: string) =>
  (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export const ShopView: React.FC<ShopViewProps> = ({
  targetProduct,
  onClearTarget,
  selectedCategory: initialCategory = 'TODOS',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'TODOS');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Sincronizar si cambia la categoría desde afuera (ej. Navbar o Footer)
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Manejo de scroll hacia un producto seleccionado desde otra vista
  useEffect(() => {
    if (targetProduct) {
      const found = PRODUCTS.find(
        (p: Product) =>
          normalize(p.id) === normalize(targetProduct) ||
          normalize(p.name) === normalize(targetProduct)
      );

      if (found) {
        setActiveCategory('TODOS');
        setHighlightedId(found.id);

        setTimeout(() => {
          const el = document.getElementById(`product-${found.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);

        const timer = setTimeout(() => {
          setHighlightedId(null);
          onClearTarget?.();
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
  }, [targetProduct, onClearTarget]);

  // Filtrado simple y directo por categoría
  const filteredProducts = PRODUCTS.filter((product: Product) => {
    const sel = normalize(activeCategory);
    if (!sel || sel === 'todos') return true;

    const cat = normalize(product.category);
    return cat === sel || cat.includes(sel) || sel.includes(cat);
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Título de la sección */}
        <div className="text-center mb-10">
          <span className="text-[#B58A52] text-xs uppercase tracking-[0.3em] font-semibold">
            Catálogo Exclusivo
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#3B241C] mt-2">
            Nuestros Productos
          </h1>
          <div className="w-16 h-0.5 bg-[#B58A52] mx-auto mt-4" />
        </div>

        {/* Barra de pestañas / Categorías */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = normalize(activeCategory) === normalize(cat);

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${isSelected
                    ? 'bg-[#3B241C] text-white shadow-md'
                    : 'bg-white text-[#3B241C]/70 hover:bg-[#3B241C]/10 border border-[#3B241C]/10'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Rejilla de productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-[#3B241C]/60">
            No se encontraron productos en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className={`transition-all duration-500 rounded-xl ${highlightedId === product.id
                    ? 'ring-4 ring-[#B58A52] ring-offset-4 scale-105 shadow-2xl'
                    : ''
                  }`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
