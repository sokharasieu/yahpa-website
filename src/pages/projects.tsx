import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import CardProject from 'components/CardProject'
import Image from 'components/Image'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'
import SEO from 'components/SEO'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslations } from 'next-intl'
import { getProjects } from 'utils/api'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { projects } = await getProjects({ language: context.locale })

  return {
    props: {
      projects,
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
  }
}

export default function Projects(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const t = useTranslations()

  return (
    <Page>
      <SEO
        title={t('Projects.seo_title')}
        description={t('Projects.seo_description')}
      />
      <PageTitle
        title={t('Projects.page_title')}
        translatedTitle={t('Projects.page_slug')}
      />
      <Section paddingBottom={0}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={8}>
          <Flex flex={1} bg="white" p={4} borderRadius="lg" h="min-content">
            <Text fontSize={{ base: 'md', xl: 'lg' }} mb={6}>
              {t('Projects.page_description')}
            </Text>
          </Flex>
          <Box width={{ base: 'full', lg: '50%' }}>
            <Image
              borderRadius="lg"
              boxShadow="md"
              ratio={16 / 9}
              priority
              src={'/images/image2.jpg'}
              alt={''}
            />
          </Box>
        </Stack>
      </Section>
      <Section>
        <Heading marginBottom={8}>{t('Projects.latest_header')}</Heading>
        {/* TODO: eventually replace projects content */}
        <SimpleGrid spacing={8} columns={{ base: 1 }} gridAutoRows="1fr">
          {props.projects?.map((project) => (
            <CardProject key={project.id} {...project} />
          ))}
        </SimpleGrid>
      </Section>
    </Page>
  )
}
