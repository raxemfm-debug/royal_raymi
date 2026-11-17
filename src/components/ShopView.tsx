import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import type { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowUpDown } from 'lucide-react';

interface ShopViewProps {
  targetProduct?: string | null;
  onClearTarget?: () => void;
  selectedCategory?: string;
  onReserveProduct?: (product: any) => void;
  onSelectProduct?: (product: any) => void;
}

const CATEGORIES = [
  'TODOS',
  'CHOCOLATES TRADICIONAL',
  'CHOCOLATES DE SABORES',
  'GRAGEADOS',
  'DERIVADOS',
  'CAFÉ',
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
  selectedCategory: externalCategory,
  onSelectProduct,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    externalCategory || 'TODOS'
  );
  const [highlightedId, setHighlightedId] = useState<string | number | null>(null);

  // 1. Cargar productos desde Supabase en tiempo real
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_archived', false)
          .order('name', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped: Product[] = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            category: d.category,
            categoryKey: d.category_key,
            description: d.description || '',
            imageUrl: d.image_url || '/assets/brand/Royal-Raymi-logo-cacao-profundo.png',
            price: d.price ?? undefined,
            isPopular: d.is_popular,
            images: [d.image_url || '/assets/brand/Royal-Raymi-logo-cacao-profundo.png'],
            available: true,
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Error al sincronizar con Supabase:', err);
      }
    }

    fetchProducts();
  }, []);

  // 2. Sincronización de categoría externa
  useEffect(() => {
    if (externalCategory) {
      setSelectedCategory(externalCategory);
    }
  }, [externalCategory]);

  // 3. Auto-scroll y resalte del producto seleccionado desde la portada
  useEffect(() => {
    if (!targetProduct || products.length === 0) return;

    setSelectedCategory('TODOS');
    setHighlightedId(targetProduct);

    const timer = setTimeout(() => {
      let element = document.getElementById(`product-${targetProduct}`);

      if (!element) {
        element = document.querySelector(`[data-product-id="${targetProduct}"]`);
      }

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (onClearTarget) {
        setTimeout(() => onClearTarget(), 1000);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [targetProduct, products]);

  // 4. Filtrado por categoría y ordenamiento alfabético garantizado
  const filteredProducts = products
    .filter((product) => {
      const sel = normalize(selectedCategory);
      if (!sel || sel === 'todos') return true;

      const name = normalize(product.name);
      const cat = normalize(product.category);

      if (sel.includes('tradicional')) {
        return (
          cat.includes('tradicional') ||
          name.includes('huamanguino') ||
          name.includes('obelisco') ||
          name.includes('pampa') ||
          name.includes('quinua') ||
          name.includes('taza')
        );
      }

      if (sel.includes('sabor')) {
        return (
          cat.includes('sabor') ||
          (cat.includes('chocolate') &&
            !name.includes('huamanguino') &&
            !name.includes('obelisco') &&
            !cat.includes('gragea') &&
            !cat.includes('derivado'))
        );
      }

      if (sel.includes('gragea')) return cat.includes('gragea');
      if (sel.includes('derivado') || sel.includes('pasta')) return cat.includes('derivado') || cat.includes('pasta');
      if (sel.includes('cafe')) return cat.includes('cafe');
      if (sel.includes('licor')) return cat.includes('licor');
      if (sel.includes('bomb')) return cat.includes('bomb') || cat.includes('chocoteja');

      return cat.includes(sel) || name.includes(sel);
    })
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera */}
        <div className="text-center mb-10">
          <span className="text-[#B58A52] text-xs uppercase tracking-[0.3em] font-semibold">
            Catálogo Oficial
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#3B241C] mt-2">
            Nuestros Productos
          </h1>
          <div className="w-16 h-0.5 bg-[#B58A52] mx-auto mt-4" />
        </div>

        {/* Barra de pestañas */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isSelected = normalize(selectedCategory) === normalize(cat);
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

        {/* Barra de control: Contador de resultados y Botón Organizador A-Z */}
        <div className="flex items-center justify-between border-b border-[#3B241C]/10 pb-4 mb-8">
          <span className="font-sans text-xs uppercase tracking-wider text-[#8C7A6B]">
            Mostrando {filteredProducts.length} producto{filteredProducts.length === 1 ? '' : 's'}
          </span>

          <button
            type="button"
            onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2C1810]/20 bg-white text-[#2C1810] font-sans text-xs font-semibold uppercase tracking-wider hover:border-[#B58A52] hover:text-[#B58A52] transition-all shadow-sm"
            title="Alternar orden alfabético"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B58A52]" />
            <span>{sortOrder === 'asc' ? 'Nombre: A — Z' : 'Nombre: Z — A'}</span>
          </button>
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
                <ProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopView;
