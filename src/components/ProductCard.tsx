import { useState } from 'react';
import { ArrowUpRight, Eye, MessageCircle } from 'lucide-react';
import type { Product as ProductItem } from '../data/products';
import { PLACEHOLDER, formatPrice, productAvailable, productAgeRestricted, productOrderEnabled, productCategory, productImages, productName, productOldPrice, productPrice, productUrl, productWeight } from '../store/productAdapter';
import { requestProductWhatsApp } from '../store/whatsapp';
import type { AddCallback } from '../store/useProductActions';
import ProductQuickView from './ProductQuickView';

export interface ProductCardProps { product: ProductItem; onAddToCart?: AddCallback }
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
  return <>
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#EDE5DD] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(59,36,28,.10)]">
      <div className="relative overflow-hidden bg-[#FAF7F2]">
        <a href={url} aria-label={`Ver detalles de ${name}`} className="block aspect-[4/5] w-full p-4 focus-visible:outline-2 focus-visible:outline-[#B58A52] sm:p-5">
          <img src={productImages(product)[0] || PLACEHOLDER} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = PLACEHOLDER; }} alt={name} loading="lazy" decoding="async" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.055]" />
        </a>
        <button type="button" aria-label={`Vista rápida de ${name}`} title="Vista rápida" onClick={() => setQuickOpen(true)} className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#E6DDD3] bg-white/95 text-[#3B241C] shadow transition hover:bg-[#3B241C] hover:text-white focus-visible:outline-2 focus-visible:outline-[#B58A52] lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"><Eye size={18}/></button>
        {!available && <span className="absolute left-3 top-3 rounded-full bg-[#3B241C] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">No disponible</span>}
        {restricted && available && <span className="absolute left-3 top-3 rounded-full bg-[#3B241C] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Disponible · Venta regulada</span>}
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-[.20em] text-[#B58A52]">{productCategory(product)}</span>
        <h3 className="mb-1 min-h-12 font-serif text-[17px] leading-snug text-[#3B241C]">
          <a href={url} className="transition hover:text-[#A67B42] focus-visible:underline">{name}</a>
        </h3>
        {productWeight(product) && <p className="mb-2 text-xs text-[#96847A]">{productWeight(product)}</p>}
        <div className="mt-auto pt-3">
          <div className="mb-3 flex flex-wrap items-baseline gap-2">
            <strong className="text-[17px] font-semibold text-[#B58039]">{price === null ? 'Consultar precio' : formatPrice(price)}</strong>
            {oldPrice !== null && price !== null && oldPrice > price && <span className="text-xs text-stone-400 line-through">{formatPrice(oldPrice)}</span>}
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <button type="button" onClick={request} disabled={!canRequest} className="flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#3B241C] px-2 text-xs font-medium text-white transition hover:bg-[#6D412D] disabled:opacity-40"><MessageCircle size={15} className="shrink-0"/>{restricted ? <span>Venta regulada</span> : <><span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">Pedir por WhatsApp</span></>}</button>
            <a href={url} title={`Ver ${name}`} aria-label={`Abrir ${name}`} className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5DAD0] transition hover:border-[#B58039] hover:text-[#B58039]"><ArrowUpRight size={18}/></a>
          </div>
        </div>
      </div>
    </article>
    {quickOpen && <ProductQuickView product={product} onClose={() => setQuickOpen(false)} />}
  </>;
};
export default ProductCard;
