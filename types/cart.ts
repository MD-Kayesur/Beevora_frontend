import { Product } from './product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface UpdateCartPayload {
  itemId: string;
  quantity: number;
}
