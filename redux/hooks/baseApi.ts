import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_BASE_URL, TOKEN_KEY } from "@/lib/constants";

// Rappio-style logic to trigger a store-wide logout
const logoutAction = () => ({ type: "auth/logout" });

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get(TOKEN_KEY);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // If 401 (Unauthorized), attempt to refresh the token
  if (result.error?.status === 401) {
    // Note: The refreshToken is typically sent automatically as an HttpOnly cookie if set correctly by backend.
    // However, if the backend expects it in the body for /refresh-token (like Rappio), we handle it here.
    
    // Attempt to refresh the access token
    const refreshResult: any = await rawBaseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data?.data?.accessToken) {
      const newToken = refreshResult.data.data.accessToken;
      
      // Update the access token cookie
      Cookies.set(TOKEN_KEY, newToken, { expires: 7 });

      // Retry the original failed request with the new token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, log the user out
      api.dispatch(logoutAction());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["User", "Product", "Order", "Cart", "Category", "Coupon"],
  endpoints: () => ({}),
});
