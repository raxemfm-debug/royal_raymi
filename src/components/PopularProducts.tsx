import React from "react";

interface PopularProductsProps {
  onGoToProduct?: (productName: string) => void;
}

interface PopularItem {
  id: number;
  name: string;
  tagline: string;
  category: string;
  image: string;
  weight: string;
}

const POPULAR_ITEMS: PopularItem[] = [
  {
    id: 1,
    name: "Chocolate Huamanguino 300g",
    tagline: "Receta ancestral con notas intensas y canela",
    category: "Chocolates Tradicional",
    image: "/assets/products/chocolate-huamanguino-300-g.webp",
    weight: "300 g",
  },
  {
    id: 2,
    name: "Polvo de Cacao 150g",
    tagline: "Cacao puro 100% fino de aroma del VRAEM",
    category: "Derivados",
    image: "/assets/products/polvo_de_cacao_150g.webp",
    weight: "150 g",
  },
  {
    id: 3,
    name: "Grageas de Arándanos y Aguaymanto 100g",
    tagline: "Frutos andinos cubiertos en chocolate al 70%",
    category: "Grageados",
    image: "/assets/products/grageas-de-arandanos-y-aguaymanto-100-g.webp",
    weight: "100 g",
  },
  {
    id: 4,
    name: "Grageas de Café 180g",
    tagline: "Granos de café arábica tostado cubiertos en cacao",
    category: "Grageados",
    image: "/assets/products/grageas-de-cafe-180-g.webp",
    weight: "180 g",
  },
  {
    id: 5,
    name: "Grageas de Almendras 180g",
    tagline: "Almendras selectas con cobertura de chocolate gourmet",
    category: "Grageados",
    image: "/assets/products/grageas-de-almendras-180-g.webp",
    weight: "180 g",
  },
  {
    id: 6,
    name: "Café Tueste Americano 250g",
    tagline: "Café de altura con cuerpo balanceado y aroma floral",
    category: "Café",
    image: "/assets/products/café_tueste_americano_250g.webp",
    weight: "250 g",
  },
];

export const PopularProducts: React.FC<PopularProductsProps> = ({ onGoToProduct }) => {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#B58A52] text-xs uppercase tracking-[0.25em] font-semibold font-serif">
            Selección Destacada
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3B241C] mt-2 mb-4">
            Los Más Pedidos
          </h2>
          <div className="w-12 h-0.5 bg-[#B58A52] mx-auto mb-4" />
          <p className="text-[#7A6B63] text-sm md:text-base leading-relaxed">
            Nuestros clásicos favoritos de chocolate, café de origen y frutos bañados en cacao.
          </p>
        </div>

        {/* Grid de 6 Tarjetas (1 col móvil, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onGoToProduct && onGoToProduct(item.name)}
              className="bg-white rounded-2xl border border-[#E9E0D6] p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Imagen del Producto con zoom hover y fallback */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF7F2] mb-5 flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/brand/royal-raymi-logo-azul.png";
                    }}
                  />
                  {/* Etiqueta de peso */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-[#E9E0D6] text-[#3B241C] text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                    {item.weight}
                  </span>
                  {/* Etiqueta de categoría */}
                  <span className="absolute top-3 left-3 bg-[#3B241C]/80 text-[#FAF7F2] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Info del Producto */}
                <h3 className="font-serif text-lg md:text-xl text-[#3B241C] font-semibold group-hover:text-[#B58A52] transition-colors leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-[#7A6B63] mt-2 leading-relaxed">
                  {item.tagline}
                </p>
              </div>

              {/* Botón de acción */}
              <div className="pt-6 mt-4 border-t border-[#F0E8DD]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onGoToProduct) {
                      onGoToProduct(item.name);
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-full border border-[#B58A52] text-[#3B241C] group-hover:bg-[#3B241C] group-hover:text-[#FAF7F2] group-hover:border-[#3B241C] transition-all duration-300 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Ver en Tienda</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
