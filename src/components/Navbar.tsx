import React from 'react';
import { Menu, User, ShieldCheck } from 'lucide-react';

export type NavPage =
  | 'inicio'
  | 'tienda'
  | 'nosotros'
  | 'productores'
  | 'puntos_de_venta'
  | 'sucursales'
  | 'blog'
  | 'reclamaciones'
  | 'admin';

interface NavbarProps {
  currentView?: string;
  currentPage?: string;
  onNavigate: (page: any) => void;
  onOpenSidebar: () => void;
  onOpenAuth?: () => void;
  userRole?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  currentPage,
  onNavigate,
  onOpenSidebar,
  onOpenAuth,
  userRole,
}) => {
  const activePage = currentPage || currentView || 'inicio';

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => onNavigate('inicio')}
          className="cursor-pointer flex items-center gap-3"
        >
          <img
            src="/assets/brand/Royal-Raymi-logo-cacao-profundo.png"
            alt="Royal Raymi"
            className="h-12 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/vite.svg';
            }}
          />
        </div>

        {/* Links Escritorio */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-[#3B241C] uppercase">
          <button
            onClick={() => onNavigate('tienda')}
            className={`hover:text-[#B58A52] transition-colors ${activePage === 'tienda' ? 'text-[#B58A52] underline underline-offset-8' : ''
              }`}
          >
            Tienda
          </button>
          <button
            onClick={() => onNavigate('nosotros')}
            className={`hover:text-[#B58A52] transition-colors ${activePage === 'nosotros' ? 'text-[#B58A52] underline underline-offset-8' : ''
              }`}
          >
            Nosotros
          </button>
          <button
            onClick={() => onNavigate('productores')}
            className={`hover:text-[#B58A52] transition-colors ${activePage === 'productores' ? 'text-[#B58A52] underline underline-offset-8' : ''
              }`}
          >
            Nuestros Productores
          </button>
          <button
            type="button"
            onClick={() => onNavigate('puntos_de_venta')}
            className={`transition-colors hover:text-[#B58A52] ${activePage === 'puntos_de_venta' || activePage === 'sucursales'
              ? 'text-[#B58A52] underline underline-offset-8'
              : ''
              }`}
          >
            Puntos de Venta
          </button>

          {/* Blog */}
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className={`transition-colors hover:text-[#B58A52] ${activePage === 'blog' ? 'text-[#B58A52] underline underline-offset-8' : ''
              }`}
          >
            Blog
          </button>


          {/* Acceso / Login & Hamburguesa */}
          <div className="flex items-center gap-3">
            {userRole === 'admin' ? (
              <button
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-[#3B241C] text-[#FAF7F2] hover:bg-[#B58A52] text-xs font-semibold transition-colors shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#B58A52]" />
                <span>Panel Admin</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#3B241C] text-[#FAF7F2] hover:bg-[#2B1B17] transition-all shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>{userRole === 'admin' ? 'Panel Admin' : 'Acceso'}</span>
              </button>

            )}

            {/* Menú Móvil */}
            <button
              type="button"
              onClick={onOpenSidebar}
              className="p-2 text-[#3B241C] hover:text-[#B58A52] md:hidden"
              aria-label="Abrir menú"
            >
              {/* Icono de menú / Menú hamburguesa */}
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
