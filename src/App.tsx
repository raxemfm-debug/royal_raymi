import { useEffect, useState } from "react";
import type { ProductItem } from "./types";
import { Navbar } from "./components/Navbar";
import type { NavPage } from "./components/Navbar";
import { PopularProducts } from "./components/PopularProducts";
import { SpecialDays } from "./components/SpecialDays";
import { ShopView } from "./components/ShopView";
import RoyalStorefront from "./store/RoyalStorefront";
import { navigateShop, useShopPath } from "./store/navigation";
import AvelinaHero from "./components/AvelinaHero";
import { ReservationDrawer } from "./components/ReservationDrawer";
import { ProducersSection } from "./components/ProducersSection";
import { CategorySidebar } from "./components/CategorySidebar";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { Footer } from "./components/Footer";
import { PRODUCTS as ROYAL_RAYMI_PRODUCTS } from './data/products';
import { MapPin, Navigation, Clock, } from "lucide-react";
import imgMontefino from "./assets/puntos_de_venta/punto_de_venta_montefino.webp";
import imgUNSCH from "./assets/puntos_de_venta/punto_de_venta_tiendas UNSCH.webp";
import imgVimarket from "./assets/puntos_de_venta/punto_de_venta_Vimarket.webp";
import { CorporateVideo } from './components/CorporateVideo';
import { BlogView } from './components/BlogView';
import { TikTokGallery } from './components/TiktokGallery';
import { SocialSidebar } from './components/SocialSidebar';
import { ReclamacionesView } from './components/ReclamacionesView';
import { AlliedCompanies } from './components/AlliedCompanies';
import { supabase } from './lib/supabase';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import { ClientOrdersView } from './components/ClientOrdersView';

const ALL_CATEGORIES = ["Todos", "Chocolates", "Café", "Polvos y Nibs"];
const PUNTOS_DE_VENTA = [
  // --- 3 Puntos Originales ---
  {
    id: "Tienda-Montefino",
    name: "Tienda Principal - Montefino",
    address: "Jr. 28 de julio 262, Huamanga, Ayacucho",
    reference: "A unos pasos de la Plaza Mayor de Huamanga",
    schedule: "Lunes a Domingo: 9:00 AM - 9:00 PM",
    mapsUrl: "https://maps.app.goo.gl/96ucyMo1kxgKhrvA7",
    image: imgMontefino,
  },
  {
    id: "Tiendas-UNSCH",
    name: "Tiendas-UNSCH",
    address: "Jr. San Martín 362, Huamanga, Ayacucho",
    reference: "Atención especializada y degustación de chocolates",
    schedule: "Lunes a Sábado: 9:00 AM - 8:30 PM",
    mapsUrl: "https://maps.app.goo.gl/ZPkggzpPubcJ5DLf6",
    image: imgUNSCH,
  },
  {
    id: "Centro-Comercial-ViMarket",
    name: "Centro Comercial ViMarket",
    address: "Jr. Cuzco 153, Huamanga, Ayacucho",
    reference: "Venta directa de chocolates, café y derivados",
    schedule: "Lunes a Sábado: 9:00 AM - 8:00 PM",
    mapsUrl: "https://maps.app.goo.gl/d161MTR49HHoLFUo8",
    image: imgVimarket,
  },

  // --- 7 Nuevos Puntos de Venta ---
  {
    id: "Biomercado-Andino",
    name: "Biomercado Andino",
    address: "Jr. 9 de Diciembre 333, Huamanga, Ayacucho",
    reference: "Punto de venta y productos naturales",
    schedule: "Lunes a Sábado: 8:30 AM - 8:00 PM",
    mapsUrl: "https://maps.app.goo.gl/bpTeajMretUZ96kq7",
    image: "/assets/brand/Royal-Raymi-logo-cacao-profundo.png",
  },
  {
    id: "Visuchi-EIRL",
    name: "Visuchi E.I.R.L.",
    address: "Jr. 28 de julio / Costado de \"Batta\", Huamanga, Ayacucho",
    reference: "Distribuidor autorizado",
    schedule: "Lunes a Sábado: 9:00 AM - 8:00 PM",
    mapsUrl: "https://maps.app.goo.gl/HAwhSm9mwAnWeH4PA",
    image: "/assets/brand/Royal-Raymi-logo-cacao-profundo.png",
  },
  {
    id: "Good-Marketing",
    name: "Good Marketing",
    address: "Jr. Asamblea 150, Ayacucho 05003",
    reference: "Distribuidor oficial de productos Royal Raymi",
    schedule: "Lunes a Sábado: 9:00 AM - 8:30 PM",
    mapsUrl: "https://maps.app.goo.gl/mxhVLwFabVF733Bt5",
    image: "/assets/brand/Royal-Raymi-logo-cacao-profundo.png",
  },
  {
    id: "ViMarket-Asamblea",
    name: "ViMarket Asamblea",
    address: "Jr. Asamblea, Huamanga, Ayacucho",
    reference: "Módulo y sucursal ViMarket",
    schedule: "Lunes a Domingo: 8:00 AM - 9:30 PM",
    mapsUrl: "https://maps.app.goo.gl/Fu6a3XMUZwZS9gx29",
    image: imgVimarket, // Reutiliza el asset de ViMarket
  },
  {
    id: "Alcides",
    name: "Comercial Alcides",
    address: "Plaza mayor de Huamanga, Ayacucho",
    reference: "Punto céntrico de distribución",
    schedule: "Lunes a Sábado: 8:30 AM - 8:00 PM",
    mapsUrl: "https://maps.app.goo.gl/z6V3xhD5LvihQAEc7",
    image: "/assets/brand/Royal-Raymi-logo-cacao-profundo.png",
  },
  {
    id: "Plaza-4",
    name: "Plaza 4 (Plaza Quattro)",
    address: "Jr. San Martin 837, Huamanga, Ayacucho",
    reference: "Galería comercial y punto de venta",
    schedule: "Lunes a Sábado: 9:00 AM - 9:00 PM",
    mapsUrl: "https://maps.app.goo.gl/EkJ2F3w4XGpev2Dc9",
    image: "/assets/brand/Royal-Raymi-logo-cacao-profundo.png",
  },
  {
    id: "Plaza-Vea",
    name: "Plaza Vea Ayacucho",
    address: "Av. Cuzco, Huamanga, Ayacucho",
    reference: "Supermercado - Sección chocolates y productos regionales",
    schedule: "Lunes a Domingo: 8:00 AM - 10:00 PM",
    mapsUrl: "https://maps.app.goo.gl/zUk5JeiTR8i288jA8",
    image: "/assets/brand/Royal-Raymi-logo-cacao-profundo.png",
  },
];


