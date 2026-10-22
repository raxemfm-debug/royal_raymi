import React, { useState, useEffect } from 'react';
import { ROYAL_RAYMI_PRODUCTS } from '../data/products';
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
  'DERIVADOS',
  'CAFÉ',
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
  selectedCategory: externalCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    externalCategory || 'TODOS'
  );
  const [highlightedId, setHighlightedId] = useState<string | number | null>(null);

  // 1. Sincronización cuando se hace clic desde el Footer
  useEffect(() => {
    if (externalCategory) {
      setSelectedCategory(externalCategory);
    }
  }, [externalCategory]);

  // 2. Redirección y scroll si viene desde Popular Products
  useEffect(() => {
    if (!targetProduct) return;

    const term = normalize(targetProduct);

    const found = ROYAL_RAYMI_PRODUCTS.find((p) => {
      const name = normalize(p.name);
      const slug = normalize(p.slug || '');
      return (
        name.includes(term) ||
        slug.includes(term) ||
        term.includes(slug) ||
        (term.includes('jalea') && (name.includes('bomb') || slug.includes('bomb')))
      );
    });

    if (found) {
      setSelectedCategory('TODOS');

      setTimeout(() => {
        const element = document.getElementById(`product-${found.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(found.id);

          const cardTrigger = element.querySelector('button, .cursor-pointer') as HTMLElement;
          if (cardTrigger) {
            cardTrigger.click();
          }

          setTimeout(() => {
            setHighlightedId(null);
            if (onClearTarget) onClearTarget();
          }, 3500);
        }
      }, 250);
    }
  }, [targetProduct, onClearTarget]);

  // 3. Filtrado con asignación inteligente de familias de productos
  const filteredProducts = ROYAL_RAYMI_PRODUCTS.filter((product) => {
    const sel = normalize(selectedCategory);
    if (!sel || sel === 'todos') return true;

    const name = normalize(product.name);
    const cat = normalize(product.category);
    const desc = normalize(product.description || '');

    // A. CHOCOLATES TRADICIONAL
    // Huamanguino, Obeliscos de la Pampa de la Quinua y tabletas clásicas para taza
    if (sel.includes('tradicional')) {
      return (
        name.includes('huamanguino') ||
        name.includes('obelisco') ||
        name.includes('pampa') ||
        name.includes('quinua') ||
        name.includes('taza') ||
        (cat.includes('polvo') && name.includes('taza'))
      );
    }

    // B. CHOCOLATES DE SABORES (Tabletas y barras con frutos, leche, bitter, etc.)
    if (sel.includes('sabor')) {
      const isTraditional =
        name.includes('huamanguino') ||
        name.includes('obelisco') ||
        name.includes('pampa');
      const isGragea = cat.includes('gragea') || name.includes('gragea');
      const isBombom = cat.includes('bomb') || name.includes('bomb');
      const isMantequilla = name.includes('mantequilla');

      return (
        (cat.includes('chocolate') || desc.includes('chocolate') || name.includes('choco')) &&
        !isTraditional &&
        !isGragea &&
        !isBombom &&
        !isMantequilla
      );
    }

    // C. GRAGEADOS (todas las grageas)
    if (sel.includes('gragea')) {
      return cat.includes('gragea') || name.includes('gragea');
    }

    // D. DERIVADOS / PASTAS (Mantequillas de maní, polvos y pastas de cacao)
    if (sel.includes('derivado') || sel.includes('pasta')) {
      return (
        name.includes('mantequilla') ||
        name.includes('mani') ||
        name.includes('pasta') ||
        name.includes('polvo') ||
        cat.includes('polvo') ||
        cat.includes('pasta') ||
        cat.includes('especialidad')
      );
    }

    // E. CAFÉ
    if (sel.includes('cafe')) {
      return cat.includes('cafe') || name.includes('cafe');
    }

    // F. BOMBONES Y CHOCOTEJAS
    if (sel.includes('bomb')) {
      return (
        cat.includes('bomb') ||
        name.includes('bomb') ||
        name.includes('chocoteja') ||
        name.includes('bonomix')
      );
    }

    return cat.includes(sel) || name.includes(sel);
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

        {/* Barra de pestañas */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected =
              normalize(selectedCategory) === normalize(cat) ||
              (normalize(cat).includes('derivado') && normalize(selectedCategory).includes('pasta'));

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isSelected
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className={`transition-all duration-500 rounded-xl ${
                  highlightedId === product.id
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
