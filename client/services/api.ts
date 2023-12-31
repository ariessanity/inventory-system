import axios from "axios";
import { tokenInterceptor } from "./interceptors/token";
import { redirectLoginInterceptor } from "./interceptors/redirect-login";
import { withUserAgent } from "./interceptors/withUserAgent";

export const fetchData = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

tokenInterceptor(fetchData);
redirectLoginInterceptor(fetchData);
withUserAgent(fetchData);
