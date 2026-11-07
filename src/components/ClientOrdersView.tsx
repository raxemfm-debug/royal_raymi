import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, Clock, CheckCircle2, Truck, XCircle, MessageCircle, ArrowLeft } from 'lucide-react';

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  status: string;
  customer_name: string;
  shipping_address?: string;
  city?: string;
  items?: OrderItem[];
}

export function ClientOrdersView({ onBackToStore }: { onBackToStore: () => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetchClientOrders();
  }, []);

  const fetchClientOrders = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserEmail(user.email || '');

      // Traer órdenes del cliente autenticado
      const { data: ordersData, error: ordersErr } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersErr) throw ordersErr;

      // Traer los items de cada orden
      if (ordersData && ordersData.length > 0) {
        const orderIds = ordersData.map(o => o.id);
        const { data: itemsData } = await supabase
          .from('order_items')
          .select('*')
          .in('order_id', orderIds);

        const merged = ordersData.map(order => ({
          ...order,
          items: (itemsData || []).filter(item => item.order_id === order.id)
        }));
        setOrders(merged);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completado':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-sans text-xs font-medium text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={13} /> Completado
          </span>
        );
      case 'enviado':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 font-sans text-xs font-medium text-blue-700 border border-blue-200">
            <Truck size={13} /> En camino
          </span>
        );
      case 'cancelado':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 font-sans text-xs font-medium text-rose-700 border border-rose-200">
            <XCircle size={13} /> Cancelado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-sans text-xs font-medium text-amber-700 border border-amber-200">
            <Clock size={13} /> Pendiente
          </span>
        );
    }
  };

  const handleWhatsAppConsult = (order: Order) => {
    const code = order.id.slice(0, 8).toUpperCase();
    const message = `Hola Royal Raymi, deseo consultar el estado de mi pedido #PED-${code} realizado por ${order.customer_name}.`;
    window.open(`https://wa.me/51967179747?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Cabecera */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={onBackToStore}
              className="mb-2 inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] hover:text-[#2C1810] transition-colors"
            >
              <ArrowLeft size={14} /> Volver a la Tienda
            </button>
            <h1 className="font-serif text-3xl font-light text-[#2C1810] sm:text-4xl">
              Mis Pedidos
            </h1>
            <p className="mt-1 font-sans text-xs text-[#8C7A6B]">
              Sesión iniciada como: <span className="font-medium text-[#2C1810]">{userEmail}</span>
            </p>
          </div>
          <button
            onClick={onBackToStore}
            className="rounded-full bg-[#2C1810] px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#B58A52] transition-colors"
          >
            Seguir Comprando
          </button>
        </div>

        {/* Lista de Pedidos */}
        {loading ? (
          <div className="rounded-2xl border border-[#EFE8DF] bg-white p-12 text-center">
            <p className="font-serif text-base italic text-[#8C7A6B]">Cargando tus pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-[#EFE8DF] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7F2] text-[#B58A52]">
              <Package size={28} />
            </div>
            <h3 className="mt-4 font-serif text-xl text-[#2C1810]">Aún no tienes pedidos registrados</h3>
            <p className="mx-auto mt-2 max-w-sm font-sans text-xs leading-relaxed text-[#8C7A6B]">
              Los pedidos o cotizaciones que realices se registrarán aquí con su detalle y seguimiento.
            </p>
            <button
              onClick={onBackToStore}
              className="mt-6 rounded-full bg-[#B58A52] px-7 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#2C1810] transition-colors"
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const code = order.id.slice(0, 8).toUpperCase();
              const date = new Date(order.created_at).toLocaleDateString('es-PE', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              });

              return (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-[#EFE8DF] bg-white shadow-sm transition-all hover:border-[#B58A52]/40"
                >
                  <div className="border-b border-[#FAF7F2] bg-[#FAF7F2]/60 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#8C7A6B]">
                        Pedido #{code}
                      </span>
                      <p className="font-sans text-xs text-[#2C1810]">{date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                      <span className="font-serif text-lg font-medium text-[#2C1810]">
                        S/ {Number(order.total).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Items del pedido */}
                  <div className="p-6">
                    <ul className="divide-y divide-stone-100 mb-5">
                      {order.items?.map((item) => (
                        <li key={item.id} className="py-2.5 flex items-center justify-between text-xs font-sans">
                          <span className="text-[#2C1810]">
                            <strong className="text-[#B58A52]">{item.quantity}x</strong> {item.product_name}
                          </span>
                          <span className="text-[#8C7A6B]">
                            S/ {Number(item.subtotal).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Acciones */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#FAF7F2] pt-4">
                      <span className="font-sans text-[11px] text-[#8C7A6B]">
                        {order.shipping_address ? `Entrega en: ${order.shipping_address}, ${order.city}` : ''}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleWhatsAppConsult(order)}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 font-sans text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
                      >
                        <MessageCircle size={15} />
                        Consultar pedido por WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
