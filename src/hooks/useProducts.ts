import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { ProductItem } from "../types";

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: "rr-01",
    slug: "chocolate-70-cacao-vraem",
    name: "Chocolate Bitter 70% Cacao",
    category: "Chocolates",
    cacao_percent: 70,
    format: "Tableta 100g",
    origin: "VRAEM, Ayacucho",
    description: "Cacao fino de aroma seleccionado con notas a frutos secos y tostado medio.",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: "rr-02",
    slug: "chocolate-85-cacao-intenso",
    name: "Chocolate Intenso 85% Cacao",
    category: "Chocolates",
    cacao_percent: 85,
    format: "Tableta 100g",
    origin: "VRAEM, Ayacucho",
    description: "Para paladares exigentes. Pura potencia de cacao nativo con baja acidez.",
    imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: "rr-03",
    slug: "cafe-gourmet-grano-entero",
    name: "Café Gourmet Grano Seleccionado",
    category: "Café",
    format: "Bolsa 250g",
    origin: "VRAEM / Selva Alta",
    description: "Café arábica de altura con fragancia floral, cuerpo balanceado y notas cítricas.",
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    featured: true
  },
  {
    id: "rr-04",
    slug: "nibs-cacao-organico",
    name: "Nibs de Cacao Fino Tostado",
    category: "Polvos y Nibs",
    cacao_percent: 100,
    format: "Frasco 150g",
    origin: "VRAEM, Ayacucho",
    description: "Trozos crocantes de semilla de cacao puro tostado, ideal para repostería o degustación.",
    imageUrl: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80"
  }
];

export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!isSupabaseConfigured) {
        // Carga inmediata de respaldo si aún no se enlaza Supabase
        setProducts(FALLBACK_PRODUCTS);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: sbError } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: true });

        if (sbError) throw sbError;

        if (data && data.length > 0) {
          const mapped: ProductItem[] = data.map((item: any) => ({
            id: String(item.id),
            slug: item.slug || `producto-${item.id}`,
            name: item.name || item.nombre,
            category: item.category || item.categoria || "Chocolates",
            cacao_percent: item.cacao_percent || item.porcentaje_cacao,
            format: item.format || item.presentacion,
            origin: item.origin || item.origen || "VRAEM, Ayacucho",
            description: item.description || item.descripcion || "",
            imageUrl: item.image_url || item.imageUrl || "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
            price: item.price !== undefined ? Number(item.price) : undefined,
            featured: Boolean(item.featured || item.destacado),
          }));
          setProducts(mapped);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (err: any) {
        console.warn("Supabase no disponible, usando catálogo local:", err);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error, refetch: () => setLoading(true) };
}
