import React, { useState } from 'react';
import type { NavPage } from './Navbar';

interface FooterProps {
  onNavigate?: (page: NavPage) => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
}) => {

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#FAF7F2] text-[#2B1B17] pt-16 pb-12 px-6 sm:px-10 lg:px-16 border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto">

        {/* Cabecera Central Editorial (Estilo Avelina) */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.18em] uppercase font-medium text-[#2B1B17]">
            Royal Raymi
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#B58A52] mt-1 font-light">
            The scent of Vraem
          </p>
        </div>

        {/* 3 Columnas Descriptivas (Sin Recipes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 pb-14 border-b border-stone-200/60 text-xs sm:text-[13px] leading-relaxed">

          {/* Columna 1: Información */}
          <div className="space-y-3 font-light">
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#2B1B17] uppercase mb-4">
              Información
            </h3>
            <p className="text-stone-600">Jr. 28 de Julio 262, Huamanga, Ayacucho</p>
            <p className="text-stone-600">contacto@royalraymi.com</p>
            <p className="text-stone-600">+51 967 179 747</p>
            <p className="text-stone-600">Lunes a Domingo: 9:00 AM - 9:00 PM</p>
          </div>

          {/* Columna 2: Productos */}
          <div className="space-y-2.5 font-light">
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#2B1B17] uppercase mb-4">
              Productos
            </h3>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('tienda');
                    onSelectCategory?.('Café');
                  }}
                  className="hover:text-[#B58A52] transition-colors"
                >
                  Café de Especialidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('tienda');
                    onSelectCategory?.('Chocolates');
                  }}
                  className="hover:text-[#B58A52] transition-colors"
                >
                  Chocolates Finos de Aroma
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate?.('tienda');
                    onSelectCategory?.('Bombones');
                  }}
                  className="hover:text-[#B58A52] transition-colors"
                >
                  Bombones & Rellenos
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atención al cliente */}
          <div className="space-y-2.5 font-light">
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#2B1B17] uppercase mb-4">
              Atención al Cliente
            </h3>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('sucursales')}
                  className="hover:text-[#B58A52] transition-colors"
                >
                  Puntos de Venta
                </button>
              </li>
              <li>
                <a
                  href="/docs/politicas de gestion de calidad.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B58A52] transition-colors block"
                >
                  Política de Gestión de Calidad
                </a>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('reclamaciones')}
                  className="hover:text-[#B58A52] transition-colors text-left block"
                >
                  Libro de Reclamaciones
                </button>
              </li>

              <li>
                <a
                  href="https://wa.me/51967179747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B58A52] transition-colors block"
                >
                  Envíos y Pedidos por WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Fila Inferior: Newsletter + Redes Sociales + Pagos */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 text-xs font-light">

          {/* Newsletter a la izquierda */}
          <div className="w-full md:w-5/12">
            <p className="text-stone-800 text-[13px] font-medium mb-3">
              Suscríbete a nuestro boletín
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center border-b border-stone-400 pb-1.5 focus-within:border-[#2B1B17]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico aquí"
                className="w-full bg-transparent text-xs text-[#2B1B17] placeholder-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-3 text-[11px] font-semibold tracking-widest uppercase text-stone-700 hover:text-[#B58A52] transition-colors"
              >
                Enviar
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-green-700 mt-2">
                ¡Gracias por suscribirte a Royal Raymi!
              </p>
            )}
          </div>

          {/* Redes Sociales y Métodos de Pago a la derecha */}
          <div className="w-full md:w-auto flex flex-col md:items-end gap-4">

            {/* Follow Us */}
            <div className="flex items-center gap-4">
              <span className="text-stone-500 text-[11px] uppercase tracking-wider font-medium">
                Síguenos:
              </span>
              <div className="flex items-center gap-3 text-xs font-medium tracking-wide">
                <a
                  href="https://www.tiktok.com/@royal_raymi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B58A52] transition-colors"
                >
                  TIKTOK
                </a>
                <span className="text-stone-300">•</span>
                <a
                  href="https://www.instagram.com/royalraymi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B58A52] transition-colors"
                >
                  INSTAGRAM
                </a>
                <span className="text-stone-300">•</span>
                <a
                  href="https://www.facebook.com/royalraymisac/?locale=es_LA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B58A52] transition-colors"
                >
                  FACEBOOK
                </a>
                <span className="text-stone-300">•</span>
                <a
                  href="https://www.youtube.com/@royalraymi8517"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B58A52] transition-colors"
                >
                  YOUTUBE
                </a>
              </div>
            </div>

            {/* Medios de Pago */}
            <div className="flex items-center gap-2 text-stone-500 text-[11px]">
              <span>Medios de pago:</span>
              <span className="px-2 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-medium text-stone-700">Yape</span>
              <span className="px-2 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-medium text-stone-700">Plin</span>
              <span className="px-2 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-medium text-stone-700">Visa</span>
              <span className="px-2 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-medium text-stone-700">Mastercard</span>
            </div>

          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-200/50 text-center text-[11px] text-stone-400 font-light">
          © {new Date().getFullYear()} Royal Raymi S.A.C. Todos los derechos reservados. Hecho con orgullo en Ayacucho.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
