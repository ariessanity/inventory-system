import { api } from "../base-query-api";
import { Category } from "./types";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (data) => {
        return {
          url: `category/api/createCategory`,
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    getAllCategorys: builder.query<
      { categories: Category[]; count: number },
      string | undefined
    >({
      query: (searchParams = "") => {
        return {
          url: `category/api/getAllCategory${searchParams}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: { data: { categories: Category[]; count: number } },
        meta,
        arg
      ) => response.data,
      providesTags: ["Category", "Transaction"],
    }),

    updateCategory: builder.mutation<Category, Partial<Category>>({
      query: (data) => {
        return {
          url: `category/api/updateCategory/${data._id}`,
          method: "PUT",
          data: data,
        };
      },
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<Category, string | undefined>({
      query: (id) => {
        return {
          url: `category/api/deleteCategory/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategorysQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
