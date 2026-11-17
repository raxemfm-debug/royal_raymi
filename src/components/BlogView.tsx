import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, User, } from 'lucide-react';
import imgCosecha1 from '../assets/blog_items/cosecha_1.webp';
import imgCosecha2 from '../assets/blog_items/cosecha_2.webp';
import imgCosecha3 from '../assets/blog_items/cosecha_3.webp';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  gallery?: { url: string; caption: string }[];
  content: string[];
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Café peruano: un sabor que nace entre montañas y contrastes',
    excerpt: 'El café peruano no es solo una bebida matutina, es el resultado de geografías extremas, manos campesinas y una biodiversidad única en los valles del VRAEM.',
    category: 'Cultura del Café',
    author: 'Ing. Doris Paucar Pizarro',
    date: '15 Octubre, 2026',
    readTime: '4 min de lectura',
    image: imgCosecha1,
    gallery: [
      { url: imgCosecha2, caption: 'Cerezas de café en su punto óptimo de maduración.' },
      { url: imgCosecha3, caption: 'Geografía montañosa y contrastes térmicos del VRAEM.' },
    ],
    content: [
      'El café peruano tiene una riqueza que va mucho más allá de su aroma y sabor. Su personalidad nace de la diversidad geográfica del Perú, donde las montañas, los suelos, la altitud y los cambios de temperatura crean condiciones particulares para el cultivo del café.',
      'Un ejemplo fascinante se encuentra en Ayacucho, especialmente en las zonas cafetaleras de Huanta y el VRAEM, donde los paisajes de ceja de selva ofrecen contrastes climáticos que pueden marcar la diferencia. En determinadas zonas, los días son calurosos y las noches considerablemente más frescas. Estas variaciones, junto con la altitud y otros factores ambientales, pueden influir en la maduración de las cerezas y en el desarrollo de sus características.',
      'Pero el territorio es solo el comienzo. La variedad del cafeto, el cuidado del productor, la selección de los frutos maduros y los procesos de fermentación, secado y tostado también determinan el perfil final de cada café. Por eso, una misma región puede ofrecer granos con notas dulces, achocolatadas, frutales o florales, cada uno con una identidad propia.',
      'En Ayacucho, esta riqueza constituye una oportunidad para dar mayor visibilidad a los productores y a los cafés del VRAEM, un territorio cuyo potencial merece ser conocido y valorado.',
      'Porque detrás de cada taza hay mucho más que café: hay montañas, clima, tierra y el trabajo de quienes convierten los frutos de su región en una experiencia para los sentidos.'
    ]
  },
  {
    id: 2,
    title: 'Cacao Chuncho del VRAEM: El secreto de nuestros chocolates finos de aroma',
    excerpt: 'Descubre por qué la variedad nativa Chuncho es considerada una de las más codiciadas en el Salón del Chocolate de París y cómo la transformamos artesanalmente.',
    category: 'Cacao & Chocolate',
    author: 'Equipo Royal Raymi',
    date: '28 Septiembre, 2026',
    readTime: '5 min de lectura',
    image: imgCosecha2,
    gallery: [
      { url: imgCosecha1, caption: 'Selección manual de granos en cosecha familiar.' }
    ],
    content: [
      'El cacao nativo del VRAEM destaca por sus notas florales, afrutadas y una suavidad natural que no requiere azúcares excesivos para brillar.',
      'Nuestros productores asociados fermentan las mazorcas en cajones de madera laurel durante 5 a 6 días, permitiendo que los precursores de sabor se desarrollen en su máxima expresión.',
      'Cada barra de chocolate Royal Raymi, desde el tradicional huamanguino hasta nuestras tabletas con inclusiones de nibs y frutos andinos, es testimonio de esta herencia botánica.'
    ]
  },
  {
    id: 3,
    title: 'Emprendimiento familiar con identidad: El camino a los premios internacionales',
    excerpt: 'Nuestra historia de superación y amor por la tierra que llevó a una marca familiar de Huamanga a ser condecorada internacionalmente.',
    category: 'Historia & Reconocimientos',
    author: 'Familia Royal Raymi',
    date: '10 Agosto, 2026',
    readTime: '3 min de lectura',
    image: '/assets/producers/foto_del_equipo.webp',
    content: [
      'Nacimos en Ayacucho con una convicción clara: agregar valor al fruto del esfuerzo de nuestros agricultores en vez de exportar materia prima sin procesar.',
      'Los reconocimientos obtenidos en París, Bruselas y Lima confirman que la dedicación meticulosa en cada lote compite de igual a igual con los mejores chocolates del mundo.'
    ]
  }
];

