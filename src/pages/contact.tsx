import {
  Box,
  Center,
  Heading,
  Icon,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import Link from 'components/Link'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import SEO from 'components/SEO'
import Section from 'components/Section'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import React from 'react'
import { RiMessengerFill } from 'react-icons/ri'

// Hydration error caused by data from getStaticProps being passed to component
const DynamicFormContact = dynamic(() => import('../components/FormContact'), {
  ssr: false,
})

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
    revalidate: 60 * 60,
  }
}

const FbChat = React.forwardRef(function renderShit(
  { ...props }: React.ComponentPropsWithoutRef<typeof Link>,
  ref?: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Link
      href="https://www.facebook.com/YAHPAMontreal"
      position="fixed"
      bottom="1rem"
      right="1rem"
      hideIcon
      isExternal
      zIndex={9999}
      {...props}
    >
      <Center
        ref={ref}
        backgroundColor="white"
        borderRadius="full"
        padding={1}
        border="1px solid"
        borderColor="gray.200"
        boxShadow="lg"
      >
        <Icon
          color="#006AFF"
          as={RiMessengerFill}
          w={'3rem'}
          h={'3rem'}
          _hover={{
            transform: 'scale(1.1)',
            transition: 'all 0.3s ease-in-out',
          }}
        />
      </Center>
    </Link>
  )
})

export default function ContactPage() {
  const t = useTranslations()
  return (
    <Page>
      <SEO
        title={t('Contact.seo_title')}
        description={t('Contact.seo_description')}
      />
      <PageTitle
        title={t('Contact.page_title')}
        translatedTitle={t('Contact.page_slug')}
      />
      <Section>
        <Stack>
          <Box>
            <Heading
              mb={3}
              fontSize={{ base: '2xl', lg: '3xl' }}
              fontWeight="bold"
            >
              {t('Contact.form_header')}
            </Heading>
            <Text fontSize={{ base: 'md', xl: 'lg' }} mb={6}>
              {t('Contact.form_description')}
            </Text>
          </Box>
          <Box>
            <DynamicFormContact />
          </Box>
        </Stack>
      </Section>
      <Tooltip label={t('App.chat')} bg="gray.900" placement="left">
        <FbChat />
      </Tooltip>
    </Page>
  )
}
