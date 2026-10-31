import { useEffect, useState } from 'react';

/** Navegación interna sin dependencias: compatible con Vite y el historial del navegador. */
export function navigateShop(path: string) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== path) window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('royal-shop-route'));
  window.scrollTo({ top: 0, behavior: 'auto' });
}
export function useShopPath(): string {
  const [path, setPath] = useState(() => typeof window === 'undefined' ? '/tienda' : window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    window.addEventListener('royal-shop-route', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('royal-shop-route', update);
    };
  }, []);
  return path;
}
