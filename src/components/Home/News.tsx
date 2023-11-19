import { Stack, Heading, Text } from '@chakra-ui/react'
import Section from 'components/Section'
import LatestEvents from 'components/LatestEvents'
import { useTranslations } from 'next-intl'
import { StoryResult, ArticleEventBlok } from 'types/story'

type NewsProps = {
  events?: StoryResult<ArticleEventBlok>[]
}

export default function News({ events }: NewsProps) {
  const t = useTranslations()
  const sortedEvents = events?.sort((a, b) => {
    if (a.content?.date && b.content?.date) {
      return +new Date(b.content?.date) - +new Date(a.content?.date)
    } else {
      return 0
    }
  })

  return (
    <Section>
      <Stack maxW={{ base: 'xl', xl: '2xl' }}>
        <Heading as="h2" fontSize={{ base: '2xl', xl: '3xl' }}>
          {t('Home.news_title')}
        </Heading>
        <Text fontSize={{ base: 'md', xl: 'lg' }}>
          {t('Home.news_description')}
        </Text>
      </Stack>
      <LatestEvents events={sortedEvents} />
    </Section>
  )
}
