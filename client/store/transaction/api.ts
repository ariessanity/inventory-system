import { api } from "../base-query-api";
import { Transaction } from "./types";

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
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useCreateTransactionMutation } = transactionApi;
