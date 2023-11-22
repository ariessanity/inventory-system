import { api } from "../base-query-api";
import { DashboardStatistics } from "./types";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<DashboardStatistics, void>({
      query: () => {
        return {
          url: `dashboard/api/getStatistics`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: DashboardStatistics }, meta, arg) => response.data,
      providesTags: ["Product", "Transaction"],
    }),
  }),
});

export const { useGetStatisticsQuery } = productApi;
