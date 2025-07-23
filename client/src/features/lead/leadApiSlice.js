// features/lead/leadApiSlice.js
import { apiSlice } from "../api/apiSlice";

export const leadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitLead: builder.mutation({
      query: (formData) => ({
        url: "/leads",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitLeadMutation } = leadApiSlice;