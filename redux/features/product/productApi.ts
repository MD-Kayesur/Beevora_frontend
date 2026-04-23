import { baseApi } from "@/redux/hooks/baseApi";
import { Product, ProductsResponse, ProductFilter } from "@/types/product";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductFilter | void>({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params: params || {},
      }),
      transformResponse: (response: any) => {
        return {
          products: (response.data || []).map((product: any) => ({
            ...product,
            id: product.id || product._id,
          })),
          total: response.meta?.total || 0,
          page: response.meta?.page || 1,
          limit: response.meta?.limit || 10,
          totalPages: response.meta?.totalPages || 1,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: any) => {
        const product = response.data;
        return {
          ...product,
          id: product.id || product._id,
        };
      },
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<{ success: boolean; data: Product }, Partial<Product>>({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<{ success: boolean; data: Product }, { id: string; updates: Partial<Product> }>({
      query: ({ id, updates }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
    deleteProduct: builder.mutation<{ success: boolean; data: any }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    getHoney: builder.query<ProductsResponse, ProductFilter | void>({
      query: (params) => ({
        url: "/honey",
        method: "GET",
        params: params || {},
      }),
      transformResponse: (response: any) => {
        return {
          products: (response.data || []).map((product: any) => ({
            ...product,
            id: product.id || product._id,
          })),
          total: response.meta?.total || 0,
          page: response.meta?.page || 1,
          limit: response.meta?.limit || 10,
          totalPages: response.meta?.totalPages || 1,
        };
      },
      providesTags: ["Product"],
    }),
    getClothing: builder.query<ProductsResponse, ProductFilter | void>({
      query: (params) => ({
        url: "/clothing",
        method: "GET",
        params: params || {},
      }),
      transformResponse: (response: any) => {
        return {
          products: (response.data || []).map((product: any) => ({
            ...product,
            id: product.id || product._id,
          })),
          total: response.meta?.total || 0,
          page: response.meta?.page || 1,
          limit: response.meta?.limit || 10,
          totalPages: response.meta?.totalPages || 1,
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetHoneyQuery,
  useGetClothingQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
