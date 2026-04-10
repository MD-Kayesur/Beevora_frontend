import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginCredentials, RegisterCredentials } from '@/types/user';
import { authAPI, userAPI } from '@/lib/api';
import { TOKEN_KEY, USER_KEY } from '@/lib/constants';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  mockUsers: User[];
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  mockUsers: [],
  token: Cookies.get(TOKEN_KEY) || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(credentials);
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await authAPI.getProfile();
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
  }
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateProfile(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

export const adminUpdateUserRole = createAsyncThunk(
  'auth/updateUserRole',
  async ({ id, role }: { id: string; role: any }, { rejectWithValue }) => {
    try {
      const response = await userAPI.update(id, { role });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

export const adminDeleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await userAPI.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove(TOKEN_KEY);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(USER_KEY);
      }
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isAuthenticated = true;
        
        // Set cookies with a 7-day expiration (customizable)
        Cookies.set(TOKEN_KEY, action.payload.data.accessToken, { expires: 7 });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem(USER_KEY, JSON.stringify(action.payload.data.user));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(adminUpdateUserRole.fulfilled, (state, action) => {
        const index = state.mockUsers.findIndex(u => (u as any)._id === action.payload._id || u.id === action.payload._id);
        if (index !== -1) state.mockUsers[index] = action.payload;
      })
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        state.mockUsers = state.mockUsers.filter(u => (u as any)._id !== action.payload && u.id !== action.payload);
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
