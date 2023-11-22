import { api } from "../base-query-api";
import { Supplier } from "./types";

export const supplierApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation<Supplier, Partial<Supplier>>({
      query: (data) => {
        return {
          url: `supplier/api/createSupplier`,
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: ["Supplier"],
    }),

    getAllSuppliers: builder.query<
      { suppliers: Supplier[]; count: number },
      string | undefined
    >({
      query: (searchParams = "") => {
        return {
          url: `supplier/api/getAllSuppliers${searchParams}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: { data: { suppliers: Supplier[]; count: number } },
        meta,
        arg
      ) => response.data,
      providesTags: ["Supplier", "Transaction"],
    }),

    updateSupplier: builder.mutation<Supplier, Partial<Supplier>>({
      query: (data) => {
        return {
          url: `supplier/api/updateSupplier/${data._id}`,
          method: "PUT",
          data: data,
        };
      },
      invalidatesTags: ["Supplier"],
    }),

    deleteSupplier: builder.mutation<Supplier, string | undefined>({
      query: (id) => {
        return {
          url: `supplier/api/deleteSupplier/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetAllSuppliersQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
