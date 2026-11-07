import React from 'react';
import { Menu, User, ShieldCheck, ShoppingBag, LogOut } from 'lucide-react';

export type NavPage =
  | 'inicio'
  | 'tienda'
  | 'nosotros'
  | 'productores'
  | 'puntos_de_venta'
  | 'sucursales'
  | 'blog'
  | 'reclamaciones'
  | 'admin'
  | 'pedidos';

interface NavbarProps {
  currentView?: string;
  currentPage?: string;
  onNavigate: (page: NavPage | any) => void;
  onOpenSidebar: () => void;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  userRole?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  currentPage,
  onNavigate,
  onOpenSidebar,
  onOpenAuth,
  onLogout,
  userRole,
}) => {
  const activePage = currentPage || currentView || 'inicio';

  // Navegación segura que garantiza salir de la vista de producto
  const handleNavClick = (page: NavPage) => {
    if (window.location.pathname.startsWith('/producto')) {
      window.location.assign(page === 'inicio' ? '/' : `/${page}`);
    } else {
      onNavigate(page);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* 1. Logo oficial: siempre redirige a la página principal */}
        <div
          onClick={() => handleNavClick('inicio')}
          className="cursor-pointer flex items-center gap-3 transition-opacity hover:opacity-90 flex-shrink-0"
          title="Ir al Inicio"
        >
          <img
            src="/assets/brand/Royal-Raymi-logo-cacao-profundo.png"
            alt="Royal Raymi"
            className="h-10 sm:h-12 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/vite.svg';
            }}
          />
        </div>

        {/* 2. Links Escritorio (solo visibles en md o superior) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-9 text-[13.5px] font-semibold tracking-wider text-[#3B241C] uppercase">
          <button
            type="button"
            onClick={() => handleNavClick('tienda')}
            className={`py-1 hover:text-[#B58A52] transition-colors ${
              activePage === 'tienda' ? 'text-[#B58A52] underline underline-offset-8' : ''
            }`}
          >
            Tienda
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('nosotros')}
            className={`py-1 hover:text-[#B58A52] transition-colors ${
              activePage === 'nosotros' ? 'text-[#B58A52] underline underline-offset-8' : ''
            }`}
          >
            Nosotros
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('productores')}
            className={`py-1 hover:text-[#B58A52] transition-colors ${
              activePage === 'productores' ? 'text-[#B58A52] underline underline-offset-8' : ''
            }`}
          >
            Nuestros Productores
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('puntos_de_venta')}
            className={`py-1 transition-colors hover:text-[#B58A52] ${
              activePage === 'puntos_de_venta' || activePage === 'sucursales'
                ? 'text-[#B58A52] underline underline-offset-8'
                : ''
            }`}
          >
            Puntos de Venta
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('blog')}
            className={`py-1 transition-colors hover:text-[#B58A52] ${
              activePage === 'blog' ? 'text-[#B58A52] underline underline-offset-8' : ''
            }`}
          >
            Blog
          </button>
        </div>

        {/* 3. Acciones Derecha (Acceso / Roles + Menú Hamburguesa en móvil) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {userRole === 'admin' ? (
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className="inline-flex items-center gap-1.5 sm:gap-2 py-2 px-3 sm:px-4 rounded-full bg-[#3B241C] text-[#FAF7F2] hover:bg-[#B58A52] text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B58A52]" />
              <span>Admin</span>
            </button>
          ) : userRole === 'client' ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('pedidos')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 py-2 px-3 sm:px-4 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm ${
                  activePage === 'pedidos'
                    ? 'bg-[#B58A52] text-white'
                    : 'bg-[#3B241C] text-[#FAF7F2] hover:bg-[#B58A52]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FAF7F2]" />
                <span className="hidden sm:inline">Mis</span> Pedidos
              </button>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Cerrar sesión"
                  className="p-1.5 sm:p-2 text-[#8C7A6B] hover:text-[#3B241C] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-[#3B241C] text-[#FAF7F2] hover:bg-[#B58A52] transition-all shadow-sm active:scale-95"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Acceso</span>
            </button>
          )}

          {/* Menú Hamburguesa para Móvil */}
          <button
            type="button"
            onClick={onOpenSidebar}
            className="p-2 text-[#3B241C] hover:text-[#B58A52] md:hidden transition-colors rounded-lg active:bg-stone-100"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
