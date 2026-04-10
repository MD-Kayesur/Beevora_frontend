import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "@/types/user";
import { TOKEN_KEY, USER_KEY } from "@/lib/constants";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: Cookies.get(USER_KEY) ? JSON.parse(Cookies.get(USER_KEY)!) : null,
  token: Cookies.get(TOKEN_KEY) || null,
  isAuthenticated: !!Cookies.get(TOKEN_KEY),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      
      Cookies.set(TOKEN_KEY, token, { expires: 7 });
      Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove(TOKEN_KEY);
      Cookies.remove(USER_KEY);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      Cookies.set(USER_KEY, JSON.stringify(action.payload), { expires: 7 });
    }
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
