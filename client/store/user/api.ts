import { api } from "../base-query-api";
import { User } from "./types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, Partial<User>>({
      query: (data) => {
        return {
          url: `api/auth/login`,
          method: "POST",
          data: data,
        };
      },

      transformResponse: (response: { data: User }, meta, arg) => response.data,
    }),

    signup: builder.mutation<User, Partial<User>>({
      query: (data) => {
        return {
          url: `api/auth/signup`,
          method: "POST",
          data: data,
        };
      },

      transformResponse: (response: { data: User }, meta, arg) => response.data,
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<User, Partial<User>>({
      query: () => {
        return {
          url: `api/auth/logout`,
          method: "POST",
        };
      },
    }),

    getAllUsers: builder.query<
      { users: User[]; count: number },
      string | undefined
    >({
      query: (searchParams = "") => {
        return {
          url: `api/auth/getAllUser${searchParams}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: { data: { users: User[]; count: number } },
        meta,
        arg
      ) => response.data,
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<User, Partial<User>>({
      query: (data) => {
        return {
          url: `api/auth/updateUser/${data._id}`,
          method: "PUT",
          data: data,
        };
      },
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<User, string | undefined>({
      query: (id) => {
        return {
          url: `api/auth/deleteUser/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} = authApi;
