import { api } from "../base-query-api";
import { Product } from "./types";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (data) => {
        return {
          url: `product/api/createProduct`,
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: ["Product"],
    }),

    getAllProducts: builder.query<
      { products: Product[]; count: number },
      string | undefined
    >({
      query: (searchParams = "") => {
        return {
          url: `product/api/getAllProducts${searchParams}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: { data: { products: Product[]; count: number } },
        meta,
        arg
      ) => response.data,
      providesTags: ["Product", "Transaction"],
    }),

    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (data) => {
        return {
          url: `product/api/updateProduct/${data._id}`,
          method: "PUT",
          data: data,
        };
      },
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<Product, string | undefined>({
      query: (id) => {
        return {
          url: `product/api/deleteProduct/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
