import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY } from './constants';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor — attach auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove(TOKEN_KEY);
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth endpoints
export const authAPI = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { name: string; email: string; password: string }) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data: object) => api.patch('/auth/profile', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) => api.patch('/auth/change-password', data),
};

// Product endpoints
export const productAPI = {
  getAll: (params?: object) => api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: FormData) => api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) =>
    api.patch(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  getReviews: (id: string) => api.get(`/products/${id}/reviews`),
  addReview: (id: string, data: { rating: number; comment: string }) => api.post(`/products/${id}/reviews`, data),
};

// Order endpoints
export const orderAPI = {
  create: (data: object) => api.post('/orders', data),
  getMyOrders: (params?: object) => api.get('/orders/my', { params }),
  getById: (id: string) => api.get(`/orders/${id}`),
  cancel: (id: string) => api.patch(`/orders/${id}/cancel`),
  // Admin
  getAll: (params?: object) => api.get('/orders', { params }),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/orders/${id}`),
};

// User endpoints (admin)
export const userAPI = {
  getAll: (params?: object) => api.get('/users', { params }),
  getById: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: object) => api.patch(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Cart endpoints
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data: { productId: string; quantity: number }) => api.post('/cart/add', data),
  update: (itemId: string, quantity: number) => api.patch(`/cart/${itemId}`, { quantity }),
  remove: (itemId: string) => api.delete(`/cart/${itemId}`),
  clear: () => api.delete('/cart'),
  applyCoupon: (code: string) => api.post('/cart/coupon', { code }),
};

// Coupon endpoints
export const couponAPI = {
  getAll: () => api.get('/coupons'),
  validate: (code: string) => api.get(`/coupons/validate/${code}`),
  create: (data: object) => api.post('/coupons', data),
  update: (id: string, data: object) => api.patch(`/coupons/${id}`, data),
  delete: (id: string) => api.delete(`/coupons/${id}`),
};
