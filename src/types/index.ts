export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: "Chocolates" | "Café" | "Grageas" | "Bombones" | "Polvos y Pastas" | "Licores" | "Especialidades" | string;
  cacao_percent?: number;
  format?: string;
  origin: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
}

export interface ReservationData {
  product: ProductItem;
  store: string;
  clientName: string;
  clientPhone: string;
  pickupDate: string;
  pickupTime: string;
}