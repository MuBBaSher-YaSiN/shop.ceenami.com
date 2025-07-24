import { apiSlice } from "../api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),
    getAllOrders: builder.query({
      query: () => "/orders/admin",
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery } = orderApiSlice;
