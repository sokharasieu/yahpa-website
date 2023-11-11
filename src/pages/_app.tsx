import { ChakraProvider } from '@chakra-ui/react'
import Layout from 'components/Layout'
import type { AppProps } from 'next/app'
import theme from 'styles/theme'
import emailjs from 'emailjs-com'
import '@fontsource/lato'
import '@fontsource/source-sans-pro'
import { NextIntlClientProvider } from 'next-intl'

emailjs.init(process?.env?.emailJsUserID as string)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </NextIntlClientProvider>
  )
}
