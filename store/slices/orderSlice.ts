import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, CreateOrderPayload, OrdersResponse } from '@/types/order';
import { orderAPI } from '@/lib/api';

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  total: 0,
  page: 1,
  totalPages: 1,
  isLoading: false,
  isCreating: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (payload: CreateOrderPayload, { rejectWithValue }) => {
    try {
      const response = await orderAPI.create(payload);
      return response.data.data as Order;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to create order');
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMy',
  async (params: { page?: number; limit?: number } | undefined, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getMyOrders(params);
      return response.data.data as OrdersResponse;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (params: object | undefined, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getAll(params);
      return response.data.data as OrdersResponse;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getById(id);
      return response.data.data as Order;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Order not found');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancel',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderAPI.cancel(id);
      return response.data.data as Order;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Failed to cancel order');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await orderAPI.updateStatus(id, status);
      return response.data.data as Order;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

export const adminDeleteOrder = createAsyncThunk(
  'orders/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await orderAPI.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.isCreating = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isCreating = false;
        state.selectedOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyOrders.pending, (state) => { state.isLoading = true; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllOrders.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => (o as any)._id === action.payload.id || o.id === action.payload.id);
        if (idx !== -1) state.orders[idx] = action.payload;
        if (state.selectedOrder?.id === action.payload.id) state.selectedOrder = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const idx = state.orders.findIndex((o) => (o as any)._id === (action.payload as any)._id || o.id === (action.payload as any)._id);
        if (idx !== -1) state.orders[idx] = action.payload;
      })
      .addCase(adminDeleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(o => (o as any)._id !== action.payload && o.id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { clearSelectedOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;
