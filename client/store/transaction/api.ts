import { api } from "../base-query-api";
import { ProductSold, Transaction } from "./types";

export const transactionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation<Transaction, Partial<Transaction>>({
      query: (data) => {
        return {
          url: `transaction/api/createTransaction`,
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: ["Transaction", "Product"],
    }),

    getTransactionHistory: builder.query<
      { transactionHistory: Transaction[]; count: number },
      string | undefined
    >({
      query: (searchParams = "") => {
        return {
          url: `transaction/api/getTransactionHistory${searchParams}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: {
          data: { transactionHistory: Transaction[]; count: number };
        },
        meta,
        arg
      ) => response.data,
      providesTags: ["Transaction"],
    }),

    getProductSold: builder.query<
      { productSold: ProductSold[]; count: number },
      string | undefined
    >({
      query: (searchParams = "") => {
        return {
          url: `transaction/api/getProductSold${searchParams}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: {
          data: { productSold: ProductSold[]; count: number };
        },
        meta,
        arg
      ) => response.data,
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetTransactionHistoryQuery,
  useGetProductSoldQuery,
} = transactionApi;
