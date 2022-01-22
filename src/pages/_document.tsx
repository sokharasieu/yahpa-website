import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import isDev from "utils/isDev";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="canonical"
            href={isDev() ? "http://localhost:3000" : process.env.baseUrl}
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:site_name" content={process.env.baseUrl} />
          <meta property="og:type" content="article" />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
