// src/features/product/productApiSlice.js
import { apiSlice } from "../api/apiSlice"; // shared api slice

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    // Add more endpoints like createProduct, deleteProduct, etc.
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  // other hooks...
} = productApi;
