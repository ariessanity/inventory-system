import { api } from "../base-query-api";

export const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    reportDownload: builder.mutation<any, any>({
      query: (data: any) => {
        return {
          url: `file/report/download`,
          method: "POST",
          responseType: "blob",
          data: data,
        };
      },
    }),

    reportProductSold: builder.mutation<any, any>({
      query: ({ data, query }) => {
        return {
          url: `file/report/dlProductSoldReport${query}`,
          method: "POST",
          responseType: "blob",
          data: data,
        };
      },
      invalidatesTags: ["Transaction"],
    }),

    reportTransactionHistory: builder.mutation<any, any>({
      query: ({ data, query }) => {
        return {
          url: `file/report/dlTransactionHistoryReport${query}`,
          method: "POST",
          responseType: "blob",
          data: data,
        };
      },
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const { useReportDownloadMutation, useReportProductSoldMutation, useReportTransactionHistoryMutation } =
  fileApi;
