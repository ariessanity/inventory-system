import { fetchData } from "@/services/api";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";

const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    responseType?: AxiosRequestConfig["responseType"];
  },
  unknown,
  unknown
> = async ({ url, method, data, responseType }) => {
  try {
    const isFormData = data instanceof FormData;
    const headers: Record<string, string> = {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };

    const result = await fetchData[
      method?.toLowerCase() as "post" | "get" | "patch" | "put" | "delete"
    ]?.(url, data, { headers, responseType });

    return { data: result.data ?? {} };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};

export const TAG_TYPES = [
  "Auth",
  "Product",
  "Store",
  "User",
  "Category",
  "Cart",
  "Transaction",
  "Supplier"
];

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery,
  tagTypes: TAG_TYPES,
  endpoints: () => ({}),
});
