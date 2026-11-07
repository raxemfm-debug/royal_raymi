import React from 'react';
import { X, CheckCircle, BookOpen } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QualityPolicyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#00266e] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-blue-200">POL-GG 01 · Versión 00</span>
            <h3 className="font-serif text-lg font-semibold tracking-wide">
              POLÍTICA DEL SISTEMA DE GESTIÓN DE CALIDAD
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4 text-stone-700 text-sm leading-relaxed max-h-[75vh] overflow-y-auto">
          <p className="font-medium text-stone-900">
            <strong>ROYAL RAYMI S.A.C.</strong> es una empresa peruana dedicada al procesamiento y comercialización de café, derivados del cacao y chocolatería, comprometida con la calidad e inocuidad de sus productos, la satisfacción de sus clientes y el éxito sostenible de la organización.
          </p>
          <p>
            Para ello, la Gerencia General lidera el Sistema de Gestión de Calidad, promoviendo una cultura de mejora continua y fundamentándose en los siguientes compromisos:
          </p>
          <ul className="space-y-3 pl-2">
            {[
              'Garantizar la plena satisfacción de nuestros clientes y consumidores, entregando productos que cumplan rigurosamente con sus especificaciones, requisitos y expectativas.',
              'Asegurar los más altos estándares de calidad y sanidad en nuestras líneas de producción de café, cacao y chocolatería, aplicando estrictamente las Buenas Prácticas de Manufactura (BPM) e higiene.',
              'Cumplir de manera estricta con la legislación nacional aplicable, los requisitos normativos del sector alimentario y los compromisos asumidos contractualmente.',
              'Contar con un equipo humano competente, altamente capacitado, evaluado y comprometido con los objetivos de calidad y la cultura preventiva de la empresa.',
              'Impulsar la mejora constante del desempeño de nuestros procesos y de la eficacia del Sistema de Gestión de Calidad en todos los niveles de la organización.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#00266e] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between text-xs text-stone-500">
            <span>Ayacucho, 09 de febrero del 2026</span>
            <span className="font-semibold text-stone-800">PAUCAR PIZARRO DORIS HERMELINDA — Gerente General</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReclamacionesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-stone-200">
        <div className="bg-[#2B1B17] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-300">Conforme a Ley N° 29571</span>
              <h3 className="font-serif text-lg font-semibold tracking-wide">LIBRO DE RECLAMACIONES VIRTUAL</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Reclamo registrado con éxito conforme a la normativa vigente. Le llegará una copia al correo ingresado.');
            onClose();
          }}
          className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Nombres y Apellidos</label>
              <input required type="text" className="w-full border border-stone-300 rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">DNI / CE</label>
              <input required type="text" className="w-full border border-stone-300 rounded px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Teléfono / Celular</label>
              <input required type="tel" className="w-full border border-stone-300 rounded px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">Correo Electrónico</label>
              <input required type="email" className="w-full border border-stone-300 rounded px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-stone-700 font-medium mb-1">Tipo de Solicitud</label>
            <select className="w-full border border-stone-300 rounded px-3 py-2 text-sm">
              <option value="queja">Queja (Malestar respecto a la atención)</option>
              <option value="reclamo">Reclamo (Disconformidad relacionada a los productos)</option>
            </select>
          </div>
          <div>
            <label className="block text-stone-700 font-medium mb-1">Detalle del Reclamo o Queja</label>
            <textarea required rows={4} className="w-full border border-stone-300 rounded px-3 py-2 text-sm" />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#2B1B17] text-white font-medium uppercase tracking-wider rounded hover:bg-[#A34835] transition-colors"
          >
            Enviar Registro
          </button>
        </form>
      </div>
    </div>
  );
};
