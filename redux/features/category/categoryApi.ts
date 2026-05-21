import { baseApi } from "@/redux/hooks/baseApi";

export interface ICategory {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ({ url: "/categories", method: "GET" }),
      transformResponse: (response: any) =>
        (response.data || []).map((cat: any) => ({ ...cat, id: cat.id || cat._id })),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    createCategory: builder.mutation<{ success: boolean; data: ICategory }, Partial<ICategory>>({
      query: (data) => ({ url: "/categories", method: "POST", body: data }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: builder.mutation<{ success: boolean; data: ICategory }, { id: string; updates: Partial<ICategory> }>({
      query: ({ id, updates }) => ({ url: `/categories/${id}`, method: "PATCH", body: updates }),
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }, { type: "Category", id: "LIST" }],
    }),
    deleteCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
