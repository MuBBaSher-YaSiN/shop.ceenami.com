// src/features/auth/authApiSlice.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../app/customFetchBase"; //  updated path

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery, //  use custom base query with auto-refresh
  tagTypes: ["Auth", "Users"],
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: builder.query({
  query: () => ({
    url: "/auth/refresh-token",
    method: "POST",
    credentials: "include",
  }),
}),
deleteUser: builder.mutation({
  query: (id) => ({
    url: `/users/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Users"],
}),

updateUser: builder.mutation({
  query: ({ id, data }) => ({
    url: `/users/${id}`,
    method: "PUT",
    body: data,
  }),
  invalidatesTags: ["Users"],
}),


 


    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyRefreshTokenQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLogoutMutation,
} = authApi;
