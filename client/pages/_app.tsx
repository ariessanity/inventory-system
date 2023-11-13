import Sidebar from "@/components/Layout/Sidebar";
import { Providers } from "@/store/provider";
import "@/styles/globals.css";
import { getLayout } from "@/utils/get-layout";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const WrapperLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();

  const Layout = getLayout(pathname);

  return <Layout>{children}</Layout>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Providers>
        <WrapperLayout>
          <Component {...pageProps} />
        </WrapperLayout>
      </Providers>
    </ChakraProvider>
  );
}
