// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApiSlice";
import { apiSlice } from "../features/api/apiSlice"; // 👈 new import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,     // 🔒 Auth API
    [apiSlice.reducerPath]: apiSlice.reducer,   // 📦 Shared APIs (products, cart, etc.)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      apiSlice.middleware
    ),
});
