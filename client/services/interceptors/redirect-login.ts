import { AxiosInstance } from "axios";
import router from "next/router";
import Cookies from "js-cookie";

export const redirectLoginInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (reject) => {
      if (reject.response?.status === 401) {
        const cookieKeys = Object.keys(Cookies.get());
        cookieKeys.forEach((key) => {
          Cookies.remove(key);
        });
        router.replace("/login");
      }

      if (reject.response?.status === 403) {
        router.replace("/dashboard");
      }

      if (reject.response?.status === 420) {
        if (Cookies.get("authorized")) {
          alert(
            `${reject.response?.data.response.issue} \n ${reject.response?.data.response.resolution}`
          );
        }

        const cookieKeys = Object.keys(Cookies.get());
        cookieKeys.forEach((key) => {
          Cookies.remove(key);
        });

        router.replace("/login");
      }

      return Promise.reject(reject);
    }
  );
};
