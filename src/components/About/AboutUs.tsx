import { SimpleGrid, Heading, Text, Box } from '@chakra-ui/react'
import Section from 'components/Section'
import Image from 'components/Image'
import { useTranslations } from 'next-intl'

export default function AboutUs() {
  const t = useTranslations('About')
  return (
    <Section>
      <SimpleGrid spacing={8} columns={{ base: 1, lg: 2 }} templateRows="auto">
        <Box bg="white" p={4} borderRadius="lg">
          <Heading
            mb={3}
            fontSize={{ base: '2xl', lg: '3xl' }}
            fontWeight="bold"
          >
            {t('part1_header')}
          </Heading>
          <Text fontSize={{ base: 'md', xl: 'lg' }} mb={6}>
            {t('part1_text')}
          </Text>
          <Heading
            mb={3}
            fontSize={{ base: '2xl', lg: '3xl' }}
            fontWeight="bold"
          >
            {t('part2_header')}
          </Heading>
          <Text fontSize={{ base: 'md', xl: 'lg' }} mb={6}>
            {t('part2_text')}
          </Text>
        </Box>
        <Box w="full" h="full">
          <Image
            borderRadius="lg"
            boxShadow="md"
            ratio={16 / 9}
            priority
            src={'/images/team.jpeg' ?? '/images/image2.jpg'}
            alt={t('team_image_alt')}
          />
        </Box>
      </SimpleGrid>
    </Section>
  )
}
