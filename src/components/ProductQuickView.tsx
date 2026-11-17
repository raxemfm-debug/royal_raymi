import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Minus, Plus, MessageCircle, X } from 'lucide-react';
import type { Product as ProductItem } from '../data/products';
import {
  PLACEHOLDER, formatPrice, productAvailable, productCategory, productDescription,
  productImages, productName, productPrice, productUrl, productWeight, productAgeRestricted
} from '../store/productAdapter';
import { requestProductWhatsApp } from '../store/whatsapp';
import type { AddCallback } from '../store/useProductActions';

type Props = { product: ProductItem; onClose: () => void; onAddToCart?: AddCallback };
export default function ProductQuickView({ product, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);
  const photo = productImages(product)[0] || PLACEHOLDER;
  const price = productPrice(product);
  const available = productAvailable(product);
  const restricted = productAgeRestricted(product);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);
  const add = () => {
    requestProductWhatsApp(product, quantity);
  };
  return (
    <dialog
      ref={dialogRef}
      aria-label={`Vista rápida: ${productName(product)}`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-5xl overflow-y-auto rounded-[22px] border-0 bg-white p-0 text-[#3B241C] shadow-2xl backdrop:bg-[#160e0b]/65"
    >
      <div className="relative grid md:grid-cols-[1.05fr_1fr]">
        <button type="button" onClick={onClose} aria-label="Cerrar vista rápida" className="absolute right-4 top-4 z-20 rounded-full bg-white/95 p-2.5 shadow hover:bg-[#F1E8DC] focus-visible:outline-2 focus-visible:outline-[#B58A52]"><X size={19}/></button>
        <div className="flex min-h-[300px] items-center justify-center bg-[#FAF7F2] p-8 md:min-h-[520px]">
          <a href={productUrl(product)} aria-label={`Abrir página completa de ${productName(product)}`} className="block h-full max-h-[440px] w-full cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-[#B58A52]">
            <img src={photo} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER; }} alt={productName(product)} className="h-full max-h-[440px] w-full object-contain transition-transform duration-300 hover:scale-[1.025]" />
          </a>
        </div>
        <div className="flex flex-col justify-center px-6 py-9 sm:px-10 md:py-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.25em] text-[#B58A52]">{productCategory(product)}</p>
          <h2 className="mb-4 font-serif text-3xl leading-tight sm:text-4xl">{productName(product)}</h2>
          <p className="mb-5 text-2xl font-semibold text-[#B58039]">{price !== null ? formatPrice(price) : 'Precio a consultar'}</p>
          <p className="mb-5 text-sm leading-7 text-[#7A6B63]">{productDescription(product)}</p>
          {productWeight(product) && <p className="mb-5 text-sm"><strong>Presentación:</strong> {productWeight(product)}</p>}
          {restricted ? <p className="mb-5 rounded-lg border border-[#E5DAD0] bg-[#FAF7F2] p-3 text-sm text-[#3B241C]">{available ? "Disponible · Venta restringida a mayores de edad." : "No disponible."}</p> : <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="flex h-11 items-center rounded-lg border border-[#E5DAD0]" aria-label="Cantidad">
              <button type="button" className="px-3" aria-label="Restar uno" onClick={() => setQuantity(n => Math.max(1, n - 1))}><Minus size={15}/></button>
              <output className="min-w-7 text-center text-sm">{quantity}</output>
              <button type="button" className="px-3" aria-label="Sumar uno" onClick={() => setQuantity(n => Math.min(99, n + 1))}><Plus size={15}/></button>
            </div>
            <button type="button" disabled={!available} onClick={add} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#3B241C] px-5 text-sm font-medium text-white transition hover:bg-[#6D412D] disabled:cursor-not-allowed disabled:opacity-40"><MessageCircle size={17}/>{available ? 'Solicitar por WhatsApp' : 'No disponible para consulta'}</button>
          </div>}
          {!restricted && <p className="text-xs leading-5 text-[#907F74]">Tu pedido se enviará como consulta por WhatsApp; precios y disponibilidad se confirmarán por ese medio.</p>}
          <a href={productUrl(product)} className="mt-5 inline-flex items-center gap-2 self-start border-b border-[#B58A52] pb-1 text-sm font-semibold text-[#3B241C] transition hover:text-[#B58039]">Ver página completa del producto <ArrowUpRight size={16}/></a>
        </div>
      </div>
    </dialog>
  );
}
