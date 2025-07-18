// src/features/api/apiSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../app/customFetchBase"; // 👈 reuse existing

export const apiSlice = createApi({
  reducerPath: "api", // shared reducer path
  baseQuery: customBaseQuery, // 🔄 handles auto-refresh logic
  tagTypes: ["Product", "Cart", "Order", "Users"], // expandable
  endpoints: () => ({}), // inject endpoints from features
});
