import { Center, ChakraProvider, Spinner } from '@chakra-ui/react'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import '@fontsource/lato'
import '@fontsource/source-sans-pro'
import Layout from 'components/Layout'
import emailjs from 'emailjs-com'
import { NextIntlClientProvider } from 'next-intl'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import theme from 'styles/theme'
import { enUS, frFR, zhCN, viVN } from '@clerk/localizations'

emailjs.init(process?.env?.emailJsUserID as string)

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const configureClerkLocalization = () => {
    switch (router.locale) {
      case 'fr': {
        return frFR
      }
      case 'zh': {
        return zhCN
      }
      case 'vi': {
        return viVN
      }
      default:
        return enUS
    }
  }

  return (
    <ClerkProvider localization={configureClerkLocalization()} {...pageProps}>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
      >
        <ChakraProvider theme={theme}>
          <Layout>
            <ClerkLoading>
              <Center bg="white" width="100%">
                <Spinner
                  size="xl"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="primary.500"
                />
              </Center>
            </ClerkLoading>
            <ClerkLoaded>
              <Component {...pageProps} />
            </ClerkLoaded>
          </Layout>
        </ChakraProvider>
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}
