// src/app/customFetchBase.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include", // needed for refreshToken cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // ⛔ Unauthorized – try to refresh the token
    const refreshResult = await baseQuery("/auth/refresh-token", api, extraOptions);

    if (refreshResult?.data?.accessToken) {
      api.dispatch(setCredentials(refreshResult.data));

      // ✅ Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
      toast.info("⛔ Token expired — refreshing...");
    } else {
      // ❌ Refresh failed – logout user
      api.dispatch(logout());
    }
  }

  return result;
};
