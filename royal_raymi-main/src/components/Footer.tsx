import React, { useState } from 'react';
import { QualityPolicyModal, ReclamacionesModal } from './ModalsLegal';
import { CheckCircle, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showClaims, setShowClaims] = useState(false);

  return (
    <footer className="bg-[#0B1526] text-white pt-14 pb-10 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Fila Principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10 text-center md:text-left">
          {/* Logo en footer */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-2xl font-bold tracking-wider text-white uppercase">
              ROYAL RAYMI
            </span>
            <span className="text-[10px] tracking-[0.25em] text-blue-200 uppercase">
              The Scent of VRAEM
            </span>
          </div>

          {/* Enlaces a Políticas y Libro de Reclamaciones */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => setShowPolicy(true)}
              className="flex items-center gap-2 text-xs tracking-wider uppercase text-stone-300 hover:text-white transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>POLÍTICA DEL SISTEMA DE GESTIÓN DE CALIDAD</span>
            </button>

            <button
              onClick={() => setShowClaims(true)}
              className="flex items-center gap-2 text-xs tracking-wider uppercase text-stone-300 hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Libro de Reclamaciones</span>
            </button>
                   </div>

          {/* Enlaces de Tienda rápidos */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-wider text-stone-400">
            {[
              { label: 'CAFÉ', category: 'CAFÉ' },
              { label: 'BOMBONES', category: 'BOMBONES' },
              { label: 'CHOCOLATE TRADICIONAL', category: 'CHOCOLATES TRADICIONAL' },
              { label: 'PASTAS', category: 'DERIVADOS' },
            ].map(({ label, category }) => (
              <button
                key={label}
                onClick={() => {
                  onNavigate?.('tienda');
                  onSelectCategory?.(category);
                }}
                className="hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Fila Inferior: Copyright + Tarjetas de Pago */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Royal Raymi S.A.C. Todos los derechos reservados.</p>

          {/* Tarjetas de Pago oficiales de la referencia */}
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/10">
            <span className="px-1.5 py-0.5 bg-blue-900 text-white font-bold text-[9px] rounded">VISA</span>
            <span className="px-1.5 py-0.5 bg-red-600 text-white font-bold text-[9px] rounded">Mastercard</span>
            <span className="px-1.5 py-0.5 bg-blue-700 text-white font-bold text-[9px] rounded">PayPal</span>
            <span className="px-1.5 py-0.5 bg-blue-500 text-white font-bold text-[9px] rounded">AMEX</span>
            <span className="px-1.5 py-0.5 bg-cyan-700 text-white font-bold text-[9px] rounded">Maestro</span>
          </div>
        </div>
      </div>

      {/* Modales */}
      <QualityPolicyModal isOpen={showPolicy} onClose={() => setShowPolicy(false)} />
      <ReclamacionesModal isOpen={showClaims} onClose={() => setShowClaims(false)} />
    </footer>
  );
};

export default Footer;
