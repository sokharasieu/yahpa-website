import { Stack, Heading, SimpleGrid } from '@chakra-ui/react'
import CardGoal, { CardResourceProps } from 'components/CardGoal'
import Section from 'components/Section'
import { useTranslations } from 'next-intl'

export default function Resources() {
  const t = useTranslations()
  const RESOURCE_LINKS: CardResourceProps[] = [
    {
      label: t('Home.resources_option1'),
      link: '/projects',
      imageUrl: '/images/gloves.jpg',
    },
    {
      label: t('Home.resources_option3'),
      link: '/contact',
      imageUrl: '/images/pills.jpg',
    },
    {
      label: t('Home.resources_option4'),
      link: '/registry',
      imageUrl: '/images/stethoscope.jpg',
    },
  ]

  return (
    <Section paddingTop={0} color="black">
      <Stack spacing={6}>
        <Stack maxW={{ base: 'xl', xl: '2xl' }}>
          <Heading fontSize={{ base: '2xl', xl: '3xl' }}>
            {t('Home.resources_title')}
          </Heading>
        </Stack>
        <SimpleGrid spacing={6} columns={{ base: 1, lg: 2 }}>
          {RESOURCE_LINKS?.map((item) => (
            <CardGoal key={item.label} {...item} />
          ))}
        </SimpleGrid>
      </Stack>
    </Section>
  )
}
