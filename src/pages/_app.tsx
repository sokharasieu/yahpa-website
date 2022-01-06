import { ChakraProvider } from "@chakra-ui/react";
import Layout from "components/Layout";
import type { AppProps } from "next/app";
import theme from "styles/theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
