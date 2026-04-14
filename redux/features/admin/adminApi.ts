import { baseApi } from "@/redux/hooks/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
      query: () => "/admin/dashboard-stats",
      providesTags: ["Order", "Product", "User"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = adminApi;
