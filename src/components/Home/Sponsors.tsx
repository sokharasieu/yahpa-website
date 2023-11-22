import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import Image from 'components/Image'
import Section from 'components/Section'
import { useTranslations } from 'next-intl'

type SponsorLogo = {
  name: string
  imageUrl: string
}

export default function Sponsors() {
  const t = useTranslations()
  const SPONSORS: SponsorLogo[] = [
    {
      name: 'TT Café',
      imageUrl: '/images/sponsors/ttcafe.jpg',
    },
    {
      name: 'Kim Phat',
      imageUrl: '/images/sponsors/kimphat.jpg',
    },
    {
      name: 'Presotea',
      imageUrl: '/images/sponsors/presotea.jpg',
    },
    {
      name: 'Cocobun',
      imageUrl: '/images/sponsors/cocobun.jpg',
    },
  ]
  return (
    <Section>
      <Heading fontSize={{ base: '2xl', xl: '3xl' }}>
        {t('Home.sponsor_title')}
      </Heading>
      <Box paddingLeft={20} paddingRight={20}>
        <SimpleGrid padding={4} spacing={6} columns={{ base: 1, md: 2 }}>
          {SPONSORS?.map((sponsor) => {
            return (
              <Box key={sponsor.name}>
                <Image src={sponsor.imageUrl} alt="" ratio={3} width={'auto'} />
              </Box>
            )
          })}
        </SimpleGrid>
      </Box>
    </Section>
  )
}
