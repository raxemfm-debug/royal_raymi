import React, { useState, useEffect, useRef } from "react";
import { X, Send, MapPin, Calendar, Clock, User, Phone } from "lucide-react";
import type { ProductItem } from "../types";

interface ReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
}

const SUCURSALES = [
  { id: "unsch", name: "TIENDAS UNSCH", address: "Jr. San Martín N° 374, Ayacucho" },
  { id: "vi-market", name: "VI MARKET", address: "Jr. Asamblea N° 138, Ayacucho" },
  { id: "montefino", name: "Montefino (Plaza More)", address: "Jr. 28 de Julio N° 262, Ayacucho" },
];

export const ReservationDrawer: React.FC<ReservationDrawerProps> = ({ isOpen, onClose, product }) => {
  const [branch, setBranch] = useState(SUCURSALES[0].name);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = orig;
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `*SOLICITUD DE DISPONIBILIDAD Y RESERVA — ROYAL RAYMI*

` +
      `*Producto:* ${product.name} (${product.category})
` +
      (product.cacao_percent ? `*Concentración:* ${product.cacao_percent}% Cacao
` : "") +
      `*Punto de Recojo:* ${branch}
` +
      `*Fecha estimada:* ${pickupDate}
` +
      `*Hora aproximada:* ${pickupTime}

` +
      `*Datos del Solicitante:*
` +
      `- Nombre: ${clientName}
` +
      `- Teléfono: ${clientPhone}

` +
      `_Favor confirmar disponibilidad de lote para retiro._`;

    const url = `https://wa.me/51966000000?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="drawer-title" className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-y-0 right-0 w-full sm:max-w-md flex">
        <div className="w-full bg-[#FDFBF7] border-l border-[#E9E0D6] flex flex-col shadow-2xl h-full">
          <div className="px-5 py-4 border-b border-[#E9E0D6] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B58A52] font-bold">Coordinación Directa</span>
              <h2 id="drawer-title" className="font-serif text-lg sm:text-xl font-bold text-[#3B241C]">Reservar para Recojo</h2>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center text-[#756C64] hover:text-[#3B241C] rounded-full hover:bg-[#F7F2EB]"
              aria-label="Cerrar panel (Escape)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-5 py-5 flex-grow overflow-y-auto space-y-4">
            <div className="p-3 bg-white border border-[#E9E0D6] rounded-xl flex items-center gap-3">
              <img src={product.imageUrl} alt="" className="w-14 h-14 object-cover rounded-lg bg-[#F7F2EB] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-[#B58A52] font-semibold uppercase block truncate">{product.category}</span>
                <h4 className="font-serif text-sm font-bold text-[#3B241C] truncate">{product.name}</h4>
                <p className="text-[11px] text-[#756C64]">Sujeto a disponibilidad en tienda</p>
              </div>
            </div>

            <div>
              <label htmlFor="b-sel" className="flex text-xs font-semibold text-[#3B241C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#B58A52]" /> Punto de Retiro
              </label>
              <select
                id="b-sel"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-[#D5C7B5] bg-white text-base sm:text-xs"
                required
              >
                {SUCURSALES.map((s) => (
                  <option key={s.id} value={s.name}>{s.name} ({s.address})</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="c-name" className="flex text-xs font-semibold text-[#3B241C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#B58A52]" /> Nombre Completo
              </label>
              <input
                id="c-name"
                type="text"
                required
                placeholder="Ej. Doris Paucar"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-[#D5C7B5] bg-white text-base sm:text-xs"
              />
            </div>

            <div>
              <label htmlFor="c-phone" className="flex text-xs font-semibold text-[#3B241C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#B58A52]" /> Teléfono WhatsApp
              </label>
              <input
                id="c-phone"
                type="tel"
                required
                placeholder="+51 900 000 000"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-[#D5C7B5] bg-white text-base sm:text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="p-date" className="flex text-xs font-semibold text-[#3B241C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B58A52]" /> Fecha
                </label>
                <input
                  id="p-date"
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-[#D5C7B5] bg-white text-base sm:text-xs"
                />
              </div>
              <div>
                <label htmlFor="p-time" className="flex text-xs font-semibold text-[#3B241C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#B58A52]" /> Hora
                </label>
                <input
                  id="p-time"
                  type="time"
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-[#D5C7B5] bg-white text-base sm:text-xs"
                />
              </div>
            </div>

            <p className="text-[11px] text-[#756C64] leading-relaxed bg-[#F7F2EB] p-3 rounded-xl border border-[#E9E0D6]">
              Este formulario no cobra comisiones en línea. Al presionar enviar serás redirigido a WhatsApp para validar stock disponible.
            </p>

            <button
              type="submit"
              className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-[#3B241C] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest hover:bg-[#68483A] transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4 text-[#B58A52]" />
              <span>Enviar a WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};