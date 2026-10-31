import { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Minus, Plus, MessageCircle } from 'lucide-react';
import type { Product as ProductItem } from '../data/products';
import type { AddCallback } from './useProductActions';
import { requestProductWhatsApp } from './whatsapp';
import {
  formatPrice, PLACEHOLDER, productAvailable, productCategory, productDescription, productImages,
  productName, productOldPrice, productPrice, productSku, productWeight, productAgeRestricted
} from './productAdapter';

export default function ProductDetailPage({ product }: { product: ProductItem; onAddToCart?: AddCallback }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const photos = productImages(product);
  const current = photos[photoIndex] ?? photos[0] ?? PLACEHOLDER;
  const price = productPrice(product);
  const oldPrice = productOldPrice(product);
  const available = productAvailable(product);
  const restricted = productAgeRestricted(product);
  useEffect(() => {
    document.title = `${productName(product)} | Royal Raymi`;
    setPhotoIndex(0);
    setQuantity(1);
  }, [product]);
  const add = () => {
    requestProductWhatsApp(product, quantity);
  };
  return <main className="mx-auto min-h-[70vh] max-w-[1500px] px-4 py-8 text-[#3B241C] sm:px-8 lg:py-12">
    <nav aria-label="Ruta de navegación" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#917E70] sm:text-sm">
      <a href="/tienda" className="hover:text-[#B58039]">Tienda</a><span>/</span><span>{productCategory(product)}</span><span>/</span><span aria-current="page" className="text-[#3B241C]">{productName(product)}</span>
    </nav>
    <div className="grid gap-9 lg:grid-cols-2 lg:gap-14 xl:gap-20">
      <section aria-label="Galería del producto" className="min-w-0">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#FAF7F2] p-7 sm:p-12">
          <img key={current} src={current} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER; }} alt={`${productName(product)} — imagen ${photoIndex + 1}`} className="h-full w-full object-contain" />
          {photos.length > 1 && <><button type="button" onClick={() => setPhotoIndex(i => (i - 1 + photos.length) % photos.length)} aria-label="Imagen anterior" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow hover:bg-[#F1E8DC]"><ChevronLeft size={18}/></button><button type="button" onClick={() => setPhotoIndex(i => (i + 1) % photos.length)} aria-label="Imagen siguiente" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow hover:bg-[#F1E8DC]"><ChevronRight size={18}/></button></>}
        </div>
        {photos.length > 1 && <div className="mt-4 flex flex-wrap gap-3">{photos.map((photo, i) => <button type="button" key={`${photo}-${i}`} onClick={() => setPhotoIndex(i)} aria-label={`Mostrar imagen ${i+1}`} aria-pressed={i === photoIndex} className={`h-20 w-20 overflow-hidden rounded-lg border-2 bg-[#FAF7F2] p-1 ${i===photoIndex ? 'border-[#B58A52]' : 'border-transparent'}`}><img src={photo} alt="" className="h-full w-full object-contain"/></button>)}</div>}
      </section>
      <section className="flex flex-col justify-center pb-6">
        <span className="mb-4 text-[11px] font-bold uppercase tracking-[.25em] text-[#B58A52]">{productCategory(product)}</span>
        <h1 className="mb-5 font-serif text-[clamp(2.25rem,4vw,4rem)] leading-[1.1] tracking-tight">{productName(product)}</h1>
        <div className="mb-7 flex flex-wrap items-baseline gap-3"><strong className="text-3xl text-[#B58039] sm:text-4xl">{price === null ? 'Precio a consultar' : formatPrice(price)}</strong>{oldPrice !== null && price !== null && oldPrice > price && <s className="text-lg text-stone-400">{formatPrice(oldPrice)}</s>}</div>
        <p className="mb-7 max-w-xl text-sm leading-8 text-[#75685e] sm:text-base">{productDescription(product)}</p>
        <dl className="mb-6 space-y-2 border-y border-[#E9DFD5] py-5 text-sm">{productWeight(product) && <div className="flex gap-3"><dt className="min-w-28 font-semibold">Presentación:</dt><dd>{productWeight(product)}</dd></div>}{productSku(product) && <div className="flex gap-3"><dt className="min-w-28 font-semibold">SKU:</dt><dd>{productSku(product)}</dd></div>}<div className="flex gap-3"><dt className="min-w-28 font-semibold">Categoría:</dt><dd>{productCategory(product)}</dd></div></dl>
        {restricted ? <p className="mb-6 rounded-xl border border-[#E5DAD0] bg-white px-5 py-4 text-sm">{available ? "Disponible · Venta restringida a mayores de edad." : "No disponible."}</p> : <div className="mb-4 flex flex-wrap items-stretch gap-3">
          <div className="flex h-12 items-center gap-2 rounded-xl border border-[#E5DAD0] bg-white px-2" aria-label="Cantidad"><button type="button" onClick={() => setQuantity(n => Math.max(1,n-1))} aria-label="Restar uno" className="p-2"><Minus size={16}/></button><output className="w-7 text-center">{quantity}</output><button type="button" onClick={() => setQuantity(n => Math.min(99,n+1))} aria-label="Sumar uno" className="p-2"><Plus size={16}/></button></div>
          <button type="button" onClick={add} disabled={!available} className="flex min-h-12 flex-1 items-center justify-center gap-3 rounded-xl bg-[#3B241C] px-7 font-medium text-white shadow-md shadow-[#3B241C]/10 transition hover:bg-[#6D412D] disabled:cursor-not-allowed disabled:opacity-50"><MessageCircle size={20}/>{available ? 'Solicitar por WhatsApp' : 'No disponible para consulta'}</button>
        </div>}
        {!restricted && <p className="mb-5 text-sm leading-6 text-[#75685e]">Al continuar, se abrirá WhatsApp con el producto y la cantidad seleccionada. El pedido estará sujeto a confirmación.</p>}
        <p className="mb-7 text-xs leading-6 text-[#907F74]">Disponibilidad, envíos y tiempos de entrega sujetos a confirmación.</p>
        <a href="/tienda" className="flex items-center gap-2 self-start border-b border-[#B58A52] pb-1 text-sm font-medium hover:text-[#B58039]"><ArrowLeft size={16}/> Volver a la tienda</a>
      </section>
    </div>
    <section className="mt-16 border-t border-[#E5DAD0] pt-9"><h2 className="mb-4 font-serif text-2xl sm:text-3xl">Descripción del producto</h2><p className="max-w-3xl whitespace-pre-line text-sm leading-8 text-[#75685e] sm:text-base">{productDescription(product)}</p></section>
  </main>;
}
