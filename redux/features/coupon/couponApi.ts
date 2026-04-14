import { baseApi } from "@/redux/hooks/baseApi";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query<any, void>({
      query: () => "/coupons",
      providesTags: ["Coupon"],
    }),
    createCoupon: builder.mutation<any, any>({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    updateCoupon: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/coupons/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation<any, string>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
