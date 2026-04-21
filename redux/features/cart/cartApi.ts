import { baseApi } from "@/redux/hooks/baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<any, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<any, { productId: string; quantity: number }>({
      query: (data) => ({
        url: "/cart/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<any, { itemId: string; quantity: number }>({
      query: ({ itemId, quantity }) => ({
        url: `/cart/${itemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<any, string>({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<any, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    applyCoupon: builder.mutation<any, string>({
      query: (code) => ({
        url: "/cart/coupon",
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useApplyCouponMutation,
} = cartApi;
