import { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const tokenInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config: any) => {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers = {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${token}`,
      };
    } else {
      delete config.headers?.Authorization;
    }
    return config;
  });
};
