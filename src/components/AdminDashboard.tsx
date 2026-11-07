import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PRODUCTS as INITIAL_PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import type { Product } from '../data/products';
import { 
  Package, 
  FileText, 
  Plus, 
  Trash2, 
  RotateCcw,
  Edit3, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  LogOut, 
  Check, 
  X, 
  Archive,
  Search,
  ArrowUpDown
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToStore?: () => void;
  onLogout?: () => Promise<void> | void;
  adminEmail?: string;
}

type CategoryKeyType = Product['categoryKey'];

export default function AdminDashboard({ onBackToStore, onLogout, adminEmail }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'trash' | 'blog'>('products');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Estado del organizador A-Z / Z-A

  // Modal Crear / Editar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Chocolates Tradicional',
    categoryKey: 'chocolates_tradicional' as CategoryKeyType,
    description: '',
    price: '',
    isPriceVisible: false,
    imageUrl: '',
    isPopular: false,
  });

  // Blog
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogMessage, setBlogMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Orden alfabético estricto desde la base de datos
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          category: row.category,
          categoryKey: row.category_key || row.categoryKey,
          description: row.description,
          imageUrl: row.image_url || row.imageUrl,
          price: row.price,
          isPopular: row.is_popular ?? row.isPopular,
          isPriceVisible: row.is_price_visible ?? row.isPriceVisible ?? false,
          isArchived: row.is_archived ?? row.isArchived ?? false,
        }));
        
        // Orden alfabético en memoria garantizado
        mapped.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
        setProducts(mapped as Product[]);
      }
    } catch (err) {
      console.warn('Cargando catálogo local:', err);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Chocolates Tradicional',
      categoryKey: 'chocolates_tradicional',
      description: '',
      price: '',
      isPriceVisible: false,
      imageUrl: '',
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      categoryKey: p.categoryKey,
      description: p.description || '',
      price: p.price ? String(p.price) : '',
      isPriceVisible: (p as any).isPriceVisible || false,
      imageUrl: p.imageUrl || '',
      isPopular: p.isPopular || false,
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    const newId = editingProduct ? editingProduct.id : `prod-${Date.now()}`;
    const newProduct: Product & { isPriceVisible: boolean; isArchived: boolean } = {
      id: newId,
      name: formData.name,
      category: formData.category,
      categoryKey: formData.categoryKey,
      description: formData.description,
      imageUrl: formData.imageUrl || '/assets/brand/Royal-Raymi-logo-cacao-profundo.png',
      ...(formData.price ? { price: Number(formData.price) } : {}),
      isPopular: formData.isPopular,
      isPriceVisible: formData.isPriceVisible,
      isArchived: false,
    };

    // Guardar en Supabase
    try {
      await supabase.from('products').upsert({
        id: newProduct.id,
        name: newProduct.name,
        category: newProduct.category,
        category_key: newProduct.categoryKey,
        description: newProduct.description,
        image_url: newProduct.imageUrl,
        price: newProduct.price ?? null,
        is_popular: newProduct.isPopular ?? false,
        is_price_visible: newProduct.isPriceVisible,
        is_archived: false,
      });
    } catch (err) {
      console.error('Error guardando en Supabase:', err);
    }

    // Actualizar estado local manteniendo orden A-Z
    setProducts(prev => {
      const exists = prev.some(p => p.id === newProduct.id);
      const updated = exists 
        ? prev.map(p => p.id === newProduct.id ? newProduct : p)
        : [...prev, newProduct];
      return updated.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
    });

    setLoading(false);
    setIsModalOpen(false);
  };

  // Mover a la papelera (Soft delete)
  const handleArchiveProduct = async (id: string, name: string) => {
    if (!confirm(`¿Mover "${name}" a la papelera?`)) return;

    setProducts(prev => prev.map(p => p.id === id ? { ...p, isArchived: true } as any : p));

    try {
      await supabase.from('products').update({ is_archived: true }).eq('id', id);
    } catch (err) {
      console.error('Error archivando:', err);
    }
  };

  // Restaurar desde la papelera
  const handleRestoreProduct = async (id: string) => {
    setProducts(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, isArchived: false } as any : p);
      return updated.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
    });

    try {
      await supabase.from('products').update({ is_archived: false }).eq('id', id);
    } catch (err) {
      console.error('Error restaurando:', err);
    }
  };

  const handleTogglePriceVisibility = async (product: Product) => {
    const updated = {
      ...product,
      isPriceVisible: !(product as any).isPriceVisible,
    };

    // Actualiza sin alterar el orden
    setProducts(prev => 
      prev.map(p => p.id === product.id ? updated as any : p)
    );

    try {
      await supabase.from('products').update({ 
        is_price_visible: (updated as any).isPriceVisible 
      }).eq('id', product.id);
    } catch (err) {
      console.error('Error actualizando visibilidad:', err);
    }
  };

  const handleExit = () => {
    if (onBackToStore) onBackToStore();
    else window.location.href = '/';
  };

  const handleCloseSession = async () => {
    if (onLogout) await onLogout();
    else {
      await supabase.auth.signOut();
      window.location.href = '/';
    }
  };

  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBlogMessage('');

    try {
      const { error } = await supabase.from('blog_posts').insert([{
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        image_url: blogImage,
        created_at: new Date().toISOString(),
      }]);

      if (error) throw error;
      setBlogMessage('¡Artículo publicado con éxito!');
      setBlogTitle('');
      setBlogExcerpt('');
      setBlogContent('');
      setBlogImage('');
    } catch (err: any) {
      setBlogMessage(`Error: ${err.message || 'No se pudo publicar'}`);
    } finally {
      setLoading(false);
    }
  };

  // Filtro y ordenamiento alfabético garantizado
  const activeProducts = products
    .filter(p => {
      const isArchived = (p as any).isArchived;
      if (isArchived) return false;
      const matchCategory = selectedCategory === 'todos' || p.categoryKey === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      const comp = a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
      return sortOrder === 'asc' ? comp : -comp;
    });

  const archivedProducts = products.filter(p => (p as any).isArchived);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3B241C]">
      {/* Header Superior */}
      <header className="bg-[#3B241C] text-[#FAF7F2] px-6 py-4 flex flex-wrap items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExit}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Volver a la tienda"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold font-serif">Panel de Administración</h1>
            <p className="text-xs text-[#FAF7F2]/70">
              {adminEmail ? `Conectado como ${adminEmail}` : 'Royal Raymi • Control Central'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExit}
            className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Ver Web
          </button>
          <button 
            onClick={handleCloseSession}
            className="px-4 py-2 text-sm bg-red-600/80 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Navegación por pestañas */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-2 border-b border-[#3B241C]/10 pb-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'products'
                ? 'bg-[#3B241C] text-[#FAF7F2] shadow-sm'
                : 'bg-white/60 hover:bg-white text-[#3B241C]/70'
            }`}
          >
            <Package className="w-4 h-4" />
            Catálogo Activo ({products.filter(p => !(p as any).isArchived).length})
          </button>

          <button
            onClick={() => setActiveTab('trash')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'trash'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'bg-white/60 hover:bg-white text-[#3B241C]/70'
            }`}
          >
            <Archive className="w-4 h-4" />
            Papelera ({archivedProducts.length})
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'blog'
                ? 'bg-[#3B241C] text-[#FAF7F2] shadow-sm'
                : 'bg-white/60 hover:bg-white text-[#3B241C]/70'
            }`}
          >
            <FileText className="w-4 h-4" />
            Artículos del Blog
          </button>
        </div>
      </div>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'products' ? (
          <div>
            {/* Barra superior de herramientas */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#3B241C]">Catálogo de Productos</h2>
                <p className="text-sm text-[#3B241C]/70">
                  Modifica imágenes, precios, añade nuevos ítems o archívalos en orden alfabético estricto.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenCreateModal}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#B58A52] hover:bg-[#9E743F] text-white font-medium text-sm rounded-xl shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Añadir Producto
                </button>
              </div>
            </div>

            {/* Buscador, organizador y filtro por categoría */}
            <div className="flex flex-wrap items-center gap-3 mb-6 bg-white p-3 rounded-2xl border border-[#3B241C]/10">
              <div className="flex-1 min-w-[240px] relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#3B241C]/40" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o descripción..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-sm border border-[#3B241C]/15 focus:outline-none focus:border-[#B58A52]"
                />
              </div>

              {/* Botón Organizador A-Z / Z-A */}
              <button
                type="button"
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#3B241C] border border-[#3B241C]/15 hover:bg-[#B58A52] hover:text-white transition-colors"
                title="Cambiar orden alfabético"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>{sortOrder === 'asc' ? 'Orden: A - Z' : 'Orden: Z - A'}</span>
              </button>

              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
                {PRODUCT_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id 
                        ? 'bg-[#3B241C] text-white' 
                        : 'bg-[#FAF7F2] text-[#3B241C]/70 hover:bg-[#FAF7F2]/80'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabla de Productos Activos */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#3B241C]/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#FAF7F2] border-b border-[#3B241C]/10 text-xs font-semibold uppercase text-[#3B241C]/70">
                    <tr>
                      <th className="px-6 py-4">Producto</th>
                      <th className="px-6 py-4">Categoría</th>
                      <th className="px-6 py-4">Precio</th>
                      <th className="px-6 py-4">Visibilidad</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3B241C]/5">
                    {activeProducts.map(product => {
                      const isVisible = (product as any).isPriceVisible;
                      const priceVal = product.price;

                      return (
                        <tr key={product.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-12 h-12 rounded-lg object-contain bg-[#FAF7F2] border border-[#3B241C]/10 p-1"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = '/assets/brand/Royal-Raymi-logo-cacao-profundo.png';
                                }}
                              />
                              <div>
                                <p className="font-semibold text-[#3B241C]">{product.name}</p>
                                <p className="text-xs text-[#3B241C]/60 line-clamp-1 max-w-xs">
                                  {product.description || 'Sin descripción'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-[#3B241C]/80">
                            <span className="px-2.5 py-1 bg-[#FAF7F2] rounded-full border border-[#3B241C]/10">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono font-medium">
                            {priceVal ? `S/ ${Number(priceVal).toFixed(2)}` : <span className="text-xs text-[#3B241C]/40 italic">No asignado</span>}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleTogglePriceVisibility(product)}
                              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                isVisible 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              }`}
                            >
                              {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              {isVisible ? 'Visible' : 'Oculto'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditModal(product)}
                                className="p-2 text-[#3B241C]/70 hover:text-[#3B241C] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                                title="Editar producto"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleArchiveProduct(product.id, product.name)}
                                className="p-2 text-red-600/70 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Enviar a la papelera"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'trash' ? (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#3B241C]">Papelera de Productos</h2>
              <p className="text-sm text-[#3B241C]/70">
                Los productos en papelera no se muestran en la tienda pública. Puedes restaurarlos con un solo clic.
              </p>
            </div>

            {archivedProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-[#3B241C]/10 text-sm text-[#3B241C]/60">
                La papelera está vacía. No tienes productos archivados.
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-[#3B241C]/10 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#FAF7F2] border-b border-[#3B241C]/10 text-xs font-semibold uppercase text-[#3B241C]/70">
                    <tr>
                      <th className="px-6 py-4">Producto</th>
                      <th className="px-6 py-4">Categoría</th>
                      <th className="px-6 py-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3B241C]/5">
                    {archivedProducts.map(product => (
                      <tr key={product.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="px-6 py-4 font-semibold text-[#3B241C]">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-xs text-[#3B241C]/70">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleRestoreProduct(product.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 hover:bg-green-100 border border-green-200 rounded-lg text-xs font-semibold transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Restaurar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-[#3B241C]/10">
            <h2 className="text-2xl font-serif font-bold mb-4">Redactar Nuevo Artículo</h2>
            {blogMessage && (
              <div className={`p-4 rounded-xl text-sm mb-6 ${blogMessage.startsWith('¡') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {blogMessage}
              </div>
            )}
            <form onSubmit={handlePublishBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">Título</label>
                <input 
                  type="text" 
                  value={blogTitle} 
                  onChange={e => setBlogTitle(e.target.value)} 
                  required 
                  placeholder="Ej: El café del VRAEM en París"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">Resumen (Excerpt)</label>
                <textarea 
                  value={blogExcerpt} 
                  onChange={e => setBlogExcerpt(e.target.value)} 
                  rows={2} 
                  placeholder="Breve introducción para la tarjeta..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">Contenido Completo</label>
                <textarea 
                  value={blogContent} 
                  onChange={e => setBlogContent(e.target.value)} 
                  rows={6} 
                  required
                  placeholder="Escribe el cuerpo del artículo aquí..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">URL de Imagen</label>
                <input 
                  type="text" 
                  value={blogImage} 
                  onChange={e => setBlogImage(e.target.value)} 
                  placeholder="/assets/blog_items/cosecha_1.webp o https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52]"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-[#3B241C] text-white font-medium rounded-xl hover:bg-[#2C1A14] transition-colors"
              >
                {loading ? 'Publicando...' : 'Publicar Artículo'}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Modal Crear / Editar Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-[#3B241C]/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#3B241C]/10 mb-4">
              <h3 className="text-lg font-serif font-bold text-[#3B241C]">
                {editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#FAF7F2] text-[#3B241C]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Chocolate 70% con Sal de Maras"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">
                  Categoría
                </label>
                <select
                  value={formData.categoryKey}
                  onChange={e => {
                    const key = e.target.value as CategoryKeyType;
                    const catObj = PRODUCT_CATEGORIES.find(c => c.id === key);
                    setFormData({ 
                      ...formData, 
                      categoryKey: key,
                      category: catObj ? catObj.name : 'Chocolates Tradicional'
                    });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52] bg-white text-sm"
                >
                  <option value="chocolates_tradicional">Chocolates Tradicional</option>
                  <option value="chocolates_sabores">Chocolates de Sabores</option>
                  <option value="grageados">Grageados</option>
                  <option value="cafe">Café</option>
                  <option value="derivados">Derivados</option>
                  <option value="licores">Licores</option>
                  <option value="bombones">Bombones</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Notas de cata, porcentaje de cacao, origen..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">
                    Precio (S/)
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ej: 18.00"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">
                    Visibilidad Precio
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPriceVisible: !formData.isPriceVisible })}
                    className={`w-full mt-0.5 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      formData.isPriceVisible
                        ? 'bg-green-50 border-green-300 text-green-800'
                        : 'bg-amber-50 border-amber-300 text-amber-800'
                    }`}
                  >
                    {formData.isPriceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {formData.isPriceVisible ? 'Público en Tienda' : 'Modo Cotización'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#3B241C]/70 mb-1">
                  Ruta o URL de Imagen
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/assets/products/caja_de_chocolate_70_con_garbanzo.webp"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#3B241C]/20 focus:outline-none focus:border-[#B58A52] text-sm"
                />
                {formData.imageUrl && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-[#FAF7F2] rounded-xl border border-[#3B241C]/10">
                    <img 
                      src={formData.imageUrl} 
                      alt="Vista previa" 
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/assets/brand/Royal-Raymi-logo-cacao-profundo.png';
                      }}
                    />
                    <span className="text-xs text-[#3B241C]/70">Vista previa</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#3B241C]/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#3B241C]/20 text-sm font-medium hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#3B241C] text-white text-sm font-medium hover:bg-[#2C1A14] flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {loading ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
