import { Box, Center, Icon, Stack, Tooltip } from '@chakra-ui/react'
import Link from 'components/Link'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import RenderRichText from 'components/RenderRichText'
import Section from 'components/Section'
import SEO from 'components/SEO'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslations } from 'next-intl'
import React from 'react'
import { RiMessengerFill } from 'react-icons/ri'
import { getContact } from 'utils/api'
import { useStoryblok } from 'utils/storyblokClient'
import dynamic from 'next/dynamic'

// Hydration error caused by data from getStaticProps being passed to component
const DynamicFormContact = dynamic(() => import('../components/FormContact'), {
  ssr: false,
})

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getContact({
    language: context.locale,
  })

  //because of [[...slug]] its hard to catch 404s i.e. /fr/this-is-not-real
  if (context?.params?.slug) {
    return {
      props: {},
      notFound: true,
    }
  }

  return {
    props: {
      story,
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

export default function ContactPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const story = useStoryblok(props?.story!)
  const t = useTranslations('App')
  return (
    <Page>
      <SEO meta={story.content.seo} />
      <PageTitle
        title={story.content.page_title}
        language={story.lang}
        translatedSlugs={story.translated_slugs}
        defaultSlug={story.full_slug}
      />
      <Section>
        <Stack>
          <Box>{RenderRichText(story.content.page_text)}</Box>
          <Box>
            <DynamicFormContact options={story.content.options} />
          </Box>
        </Stack>
      </Section>
      <Tooltip label={t('chat')} bg="gray.900" placement="left">
        <FbChat />
      </Tooltip>
    </Page>
  )
}
