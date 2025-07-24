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
    console.warn(" First request failed with 401:", result);

    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions,
    );
    console.log("🔁 Refresh token result:", refreshResult);

    if (refreshResult?.data?.accessToken) {
      api.dispatch(setCredentials(refreshResult.data));
      toast.dismiss(); // close old toasts
      toast.info(" Session refreshed");

      // Retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());

      return {
        error: {
          status: refreshResult?.error?.status || 403,
          data: refreshResult?.error?.data || { message: "Refresh failed" },
        },
      };
    }
  }

  return result;
};
