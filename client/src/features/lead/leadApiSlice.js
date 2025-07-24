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
    getLeads: builder.query({
      query: () => "/leads",
      providesTags: ["Leads"],
    }),
  }),
});
export const { useSubmitLeadMutation, useGetLeadsQuery } = leadApiSlice;
