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
    }),

    logout: builder.mutation<User, Partial<User>>({
      query: () => {
        return {
          url: `api/auth/logout`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation} = authApi;
