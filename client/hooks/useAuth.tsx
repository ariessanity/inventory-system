import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useLoginMutation, useLogoutMutation } from "@/store/user/api";
import { User } from "@/store/user/types";
// import { ACCESS } from '@constants/constants'

const useAuth = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const handleLogin = async (username: string, password: string) => {
    const { data, error }: any = await login({ username, password });

    if (error) {
      throw new Error(error?.data?.message);
    }

    if (data?.accessToken) {
      Cookies.set("authorized", "true");
      Cookies.set("jwt", data?.accessToken);
      Cookies.set("role", data?.role);

      router.push("/dashboard");
    }
  };

  const handleLogout = async () => {
    try {
      const { data }: any = await logout({});

      if (data.accessToken == null) {
        const cookieKeys = Object.keys(Cookies.get());
        cookieKeys.forEach((key) => {
          Cookies.remove(key);
        });

        router.push("/login");
      } else {
        throw new Error();
      }
    } catch (error) {}
  };

  return { handleLogin, handleLogout };
};

export default useAuth;
