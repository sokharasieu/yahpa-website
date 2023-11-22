import {
  Box,
  ListItem,
  SimpleGrid,
  UnorderedList,
  Text,
  Heading,
} from '@chakra-ui/react'
import Section from 'components/Section'
import Image from 'components/Image'
import { useTranslations } from 'next-intl'

export default function ValuesList() {
  const t = useTranslations('About')

  const VALUES = [
    t.rich('value1', { b: (chunks) => <b>{chunks}</b> }),
    t.rich('value2', { b: (chunks) => <b>{chunks}</b> }),
    t.rich('value3', { b: (chunks) => <b>{chunks}</b> }),
    t.rich('value4', { b: (chunks) => <b>{chunks}</b> }),
    t.rich('value5', { b: (chunks) => <b>{chunks}</b> }),
    t.rich('value6', { b: (chunks) => <b>{chunks}</b> }),
  ]

  return (
    <Section>
      <Box marginTop={{ base: '-8rem', md: 0 }}>
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, md: 2 }}
          templateRows="auto"
        >
          <Box w="full" h="full">
            <Image
              borderRadius="lg"
              boxShadow="md"
              ratio={4 / 3}
              src={'/images/yahpa_tshirt.jpg' ?? '/images/image2.jpg'}
              alt={t('values_image_alt')}
            />
          </Box>

          <Box bg="white" p={4} borderRadius="lg" h="fit-content">
            <Heading
              mb={3}
              fontSize={{ base: '2xl', lg: '3xl' }}
              fontWeight="bold"
            >
              {t('values_header')}
            </Heading>
            <UnorderedList spacing={3}>
              {VALUES.map((value, index) => (
                <ListItem key={index}>
                  <Text fontSize={{ base: 'md', xl: 'lg' }}>{value}</Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </SimpleGrid>
      </Box>
    </Section>
  )
}
