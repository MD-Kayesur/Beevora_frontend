import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilter, ProductsResponse } from '@/types/product';
import { productAPI } from '@/lib/api';

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  selectedProduct: Product | null;
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  isLoadingDetail: boolean;
  error: string | null;
  filters: ProductFilter;
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  selectedProduct: null,
  total: 0,
  page: 1,
  totalPages: 1,
  isLoading: false,
  isLoadingDetail: false,
  error: null,
  filters: {},
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params: ProductFilter | undefined, { rejectWithValue }) => {
    try {
      const response = await productAPI.getAll(params);
      return response.data as { data: ProductsResponse };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productAPI.getById(id);
      return response.data.data as Product;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Product not found');
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async (_, { rejectWithValue }) => {
  try {
    const response = await productAPI.getAll({ isFeatured: true, limit: 8 } as ProductFilter & { isFeatured?: boolean; limit?: number });
    return response.data.data.products as Product[];
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch featured products');
  }
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await productAPI.create(data);
      return response.data.data as Product;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, updates }: { id: string; updates: any }, { rejectWithValue }) => {
    try {
      const response = await productAPI.update(id, updates);
      return response.data.data as Product;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await productAPI.delete(id);
      return id;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to delete product');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<ProductFilter>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = {};
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload?.data?.products || [];
        state.total = action.payload?.data?.total || 0;
        state.page = action.payload?.data?.page || 1;
        state.totalPages = action.payload?.data?.totalPages || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoadingDetail = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoadingDetail = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.total += 1;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id || (p as any)._id === (action.payload as any)._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload && (p as any)._id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { 
  setFilters, 
  clearFilters, 
  clearSelectedProduct, 
  clearError,
} = productSlice.actions;
export default productSlice.reducer;
