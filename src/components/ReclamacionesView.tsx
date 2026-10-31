import React, { useState } from 'react';
import { BookOpen, CheckCircle, Send } from 'lucide-react';

interface ReclamacionesViewProps {
  onBackToHome?: () => void;
}

export const ReclamacionesView: React.FC<ReclamacionesViewProps> = ({ onBackToHome }) => {
  const [submitted, setSubmitted] = useState(false);
  const [tipo, setTipo] = useState<'Reclamo' | 'Queja'>('Reclamo');
  const [isMinor, setIsMinor] = useState<'No' | 'Sí'>('No');
  const [hasSample, setHasSample] = useState<'No' | 'Sí'>('No');

  const [formData, setFormData] = useState({
    fullName: '',
    docType: 'DNI',
    docNumber: '',
    phone: '',
    email: '',
    address: '',
    incidentDate: '',
    productDescription: '',
    amount: '',
    receiptNumber: '',
    details: '',
    consumerRequest: '',
    lot: '',
    expiryDate: '',
    purchaseDate: '',
    accepted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accepted) {
      alert('Debes aceptar la declaración jurada para enviar la reclamación.');
      return;
    }

    // Generar correlativo de hoja de reclamación
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] py-20 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-2xl shadow-sm text-center border border-[#EBE3D5]">
          <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-[#2C1810] font-bold mb-2">
            Reclamación Registrada con Éxito
          </h2>
          <p className="text-sm text-[#5C4D45] mb-4">
            Hemos recibido su solicitud conforme a ley. En un plazo máximo de quince (15) días hábiles recibirá la respuesta en su correo electrónico: <strong>{formData.email}</strong>.
          </p>
          <div className="p-4 bg-[#FAF7F2] rounded-xl text-xs text-[#7A6B63] mb-6">
            Código de seguimiento: <span className="font-mono font-bold text-[#2C1810]">RR-{Date.now().toString().slice(-6)}</span>
          </div>
          <button
            onClick={onBackToHome}
            className="px-6 py-2.5 bg-[#275DA2] hover:bg-[#1E4880] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#EBE3D5] p-6 sm:p-10 md:p-12">
        {/* Cabecera oficial */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-3 text-[#275DA2] flex items-center justify-center">
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-serif text-[#275DA2] font-bold">
            Libro de Reclamaciones
          </h1>
          <p className="text-xs text-[#6B5E55] mt-4 leading-relaxed max-w-2xl mx-auto">
            Conforme a lo establecido en el Reglamento del Libro de Reclamaciones del Código de Protección y Defensa del Consumidor ponemos a tu disposición nuestro Libro de Reclamaciones Virtual. A través de este formulario podrás presentar un reclamo o queja respecto a tu disconformidad con un producto o servicio ofrecido por Royal Raymi S.A.C.
          </p>
          
          <div className="mt-4 p-3 bg-[#FAF7F2] rounded-lg text-left text-xs text-[#5C4D45] space-y-1">
            <p><strong>Queja:</strong> Malestar o disconformidad no relacionada directamente a los productos o servicios prestados (ej. atención al cliente).</p>
            <p><strong>Reclamo:</strong> Disconformidad relacionada directamente con los bienes adquiridos o servicios contratados.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECCIÓN I */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#2C1810] border-b pb-2 mb-4">
              I. Identificación del consumidor reclamante
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#2C1810] mb-1">
                  Nombres y Apellidos Completos *
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Documento *
                  </label>
                  <select
                    name="docType"
                    value={formData.docType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  >
                    <option value="DNI">DNI</option>
                    <option value="CE">Carnet de Extranjería</option>
                    <option value="PASAPORTE">Pasaporte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    N° DOC *
                  </label>
                  <input
                    required
                    type="text"
                    name="docNumber"
                    value={formData.docNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Teléfono / Celular *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Email del consumidor *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-medium text-[#2C1810]">¿Eres menor de edad?</span>
                <label className="flex items-center gap-1.5 text-xs text-[#5C4D45] cursor-pointer">
                  <input
                    type="radio"
                    name="minor"
                    checked={isMinor === 'Sí'}
                    onChange={() => setIsMinor('Sí')}
                  />
                  Sí
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#5C4D45] cursor-pointer">
                  <input
                    type="radio"
                    name="minor"
                    checked={isMinor === 'No'}
                    onChange={() => setIsMinor('No')}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* SECCIÓN II */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#2C1810] border-b pb-2 mb-4">
              II. Detalle de la reclamación y pedido del consumidor
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <span className="text-xs font-medium text-[#2C1810]">¿Queja o Reclamo? *</span>
                <label className="flex items-center gap-1.5 text-xs text-[#5C4D45] cursor-pointer">
                  <input
                    type="radio"
                    name="tipoReclamacion"
                    checked={tipo === 'Reclamo'}
                    onChange={() => setTipo('Reclamo')}
                  />
                  Reclamo
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#5C4D45] cursor-pointer">
                  <input
                    type="radio"
                    name="tipoReclamacion"
                    checked={tipo === 'Queja'}
                    onChange={() => setTipo('Queja')}
                  />
                  Queja
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Fecha del Incidente *
                  </label>
                  <input
                    required
                    type="date"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Descripción del Producto o Servicio *
                  </label>
                  <input
                    required
                    type="text"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    placeholder="Ej. Chocolate con Café 100g"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Monto o valor del bien (soles) *
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    N° de Comprobante (Boleta o Factura)
                  </label>
                  <input
                    type="text"
                    name="receiptNumber"
                    value={formData.receiptNumber}
                    onChange={handleChange}
                    placeholder="B001-000123"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Detalle de Reclamación o Queja *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Indicar todos los detalles aquí..."
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Pedido del consumidor *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="consumerRequest"
                    value={formData.consumerRequest}
                    onChange={handleChange}
                    placeholder="Indique lo que solicita (cambio de producto, devolución, etc.)..."
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Lote
                  </label>
                  <input
                    type="text"
                    name="lot"
                    value={formData.lot}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2C1810] mb-1">
                    Fecha de Compra
                  </label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#275DA2]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <span className="block text-xs font-medium text-[#2C1810] mb-1">
                  ¿Tienes muestra a ser recogida?
                </span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 text-xs text-[#5C4D45] cursor-pointer">
                    <input
                      type="radio"
                      name="sample"
                      checked={hasSample === 'Sí'}
                      onChange={() => setHasSample('Sí')}
                    />
                    Sí
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-[#5C4D45] cursor-pointer">
                    <input
                      type="radio"
                      name="sample"
                      checked={hasSample === 'No'}
                      onChange={() => setHasSample('No')}
                    />
                    No
                  </label>
                </div>
                <span className="text-[11px] text-[#8A7970] mt-0.5 block">
                  Nota: Recojo coordinado dentro de 24 a 48 horas hábiles.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#2C1810] mb-1">
                  Adjuntar foto de boleta o producto (opcional)
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="block w-full text-xs text-[#5C4D45] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#275DA2]/10 file:text-[#275DA2] hover:file:bg-[#275DA2]/20 cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t">
                <label className="flex items-start gap-2.5 text-xs text-[#5C4D45] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.accepted}
                    onChange={(e) => setFormData(prev => ({ ...prev, accepted: e.target.checked }))}
                    className="mt-0.5 rounded text-[#275DA2] focus:ring-[#275DA2]"
                  />
                  <span>
                    Declaro que soy el usuario del servicio y acepto el contenido de este formulario al declarar bajo <strong>Declaración Jurada</strong> la veracidad de los hechos descritos.*
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#275DA2] hover:bg-[#1E4880] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              ENVIAR FORMULARIO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReclamacionesView;
