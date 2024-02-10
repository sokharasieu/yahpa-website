import { Stack, VStack, Heading } from '@chakra-ui/react'
import { SignUp } from '@clerk/nextjs'
import Page from 'components/Page'
import Section from 'components/Section'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
  }
}

export default function SignUpPage() {
  const t = useTranslations('SignUp')
  return (
    <Page>
      <Page>
        <Section>
          <Stack
            direction={{ base: 'column', md: 'row-reverse' }}
            align="center"
          >
            <VStack flex={1} py={4} textAlign="center">
              <Heading>{t('title')}</Heading>
              <Heading as="h3" fontSize={'2xl'} fontWeight={400}>
                {t('subtitle')}
              </Heading>
            </VStack>
            <SignUp path="/sign-up" routing="hash" signInUrl="/sign-in" />
          </Stack>
        </Section>
      </Page>
    </Page>
  )
}
