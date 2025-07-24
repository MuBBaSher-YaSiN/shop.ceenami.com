// src/features/cart/cartApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart", // GET /api/cart
      providesTags: ["Cart"],
    }),
    //    addToCart: builder.mutation({
    //   query: ({ productId, quantity, price }) => ({
    //     url: "/cart",
    //     method: "POST",
    //     body: {
    //       products: [
    //         {
    //           productId,
    //           quantity,
    //           price,
    //         },
    //       ],
    //       totalAmount: price * quantity,
    //     },
    //   }),
    //   invalidatesTags: ["Cart"],
    // }),

    deleteFromCart: builder.mutation({
      query: (cartItemId) => ({
        url: `/cart/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    // src/features/cart/cartApiSlice.js

    updateCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/cart",
        method: "PUT",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  // useAddToCartMutation,
  useUpdateCartMutation,
  useDeleteFromCartMutation,
} = cartApiSlice;
