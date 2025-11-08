export type ProductCategory = 
  | 'cold-press-oils' 
  | 'dry-fruits' 
  | 'seeds' 
  | 'rice' 
  | 'spices' 
  | 'honey' 
  | 'a2-ghee';

export type QuantityUnit = 'ml' | 'g' | 'kg';

export interface QuantityOption {
  value: number;
  unit: QuantityUnit;
  price: number;
}
export interface ProductImage {
  image: string; // ✅ this matches Django's API response structure
}
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  images: ProductImage[];
  quantities: QuantityOption[];
  in_stock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: QuantityOption;
  count: number;
}

export interface PromoCode {
  code: string;
  discount: number; // percentage
  active: boolean;
}
