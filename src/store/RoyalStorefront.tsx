import type { Product as ProductItem } from '../data/products';
import CartDrawer from './CartDrawer';
import ShopCatalog from './ShopCatalog';
import ProductDetailPage from './ProductDetailPage';
import { lookupProduct } from './productAdapter';
import { navigateShop, useShopPath } from './navigation';
import type { AddCallback } from './useProductActions';

/**
 * Montar como vista de Tienda dentro de App.tsx.
 * Rutas soportadas: /tienda y /producto/:slug (historial y recarga con rewrite de Vercel).
 * Se mantiene el Navbar/Footer existentes de Royal Raymi fuera de este componente.
 */
export function RoyalStorefront({ products, onAddToCart, showCart = true }: { products: ProductItem[]; onAddToCart?: AddCallback; showCart?: boolean }) {
  const pathname = useShopPath();
  const slug = pathname.startsWith('/producto/') ? pathname.slice('/producto/'.length).split('/')[0] : null;
  const product = slug ? lookupProduct(products, slug) : undefined;
  return <div className="min-h-screen bg-[#FAF7F2]">
    {showCart && !onAddToCart && <div className="flex justify-end border-b border-[#E7DDD3] bg-[#FAF7F2] px-5 py-3 sm:px-8"><CartDrawer/></div>}
    {slug ? product ? <ProductDetailPage key={slug} product={product} onAddToCart={onAddToCart}/> :
      <main className="mx-auto max-w-5xl px-6 py-24 text-center"><h1 className="mb-3 font-serif text-4xl text-[#3B241C]">Producto no encontrado</h1><p className="mb-7 text-[#816F60]">Comprueba la dirección o regresa al catálogo.</p><button onClick={() => navigateShop('/tienda')} className="rounded-lg bg-[#3B241C] px-6 py-3 text-white">Volver a la tienda</button></main> :
      <ShopCatalog products={products} onAddToCart={onAddToCart}/>}
  </div>;
}
export default RoyalStorefront;
