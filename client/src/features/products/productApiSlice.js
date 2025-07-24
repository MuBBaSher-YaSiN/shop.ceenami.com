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
    createProduct: builder.mutation({
      query: (newProduct) => ({
       url: "/products",
       method: "POST",
      body: newProduct,
      }),
     invalidatesTags: ["Product"]
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation
} = productApi;
