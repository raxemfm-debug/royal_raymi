import { useState } from 'react';
import { ArrowUpRight, Eye, MessageCircle } from 'lucide-react';
import type { Product as ProductItem } from '../data/products';
import {
  PLACEHOLDER,
  formatPrice,
  productAvailable,
  productAgeRestricted,
  productOrderEnabled,
  productCategory,
  productImages,
  productName,
  productOldPrice,
  productPrice,
  productUrl,
  productWeight
} from '../store/productAdapter';
import { requestProductWhatsApp } from '../store/whatsapp';
import type { AddCallback } from '../store/useProductActions';
import ProductQuickView from './ProductQuickView';

export interface ProductCardProps {
  product: ProductItem;
  onSelectProduct?: (product: ProductItem) => void;
  onAddToCart?: AddCallback;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [quickOpen, setQuickOpen] = useState(false);
  const url = productUrl(product);
  const name = productName(product);
  const price = productPrice(product);
  const oldPrice = productOldPrice(product);
  const available = productAvailable(product);
  const restricted = productAgeRestricted(product);
  const canRequest = productOrderEnabled(product);
  const request = () => requestProductWhatsApp(product, 1);

  return (
    <>
      <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#EFE8DF] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#B58A52]/40 hover:shadow-[0_16px_32px_rgba(44,24,16,0.06)]">
        {/* Contenedor de Imagen */}
        <div className="relative overflow-hidden bg-[#FAF7F2]">
          <a
            href={url}
            aria-label={`Ver detalles de ${name}`}
            className="block aspect-[4/5] w-full p-5 focus-visible:outline-2 focus-visible:outline-[#B58A52]"
          >
            <img
              src={productImages(product)[0] || PLACEHOLDER}
              onError={event => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = PLACEHOLDER;
              }}
              alt={name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
          </a>

          {/* Botón Flotante Vista Rápida */}
          <button
            type="button"
            aria-label={`Vista rápida de ${name}`}
            title="Vista rápida"
            onClick={() => setQuickOpen(true)}
            className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#E6DDD3] bg-white/95 text-[#2C1810] shadow-sm transition hover:bg-[#2C1810] hover:text-[#FAF7F2] focus-visible:outline-2 focus-visible:outline-[#B58A52] lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
          >
            <Eye size={16} />
          </button>

          {/* Badges de Disponibilidad */}
          {!available && (
            <span className="absolute left-3 top-3 rounded-full bg-[#2C1810]/90 px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-wider text-[#FAF7F2]">
              No disponible
            </span>
          )}
          {restricted && available && (
            <span className="absolute left-3 top-3 rounded-full bg-[#2C1810]/90 px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Disponible · Venta regulada
            </span>
          )}
        </div>

        {/* Información Tipográfica Editorial */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <span className="mb-1 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-[#8C7A6B]">
            {productCategory(product)}
          </span>

          <h3 className="mb-1 min-h-[3rem] font-serif text-[17px] font-normal leading-snug text-[#2C1810]">
            <a
              href={url}
              className="transition-colors duration-200 hover:text-[#B58A52] focus-visible:underline"
            >
              {name}
            </a>
          </h3>

          {productWeight(product) && (
            <p className="mb-2 font-serif italic text-xs text-[#96847A]">
              {productWeight(product)}
            </p>
          )}

          {/* Bloque de Precios y Acción */}
          <div className="mt-auto pt-3 border-t border-[#EFE8DF]/60">
            <div className="mb-3 flex flex-wrap items-baseline gap-2">
              <span className="font-serif text-[16px] font-medium text-[#2C1810]">
                {price === null ? (
                  <span className="font-sans text-[12px] font-medium uppercase tracking-wider text-[#B58A52]">
                    Consultar precio
                  </span>
                ) : (
                  formatPrice(price)
                )}
              </span>
              {oldPrice !== null && price !== null && oldPrice > price && (
                <span className="font-serif text-xs text-stone-400 line-through">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-2">
              <button
                type="button"
                onClick={request}
                disabled={!canRequest}
                className="flex min-h-[38px] items-center justify-center gap-2 rounded-xl bg-[#2C1810] px-3 font-sans text-xs font-medium text-[#FAF7F2] transition hover:bg-[#4A2B1D] disabled:opacity-40"
              >
                <MessageCircle size={14} className="shrink-0" />
                {restricted ? (
                  <span>Venta regulada</span>
                ) : (
                  <>
                    <span className="sm:hidden">WhatsApp</span>
                    <span className="hidden sm:inline">Pedir por WhatsApp</span>
                  </>
                )}
              </button>

              <a
                href={url}
                title={`Ver ${name}`}
                aria-label={`Abrir ${name}`}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-[#E5DAD0] text-[#2C1810] transition hover:border-[#B58A52] hover:text-[#B58A52]"
              >
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </article>

      {quickOpen && (
        <ProductQuickView
          product={product}
          onClose={() => setQuickOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
