import { Breadcrumb, BreadcrumbItem, Heading, Stack } from '@chakra-ui/react'
import useTranslation from 'hooks/useTranslation'
import { StoryData } from 'storyblok-js-client'
import Link from './Link'
import Section from './Section'
import { useRouter } from 'next/router'

type PageTitleProps = {
  title?: string
  language?: string
  defaultSlug?: StoryData['full_slug']
  translatedSlugs?: StoryData['translated_slugs']
}

type Slug = {
  path?: string
  name?: string | null
  lang?: string
}

export default function PageTitle(props: PageTitleProps) {
  const { t, locale } = useTranslation()
  const router = useRouter()

  let slugs: Slug[] | undefined
  if (locale !== 'en') {
    slugs = props.translatedSlugs?.filter((item) => {
      if (item.lang === locale) return item
    })
  } else {
    slugs = [
      { name: props.defaultSlug?.replace('/', ''), path: props.defaultSlug },
    ]
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Section
      backgroundColor="gray.800"
      paddingY={{ base: '2rem', md: '3rem' }}
      color="white"
      bgGradient="linear(70deg,primary.400 30%, primary.500 50%, primary.600 100%)"
    >
      <Stack fontSize="lg">
        <Heading>{props.title}</Heading>
        <Breadcrumb alignItems="center">
          <BreadcrumbItem>
            <Link href="/">{t('home')}</Link>
          </BreadcrumbItem>
          {slugs?.map((slug) => {
            const slugMatches = '/' + slug.path === router.asPath
            return (
              <BreadcrumbItem key={slug.name}>
                <Link href={slugMatches ? undefined : slug.path}>
                  {capitalizeFirstLetter(slug.name ?? '')}
                </Link>
              </BreadcrumbItem>
            )
          })}
        </Breadcrumb>
      </Stack>
    </Section>
  )
}
