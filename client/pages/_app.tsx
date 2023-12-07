import { Providers } from "@/store/provider";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { getLayout } from "@/utils/get-layout";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const WrapperLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();

  const Layout = getLayout(pathname);

  return <Layout>{children}</Layout>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Providers>
        <WrapperLayout>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,width=device-width,height=device-height,user-scalable=yes"
            />
          </Head>
          <Component {...pageProps} />
        </WrapperLayout>
      </Providers>
    </ChakraProvider>
  );
}
