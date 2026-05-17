import { baseApi } from "@/redux/hooks/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query<any, string>({
      query: (productId) => `/reviews/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Order" as const, id: `REVIEWS_${productId}` },
        "Order"
      ],
      transformResponse: (response: any) => response.data || [],
    }),
    createReview: builder.mutation<any, { productId: string; rating: number; comment: string; images?: string[] }>({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product" as const, id: productId },
        { type: "Product" as const, id: "LIST" },
        { type: "Order" as const, id: `REVIEWS_${productId}` },
      ],
    }),
  }),
});

export const { useGetProductReviewsQuery, useCreateReviewMutation } = reviewApi;
