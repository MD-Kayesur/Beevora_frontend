import { baseApi } from "@/redux/hooks/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, any>({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),
    getMyOrders: builder.query<any, any>({
      query: (params) => ({
        url: "/orders/my",
        method: "GET",
        params,
      }),
      providesTags: ["Order"],
    }),
    getOrderById: builder.query<any, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    cancelOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Order", id }, "Order"],
    }),
    // Admin
    getAllOrders: builder.query<any, any>({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params,
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }, "Order"],
    }),
    deleteOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
