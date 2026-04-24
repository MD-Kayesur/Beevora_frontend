import { baseApi } from "@/redux/hooks/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;
