import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  isOpen: boolean;
}

const initialState: CartState = {
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
