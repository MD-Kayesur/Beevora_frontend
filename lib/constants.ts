export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const APP_NAME = 'Beevora';
export const APP_DESCRIPTION = 'Premium B2B & B2C eCommerce Platform';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const TOKEN_KEY = 'beevora_token';
export const USER_KEY = 'beevora_user';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  USER_DASHBOARD: '/dashboard/user',
  USER_ORDERS: '/dashboard/user/orders',
  USER_PROFILE: '/dashboard/user/profile',
  ADMIN_DASHBOARD: '/dashboard/admin',
  ADMIN_PRODUCTS: '/dashboard/admin/products',
  ADMIN_ORDERS: '/dashboard/admin/orders',
  ADMIN_USERS: '/dashboard/admin/users',
} as const;

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing & Fashion',
  'Home & Garden',
  'Sports & Outdoors',
  'Books & Media',
  'Beauty & Health',
  'Automotive',
  'Toys & Games',
] as const;

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Most Popular', value: 'popular' },
] as const;

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  refunded: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export const ITEMS_PER_PAGE = 12;
export const SHIPPING_THRESHOLD = 100;
export const FREE_SHIPPING_MESSAGE = `Free shipping on orders over $${SHIPPING_THRESHOLD}`;
export const TAX_RATE = 0.08;
export const SHIPPING_COST = 9.99;