interface BlogViewProps {
  onGoToShop?: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onGoToShop }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Cultura del Café', 'Cacao & Chocolate', 'Historia & Reconocimientos'];

  const filteredPosts = activeCategory === 'Todos'
    ? DEFAULT_POSTS
    : DEFAULT_POSTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    const handleResetBlog = () => {
      setSelectedPost(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('reset-blog-view', handleResetBlog);
    return () => window.removeEventListener('reset-blog-view', handleResetBlog);
  }, []);

  // VISTA ARTÍCULO INDIVIDUAL
  if (selectedPost) {
    return (
      <article className="min-h-screen bg-[#FAF7F2] text-[#2B1B17] py-12 sm:py-16 animate-fadeIn">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            type="button"
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C5D38] hover:text-[#3B241C] mb-8 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a todos los artículos
          </button>

          {/* Encabezado */}
          <header className="text-center space-y-4 mb-10">
            <span className="inline-block px-3 py-1 bg-[#F4EFE6] text-[#8C5D38] border border-[#E8DEC8] rounded-full text-xs font-semibold tracking-widest uppercase">
              {selectedPost.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2B1B17] leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-xs text-stone-500 pt-2">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{selectedPost.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{selectedPost.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{selectedPost.readTime}</span>
            </div>
            <div className="w-16 h-[2px] bg-[#B58A52] mx-auto mt-4" />
          </header>

          {/* Imagen Principal (Hero) */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-[#E8DEC8] mb-12 bg-stone-100">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Cuerpo de texto */}
          <div className="space-y-6 text-stone-800 text-base sm:text-lg leading-relaxed font-light">
            {selectedPost.content.slice(0, 2).map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#3B241C] first-letter:leading-none" : ""}
              >
                {p}
              </p>
            ))}

            {/* Galería de 2 imágenes dentro del mismo artículo */}
            {selectedPost.gallery && selectedPost.gallery.length > 0 && (
              <div className={`grid grid-cols-1 ${selectedPost.gallery.length > 1 ? 'md:grid-cols-2' : ''} gap-6 my-10`}>
                {selectedPost.gallery.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-[#E8DEC8] bg-stone-100">
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {item.caption && (
                      <p className="text-xs text-stone-500 text-center italic">
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedPost.content.slice(2).map((p, i) => (
              <p key={i + 2}>{p}</p>
            ))}

            {/* Cierre institucional */}
            <div className="mt-12 p-8 bg-white border border-[#E8DEC8] rounded-2xl shadow-sm text-center space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-[#3B241C]">
                El compromiso de Royal Raymi
              </h3>
              <p className="text-stone-700 text-sm sm:text-base max-w-xl mx-auto">
                Royal Raymi celebra la riqueza de los productos peruanos y el valor de los territorios que les dan origen.
              </p>
              {onGoToShop && (
                <button
                  type="button"
                  onClick={onGoToShop}
                  className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#3B241C] hover:bg-[#2B1B17] text-white text-sm font-medium transition-colors shadow-sm cursor-pointer"
                >
                  Explorar nuestra línea de productos
                </button>
              )}
            </div>

          </div>

        </div>
      </article>
    );
  }

  // VISTA LISTADO GENERAL DE ARTÍCULOS
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Blog */}
        <div className="text-center space-y-3 mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B241C]">
            El Blog de Royal Raymi
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Explora artículos sobre el origen de nuestro café, el cacao fino de aroma del VRAEM y la cultura gastronómica de Ayacucho.
          </p>
        </div>

        {/* Filtros de Categorías */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-[#3B241C] text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-[#E8DEC8] hover:border-[#3B241C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#8C5D38]">
                    <span>{post.category}</span>
                    <span className="text-stone-400 font-normal">{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-lg font-bold text-[#3B241C] group-hover:text-[#B58A52] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs text-stone-600 line-clamp-3 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>{post.date}</span>
                  <span className="font-semibold text-[#3B241C] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Leer artículo &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogView;