type AvelinaSidebarProps = {

  isOpen: boolean;

  onClose: () => void;

  onNavigate: (page: NavPage) => void;

};



function AvelinaSidebar({ isOpen, onClose, onNavigate }: AvelinaSidebarProps) {
  if (!isOpen) return null;

  const handleNav = (page: NavPage) => {
    onClose();
    if (window.location.pathname.startsWith('/producto')) {
      window.location.assign(page === 'inicio' ? '/' : `/${page}`);
    } else {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePopular = () => {
    onClose();
    if (window.location.pathname.startsWith('/producto')) {
      window.location.assign('/#popular-products-section');
    } else {
      onNavigate('inicio');
      setTimeout(() => {
        const el = document.getElementById('popular-products-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF7F2] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto border-l border-[#E9E0D6]">
        <div>
          {/* Cabecera */}
          <div className="flex items-center justify-between pb-5 border-b border-[#E9E0D6]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B58A52]">
                Ayacucho — VRAEM
              </p>
              <h3 className="font-serif text-xl font-bold text-[#3B241C]">
                Royal Raymi
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-wider text-[#756C64] hover:text-[#3B241C] border border-[#E9E0D6] px-3 py-1.5 rounded-full transition-colors"
            >
              Cerrar
            </button>
          </div>

          {/* Menú de navegación completo */}
          <nav className="flex flex-col py-4">
            <button
              onClick={() => handleNav('inicio')}
              className="text-left font-serif text-[17px] text-[#3B241C] hover:text-[#B58A52] py-3 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Inicio
            </button>

            <button
              onClick={() => handleNav('tienda')}
              className="text-left font-serif text-[17px] text-[#3B241C] hover:text-[#B58A52] py-3 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Tienda
            </button>

            <button
              onClick={() => handleNav('nosotros')}
              className="text-left font-serif text-[17px] text-[#3B241C] hover:text-[#B58A52] py-3 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Nosotros
            </button>

            <button
              onClick={() => handleNav('productores')}
              className="text-left font-serif text-[17px] text-[#3B241C] hover:text-[#B58A52] py-3 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Nuestros Productores
            </button>

            <button
              onClick={() => handleNav('puntos_de_venta')}
              className="text-left font-serif text-[17px] text-[#3B241C] hover:text-[#B58A52] py-3 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Puntos de Venta
            </button>

            <button
              onClick={() => handleNav('blog')}
              className="text-left font-serif text-[17px] text-[#3B241C] hover:text-[#B58A52] py-3 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Blog
            </button>

            <button
              onClick={handlePopular}
              className="text-left font-serif text-[17px] text-[#3B241C] hover:text-[#B58A52] py-3 border-b border-[#E9E0D6]/60 transition-colors"
            >
              Productos Populares
            </button>
          </nav>
        </div>

        {/* Pie del menú */}
        <div className="pt-6 border-t border-[#E9E0D6] text-xs text-[#6E5D53]">
          <p className="font-semibold text-[#3B241C]">The Scent of VRAEM</p>
          <p className="mt-1">Cacao y café de origen ayacuchano con identidad y calidad de exportación.</p>
          <p className="mt-2 text-[#B58A52] font-medium">+51 967 179 747</p>
        </div>
      </div>
    </div>
  );
}

const pageFromPath = (path: string): NavPage => {
  if (path === '/tienda' || path.startsWith('/producto/')) return 'tienda';
  const knownPages = ['productores', 'blog', 'reclamaciones', 'nosotros', 'sucursales'];
  const page = path.replace(/^\/+|\/+$/g, '');
  return (knownPages.includes(page) ? page : 'inicio') as NavPage;
};

export default function App() {

  const pathname = useShopPath();
  const isProductPage = pathname.startsWith('/producto/');
  const [currentPage, setCurrentPage] = useState<NavPage>(() => pageFromPath(window.location.pathname));

  // Sincroniza Recargar, Atrás y Adelante con el menú actual.
  useEffect(() => {
    setCurrentPage(pageFromPath(pathname));
  }, [pathname]);

  // Estados de sesión y Admin
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserEmail(session.user.email || '');
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            setUserRole((data?.role as 'admin' | 'client') || 'client');
          });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email || '');
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setUserRole((data?.role as 'admin' | 'client') || 'client');
      } else {
        setUserRole(null);
        setUserEmail('');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserRole(null);
    setCurrentPage('inicio' as any);
  };



  const [targetProduct, setTargetProduct] = useState<string | null>(null);

  // Los módulos del inicio deben llevar PRIMERO a la ficha destacada en Tienda.

  // Vista a la tienda
  const handleGoToProduct = (productKey: string) => {
    window.location.assign(`/producto/${encodeURIComponent(productKey)}`);
  };


  const handleFooterCategory = (category: string) => {

    setSelectedCategory(category);

    navigateShop('/tienda');

  };



  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState<boolean>(false);

  const [isAvelinaSidebarOpen, setIsAvelinaSidebarOpen] = useState<boolean>(false);

  const [activeProductForReservation] = useState<ProductItem | null>(null);

  const [isReservationDrawerOpen, setIsReservationDrawerOpen] = useState<boolean>(false);

  const handleNavigate = (page: any) => {
    // Si tienes un estado que controle el producto (por ejemplo setIsProductPage), apágalo aquí:
    // setIsProductPage(false);

    setCurrentPage(page);
    window.history.pushState({}, '', page === 'inicio' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Ruta independiente y exclusiva. La home y el catálogo NUNCA se montan aquí.
  // Un clic normal sobre <a href="/producto/..."> recarga el documento y vuelve
  // a entrar aquí incluso si un componente anterior usaba navegación por estado.
  if (isProductPage) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FDFBF7] text-[#29231F] font-sans antialiased">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenSidebar={() => setIsAvelinaSidebarOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          userRole={userRole}
        />

        <div className="flex-1">
          <RoyalStorefront products={ROYAL_RAYMI_PRODUCTS} showCart={false} />
        </div>
        <Footer onNavigate={handleNavigate} onSelectCategory={handleFooterCategory} />
        <AvelinaSidebar isOpen={isAvelinaSidebarOpen} onClose={() => setIsAvelinaSidebarOpen(false)} onNavigate={handleNavigate} />
        <WhatsAppWidget />
        <SocialSidebar />
      </div>
    );
  }

  // Si estamos en la vista admin y el usuario es admin, mostramos el Dashboard
  if ((currentPage as string) === 'admin' && userRole === 'admin') {
    return (
      <AdminDashboard
        onBackToStore={() => setCurrentPage('inicio' as any)}
        onLogout={handleLogout}
        adminEmail={userEmail}
      />
    );
  }

  return (

    <div className="min-h-screen bg-[#FDFBF7] text-[#29231F] flex flex-col font-sans antialiased selection:bg-[#B58A52]/20 relative">



      {/* 1. Header Sticky con Logo Oficial y Menú Avelina */}

      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSidebar={() => setIsAvelinaSidebarOpen(true)}
        onOpenAuth={() => {
          if (userRole === 'admin') {
            handleNavigate('admin' as any);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        userRole={userRole}
      />

      {/* 2. Contenido con Transición Fluida (300ms ease-out) */}

      <main key={isProductPage ? pathname : currentPage} className="flex-1 animate-page-transition">


        {/* VISTA 1: INICIO (Portada con Banners + Avelina) */}

        {!isProductPage && currentPage === "inicio" && (

          <>

            {/* Carrusel de Banners sin texto ni errores */}

            <AvelinaHero />

            {/* Productos Populares (Avelina) */}

            <PopularProducts onGoToProduct={handleGoToProduct} />

            {/* 2. Video Corporativo Compacto (AQUÍ EN MEDIO) */}

            <CorporateVideo />

            <SpecialDays onGoToProduct={handleGoToProduct} />

            <TikTokGallery />

            {/* SLIDE / BANDA DE EMPRESAS ALIADAS (ESTILO AVELINA) */}

            <AlliedCompanies />

            {/* Sección Productores e Historia */}

            <ProducersSection />

          </>

        )}

        {/* VISTA 2: TIENDA */}

        {!isProductPage && currentPage === "tienda" && (

          <ShopView

            selectedCategory={selectedCategory}

            targetProduct={targetProduct}

            onClearTarget={() => setTargetProduct(null)}

          />

        )}


        {/* VISTA: PRODUCTORES */}

        {!isProductPage && currentPage === "productores" && (

          <div className="py-8">

            <ProducersSection />

          </div>

        )

        /* Sección de Puntos de Venta */}
        {!isProductPage && (currentPage === 'puntos_de_venta' || (currentPage as string) === 'sucursales') && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B58A52]">
                  Encuéntranos
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#3B241C] mt-2">
                  Nuestros Puntos de Venta
                </h2>
                <p className="text-xs sm:text-sm text-[#6B5A52] mt-2">
                  Visítanos en nuestras tiendas físicas y distribuidores autorizados en Ayacucho.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PUNTOS_DE_VENTA.map((punto) => (
                  <div
                    key={punto.id}
                    className="bg-[#FAF7F2] rounded-3xl border border-[#EBE3D5] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-white">
                      <img
                        src={punto.image}
                        alt={punto.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#3B241C]">
                          {punto.name}
                        </h3>
                        <p className="text-xs text-[#6B5A52] mt-2 flex items-start gap-1.5">
                          <MapPin className="w-4 h-4 text-[#B58A52] shrink-0 mt-0.5" />
                          <span>{punto.address}</span>
                        </p>
                        {punto.schedule && (
                          <p className="text-xs text-[#8C7A70] mt-1 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#B58A52] shrink-0" />
                            <span>{punto.schedule}</span>
                          </p>
                        )}
                      </div>

                      {punto.mapsUrl && (
                        <a
                          href={punto.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-[#3B241C] hover:bg-[#B58A52] text-[#FAF7F2] text-xs font-semibold text-center transition-colors flex items-center justify-center gap-2"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Ver en Google Maps</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VISTA: BLOG */}

        {!isProductPage && currentPage === "blog" && (

          <BlogView onGoToShop={() => handleNavigate("tienda")} />

        )}



        {!isProductPage && currentPage === "reclamaciones" && (

          <ReclamacionesView onBackToHome={() => handleNavigate("inicio")} />

        )}

        {/* VISTA CLIENTE: MIS PEDIDOS */}
        {currentPage === 'pedidos' && (
          <ClientOrdersView onBackToStore={() => handleNavigate('tienda')} />
        )}

        {/* VISTA: NOSOTROS */}

        {!isProductPage && currentPage === "nosotros" && (

          <section className="py-16 px-4 max-w-6xl mx-auto animate-fadeIn">

            {/* Encabezado */}

            <div className="text-center max-w-2xl mx-auto mb-12">

              <span className="text-xs uppercase tracking-widest text-[#B58A52] font-semibold">

                Identidad & Origen

              </span>

              <h2 className="mt-2 font-serif text-3xl md:text-5xl font-bold text-[#3B241C]">

                Nuestra Historia

              </h2>

              <div className="mt-3 mx-auto w-16 h-0.5 bg-[#B58A52]" />

            </div>



            {/* Tarjeta editorial con trasfondo texturizado */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F5EFE6] to-[#ECE1D3] p-8 md:p-12 rounded-3xl border border-[#E9E0D6] shadow-lg">

              {/* Patrón decorativo de fondo */}

              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B58A52]/10 blur-3xl pointer-events-none" />

              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#3B241C]/5 blur-3xl pointer-events-none" />



              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Columna Foto con marco elegante y encuadre completo */}

                <div className="lg:col-span-5 flex justify-center">

                  <div className="relative group w-full max-w-md">

                    {/* Sombra / borde decorativo desplazado */}

                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#B58A52]/40 to-[#3B241C]/20 opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />



                    <div className="relative rounded-2xl overflow-hidden bg-[#FAF7F2] p-2 border border-[#E9E0D6] shadow-xl">

                      <img

                        src="/assets/producers/foto_del_equipo.webp"

                        alt="Familia y Equipo Royal Raymi"

                        className="w-full h-[380px] md:h-[420px] object-contain rounded-xl bg-[#FAF7F2] transition-transform duration-500 group-hover:scale-[1.02]"

                        onError={(e) => {

                          (e.target as HTMLImageElement).src = "/assets/brand/royal-raymi-logo-azul.png";

                        }}

                      />

                      <div className="py-2 text-center">

                        <span className="text-[11px] font-serif italic text-[#6E5D53]">

                          Valle del Río Apurímac & Ayacucho

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Columna Texto */}

                <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-[#6E5D53]">

                  <h3 className="font-serif text-2xl md:text-3xl text-[#3B241C] font-bold">

                    ¡Bienvenidos a Royal Raymi!

                  </h3>


                  <p className="text-base md:text-lg leading-relaxed font-light text-[#3B241C]">

                    Somos un emprendimiento familiar nacido en Ayacucho, impulsado por la pasión por la calidad y el compromiso con nuestra comunidad. Con el tiempo, nos hemos consolidado como una empresa referente en la producción de chocolates y café en la región.

                  </p>



                  <p className="text-sm md:text-base leading-relaxed">

                    Nuestro esfuerzo por ofrecer productos de excelencia ha sido reconocido en diversas ediciones del Salón del Cacao y Chocolate de Lima. También hemos tenido el honor de participar en importantes encuentros internacionales, como los organizados por <strong className="font-semibold text-[#3B241C]">AVPA en Europa</strong> y el <strong className="font-semibold text-[#3B241C]">Salón del Chocolate de Francia</strong>.

                  </p>



                  <p className="text-sm md:text-base leading-relaxed italic border-l-2 border-[#B58A52] pl-4 text-[#3B241C]/85 bg-white/40 py-2 rounded-r-lg">

                    “Gracias por acompañarnos y ser parte de nuestra historia. En Royal Raymi, seguimos trabajando con pasión y dedicación para compartir lo mejor de Ayacucho con el mundo.”

                  </p>



                  {/* Insignias de Reconocimiento */}

                  <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#E9E0D6]/80">

                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#E9E0D6]">

                      <span className="block text-[10px] uppercase tracking-wider text-[#B58A52] font-semibold">

                        Nacional

                      </span>

                      <span className="text-xs md:text-sm font-semibold text-[#3B241C] mt-1 block">

                        Salón del Cacao y Chocolate (Lima)

                      </span>

                    </div>

                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#E9E0D6]">

                      <span className="block text-[10px] uppercase tracking-wider text-[#B58A52] font-semibold">

                        Internacional

                      </span>

                      <span className="text-xs md:text-sm font-semibold text-[#3B241C] mt-1 block">

                        AVPA Europa & París Gourmet

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

        )}

      </main>

      <Footer

        onNavigate={handleNavigate}

        onSelectCategory={handleFooterCategory}

      />


      {/* 4. Sidebar Avelina (Panel lateral complementario con logo centrado y reseñas) */}

      <AvelinaSidebar

        isOpen={isAvelinaSidebarOpen}

        onClose={() => setIsAvelinaSidebarOpen(false)}

        onNavigate={handleNavigate}

      />


      {/* 5. Sidebar de Filtro de Categorías */}

      <CategorySidebar

        isOpen={isCategorySidebarOpen}

        onClose={() => setIsCategorySidebarOpen(false)}

        categories={ALL_CATEGORIES}

        selectedCategory={selectedCategory}

        onSelectCategory={setSelectedCategory}

        totalProductsCount={ROYAL_RAYMI_PRODUCTS.length}

      />



      {/* 6. Modal / Formulario de Reserva con Despacho a WhatsApp */}

      <ReservationDrawer

        isOpen={isReservationDrawerOpen}

        onClose={() => setIsReservationDrawerOpen(false)}

        product={activeProductForReservation}

      />



      {/* 7. Widget Flotante de WhatsApp */}

      <WhatsAppWidget />



      <SocialSidebar />

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(role) => {
          setUserRole(role);
          setIsAuthModalOpen(false);
          if (role === 'admin') {
            setCurrentPage('admin' as any);
            window.history.pushState({}, '', '/admin');
          }
        }}
      />

    </div>
  );
}