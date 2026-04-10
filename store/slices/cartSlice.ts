import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { SHIPPING_COST, SHIPPING_THRESHOLD, TAX_RATE } from '@/lib/constants';

export interface Coupon {
  id: string;
  code: string;
  discount: number; // percentage
  minAmount: number;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discount: number;
  isOpen: boolean;
  validCoupons: Coupon[];
}

const calculateSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.subtotal, 0);

const initialState: CartState = {
  items: [],
  couponCode: null,
  discount: 0,
  isOpen: false,
  validCoupons: [
    { id: '1', code: 'BEEVORA25', discount: 25, minAmount: 100 },
    { id: '2', code: 'SAVE10', discount: 10, minAmount: 0 },
    { id: '3', code: 'WELCOME50', discount: 50, minAmount: 200 },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      const { product, quantity } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
        existing.subtotal = existing.quantity * product.price;
      } else {
        state.items.push({
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          subtotal: product.price * quantity,
        });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.items.find((i) => i.product.id === action.payload.productId);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== action.payload.productId);
        } else {
          item.quantity = action.payload.quantity;
          item.subtotal = item.product.price * action.payload.quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.couponCode = null;
      state.discount = 0;
    },
    applyCoupon(state, action: PayloadAction<string>) {
      const subtotal = calculateSubtotal(state.items);
      const coupon = state.validCoupons.find(c => c.code === action.payload.toUpperCase());
      if (coupon && subtotal >= coupon.minAmount) {
        state.couponCode = coupon.code;
        state.discount = (subtotal * coupon.discount) / 100;
      }
    },
    // Admin management reducers
    adminAddCoupon(state, action: PayloadAction<Coupon>) {
      state.validCoupons.push(action.payload);
    },
    adminDeleteCoupon(state, action: PayloadAction<string>) {
      state.validCoupons = state.validCoupons.filter(c => c.id !== action.payload);
    },
    removeCoupon(state) {
      state.couponCode = null;
      state.discount = 0;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state: { cart: CartState }) => calculateSubtotal(state.cart.items);
export const selectCartTotal = (state: { cart: CartState }) => {
  const subtotal = calculateSubtotal(state.cart.items);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  return subtotal + shipping + tax - state.cart.discount;
};
export const selectCartSummary = (state: { cart: CartState }) => {
  const subtotal = calculateSubtotal(state.cart.items);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax - state.cart.discount;
  return { subtotal, shipping, tax, discount: state.cart.discount, total };
};

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  toggleCart,
  closeCart,
  adminAddCoupon,
  adminDeleteCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
