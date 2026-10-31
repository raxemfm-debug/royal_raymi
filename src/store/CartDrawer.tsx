import { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { changeCartQuantity, removeFromCart, useCartCount, useCartLines } from './cart';
import { formatPrice, PLACEHOLDER, productImages, productName, productPrice, productWeight } from './productAdapter';

/** Teléfono de consulta tomado del código original; modifica si tu WhatsApp comercial cambió. */
const WHATSAPP_NUMBER = '51967179747';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const lines = useCartLines();
  const count = useCartCount();
  const total = lines.reduce((sum, line) => sum + (productPrice(line.product) ?? 0) * line.quantity, 0);
  const unknownPrices = lines.some(line => productPrice(line.product) === null);
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('royal-shop-open-cart', handler);
    return () => window.removeEventListener('royal-shop-open-cart', handler);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const sendInquiry = () => {
    const text = [
      '¡Hola Royal Raymi! Quisiera consultar por estos productos:', '',
      ...lines.map(line => `• ${productName(line.product)}${productWeight(line.product) ? ` (${productWeight(line.product)})` : ''} × ${line.quantity}`),
      '', '¿Podrían confirmarme disponibilidad, precios y entrega? ¡Gracias!'
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };
  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`Abrir carrito: ${count} artículos`} className="relative flex items-center gap-2 rounded-full border border-[#E8DDD1] bg-white px-4 py-2.5 text-sm font-medium text-[#3B241C] transition hover:border-[#B58A52]"><ShoppingBag size={18}/><span>Mi carrito</span><span className="rounded-full bg-[#3B241C] px-1.5 py-0.5 text-[10px] text-white">{count}</span></button>
    {open && <div className="fixed inset-0 z-[9999]" role="presentation">
      <div className="absolute inset-0 bg-black/55" onClick={() => setOpen(false)}/>
      <aside role="dialog" aria-modal="true" aria-label="Carrito de compras" className="absolute inset-y-0 right-0 flex h-full w-full max-w-md flex-col bg-[#FFFCF9] shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#E6DDD2] px-6 py-5"><h2 className="font-serif text-2xl text-[#3B241C]">Tu carrito <span className="text-base text-[#B58A52]">({count})</span></h2><button type="button" onClick={() => setOpen(false)} aria-label="Cerrar carrito" className="rounded-full p-2 hover:bg-[#EFE6DF]"><X size={20}/></button></header>
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {lines.length === 0 ? <div className="grid min-h-64 place-items-center text-center text-[#8B7B6E]"><div><ShoppingBag size={42} className="mx-auto mb-3"/><p>Tu carrito está vacío.</p><p className="mt-1 text-sm">Explora nuestros chocolates y cafés.</p></div></div> : lines.map(line => <div key={line.key} className="flex gap-4 border-b border-[#EBE3DB] pb-5">
            <img src={productImages(line.product)[0] || PLACEHOLDER} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER; }} className="h-24 w-24 rounded-lg bg-[#F5EFE8] object-contain p-2" alt={productName(line.product)}/>
            <div className="min-w-0 flex-1"><h3 className="line-clamp-2 font-serif text-base text-[#3B241C]">{productName(line.product)}</h3><p className="mt-1 text-sm text-[#B58039]">{productPrice(line.product) === null ? 'Consultar precio' : formatPrice(productPrice(line.product)!)}</p><div className="mt-3 flex items-center gap-3"><button type="button" aria-label="Restar cantidad" onClick={() => changeCartQuantity(line.key, line.quantity - 1)}><Minus size={15}/></button><span className="text-sm">{line.quantity}</span><button type="button" aria-label="Sumar cantidad" onClick={() => changeCartQuantity(line.key, line.quantity + 1)}><Plus size={15}/></button><button type="button" className="ml-auto text-[#9B8172] hover:text-red-700" aria-label={`Eliminar ${productName(line.product)}`} onClick={() => removeFromCart(line.key)}><Trash2 size={16}/></button></div></div>
          </div>)}
        </div>
        {lines.length > 0 && <footer className="border-t border-[#E6DDD2] bg-white p-6"><div className="mb-2 flex justify-between font-serif text-lg"><span>{unknownPrices ? 'Subtotal conocido' : 'Subtotal'}</span><strong className="text-[#B58039]">{lines.every(line => productPrice(line.product) === null) ? 'Por confirmar' : formatPrice(total)}</strong></div><p className="mb-4 text-xs text-[#8C8078]">{unknownPrices ? 'Algunos artículos tienen precio pendiente de confirmar. ' : ''}Los costos de envío y la disponibilidad se confirman antes del pedido.</p><button type="button" onClick={sendInquiry} className="w-full rounded-lg bg-[#3B241C] px-4 py-3.5 text-sm font-semibold text-white hover:bg-[#65402e]">Consultar pedido por WhatsApp</button></footer>}
      </aside>
    </div>}
  </>;
}
