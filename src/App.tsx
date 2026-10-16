import { useState, } from "react";
import type { ProductItem } from "./types";
import { Navbar } from "./components/Navbar";
import type { NavPage } from "./components/Navbar";
import { PopularProducts } from "./components/PopularProducts";
import { SpecialDays } from "./components/SpecialDays";
import { ShopView } from "./components/ShopView";
import { AvelinaHero } from "./components/AvelinaHero";
import { ReservationDrawer } from "./components/ReservationDrawer";
import { ProducersSection } from "./components/ProducersSection";
import { CategorySidebar } from "./components/CategorySidebar";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { Footer } from "./components/Footer";
import { ROYAL_RAYMI_PRODUCTS } from "./data/products";
import { MapPin, Navigation, Clock, } from "lucide-react";
import imgMontefino from "./assets/puntos_de_venta/punto_de_venta_montefino.webp";
import imgUNSCH from "./assets/puntos_de_venta/punto_de_venta_tiendas UNSCH.webp";
import imgVimarket from "./assets/puntos_de_venta/punto_de_venta_Vimarket.webp";




const ALL_CATEGORIES = ["Todos", "Chocolates", "Café", "Polvos y Nibs"];
const PUNTOS_DE_VENTA = [
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
];


type AvelinaSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavPage) => void;
};

function AvelinaSidebar({ isOpen, onClose, onNavigate }: AvelinaSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro para cerrar al hacer clic afuera */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Panel lateral */}
      <div className="relative z-10 w-full max-w-sm bg-[#FDFBF7] h-full shadow-2xl p-6 flex flex-col justify-between border-l border-[#E9E0D6]">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#E9E0D6]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B58A52] font-semibold">Menú</span>
              <h3 className="font-serif text-xl text-[#3B241C] font-bold">Royal Raymi</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#E9E0D6] bg-[#F7F2EB] px-3 py-1 text-sm text-[#3B241C] hover:bg-[#E9E0D6] transition-colors"
            >
              Cerrar ✕
            </button>
          </div>

          <nav className="mt-8 flex flex-col space-y-4">
            <button
              onClick={() => { onNavigate("inicio"); onClose(); }}
              className="text-left font-serif text-lg text-[#3B241C] hover:text-[#B58A52] transition-colors py-2 border-b border-[#E9E0D6]/40"
            >
              Inicio
            </button>
            <button
              onClick={() => {
                onNavigate("inicio");
                onClose();
                setTimeout(() => {
                  document.getElementById("popular-products-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="text-left font-serif text-lg text-[#3B241C] hover:text-[#B58A52] transition-colors py-2 border-b border-[#E9E0D6]/40"
            >
              Productos Populares
            </button>
            <button
              onClick={() => { onNavigate("blog"); onClose(); }}
              className="text-left font-serif text-lg text-[#3B241C] hover:text-[#B58A52] transition-colors py-2 border-b border-[#E9E0D6]/40"
            >
              Blog & Novedades
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E9E0D6] text-xs text-[#6E5D53]">
          <p className="font-semibold text-[#3B241C]">The Scent of VRAEM</p>
          <p className="mt-1">Cacao y café de origen ayacuchano con identidad y calidad de exportación.</p>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>("inicio");
  const [targetProduct, setTargetProduct] = useState<string | null>(null);

  const handleGoToProduct = (productKey: string) => {
    setTargetProduct(productKey);
    setCurrentPage("tienda");
  };

  const handleFooterCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage("tienda");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState<boolean>(false);
  const [isAvelinaSidebarOpen, setIsAvelinaSidebarOpen] = useState<boolean>(false);
  const [activeProductForReservation] = useState<ProductItem | null>(null);
  const [isReservationDrawerOpen, setIsReservationDrawerOpen] = useState<boolean>(false);

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#29231F] flex flex-col font-sans antialiased selection:bg-[#B58A52]/20 relative">

      {/* 1. Header Sticky con Logo Oficial y Menú Avelina */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSidebar={() => setIsAvelinaSidebarOpen(true)}
      />


      {/* 2. Contenido con Transición Fluida (300ms ease-out) */}
      <main key={currentPage} className="flex-1 animate-page-transition">

        {/* VISTA 1: INICIO (Portada con Banners + Avelina) */}
        {currentPage === "inicio" && (
          <>
            {/* Carrusel de Banners sin texto ni errores */}
            <AvelinaHero />

            {/* Productos Populares (Avelina) */}
            <PopularProducts onGoToProduct={handleGoToProduct} />

            {/* Días Especiales / Regalos (Avelina) */}
            <SpecialDays onGoToShop={() => setCurrentPage("tienda")} />

            {/* Sección Productores e Historia */}
            <ProducersSection />
          </>
        )}

        {/* VISTA 2: TIENDA */}
{currentPage === "tienda" && (
  <ShopView
    selectedCategory={selectedCategory}
    targetProduct={targetProduct}
    onClearTarget={() => setTargetProduct(null)}
  />
)}

        {/* VISTA: PRODUCTORES */}
        {currentPage === "productores" && (
          <div className="py-8">
            <ProducersSection />
          </div>
        )}

        {/* VISTA: NOSOTROS */}
        {currentPage === "nosotros" && (
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
                        src="/assets/producers/foto_principal.jpeg"
                        alt="Royal Raymi - Origen y Pasión"
                        className="w-full h-[400px] object-contain rounded-xl bg-[#F7F2EB] transition-transform duration-500 group-hover:scale-[1.02]"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.endsWith("/foto_principal.jpeg")) {
                            target.src = "/foto_principal.jpeg";
                          }
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

        {/* VISTA: PUNTOS DE VENTA */}
        {currentPage === "sucursales" && (
          <section className="py-16 px-4 max-w-7xl mx-auto w-full animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest text-[#B58A52] font-semibold">
                Encuéntranos en Ayacucho
              </span>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-[#3B241C]">
                Nuestros Puntos de Venta
              </h2>
              <p className="mt-3 text-sm text-[#6E5D53]">
                Visita nuestras tiendas oficiales y módulos autorizados para degustar y adquirir nuestra exclusiva selección de chocolates y café fino.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PUNTOS_DE_VENTA.map((store) => (
                <div
                  key={store.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E9E0D6] bg-white shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div>
                    {/* Foto de la tienda */}
                    <div className="relative h-48 w-full overflow-hidden bg-[#FAF7F2] border-b border-[#E9E0D6]">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback si la imagen aún no está en la carpeta: muestra foto_principal
                          e.currentTarget.src = "/assets/producers/foto_principal.jpeg";
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-[#3B241C]/80 backdrop-blur-sm text-[#FAF7F2] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium">
                        Ayacucho
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[#B58A52]">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="text-[11px] font-semibold tracking-wider uppercase">
                          Royal Raymi Oficial
                        </span>
                      </div>

                      <h3 className="mt-2 font-serif text-xl font-bold text-[#3B241C]">
                        {store.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#6E5D53]">
                        {store.address}
                      </p>
                      <p className="mt-1 text-xs text-[#8C7A6B]">
                        {store.reference}
                      </p>

                      <div className="mt-5 pt-4 border-t border-[#F0EAE1] space-y-2 text-xs text-[#6E5D53]">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#B58A52] flex-shrink-0" />
                          <span>{store.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2">

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <a
                      href={store.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B241C] px-4 py-3 text-xs font-semibold text-[#FDFBF7] hover:bg-[#523428] transition-colors"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>Cómo llegar (Google Maps)</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* 3. Footer Oficial */}
<Footer
  onNavigate={(tab) => setCurrentPage(tab as NavPage)}
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
    </div>
  );
}