import { Box, Text } from '@chakra-ui/react'
import FormSearchRegistry from 'components/FormSearchRegistry'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'
import SEO from 'components/SEO'
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

export default function Registry() {
  const t = useTranslations()

  return (
    <Page>
      <SEO
        title={t('Registry.seo_title')}
        description={t('Registry.seo_description')}
      />
      <PageTitle
        title={t('Registry.page_title')}
        translatedTitle={t('Registry.page_slug')}
      />
      <Section paddingTop={8}>
        <Box fontSize="xl" textAlign="center">
          <Text fontSize={{ base: 'md', xl: 'lg' }} mb={6}>
            {t('Registry.page_description')}
          </Text>
        </Box>
        <FormSearchRegistry />
      </Section>
    </Page>
  )
}
