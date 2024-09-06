import { Divider, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Image from '../Image'
import Section from '../Section'
import Link from '../Link'

export default function Hero() {
  const t = useTranslations()
  return (
    <Section bgGradient="linear(145deg, primary.100 20%, primary.200 50%, primary.300 70%, primary.400 100%)">
      <Stack direction={{ base: 'column', xl: 'row' }} spacing={6}>
        <VStack
          flex={1}
          justify={{ base: 'flex-start' }}
          alignItems={{ base: 'start' }}
        >
          <Flex flexDirection="column">
            <Heading
              color="black"
              fontWeight={700}
              lineHeight={1.4}
              maxW={{ base: 'full', lg: 'full' }}
              fontSize={{ base: '5xl' }}
              mb={3}
            >
              {t('Home.hero_title')}
            </Heading>
            <Divider
              backgroundColor="primary.400"
              h="0.5rem"
              mb="2rem"
              w="80%"
              borderRadius="lg"
            />
            <Text
              color="black"
              lineHeight={1.2}
              fontSize={{ base: '2xl' }}
              mb={{ base: '1.5rem', lg: '2rem' }}
            >
              {t('Home.hero_description')}
            </Text>
          </Flex>
          <Link
            href="/about"
            w={{ base: 'full', sm: 'fit-content' }}
            paddingX={{ sm: 6, lg: 8 }}
            paddingY={{ base: 3, lg: 4 }}
            textAlign="center"
            display="flex"
            justifyContent="center"
            fontSize={{ base: 'xl' }}
            fontWeight={400}
            bg="orange.400"
            rounded={'full'}
            color="white"
            _hover={{ bg: 'orange.500' }}
          >
            {t('Home.hero_button')}
          </Link>
        </VStack>
        <Image
          priority
          flex={{ base: 1, lg: 2 }}
          src={'/images/image2.jpg'}
          alt={''}
          ratio={{ base: 4 / 3, lg: 16 / 9 }}
          borderRadius="xl"
          boxShadow="lg"
        />
      </Stack>
    </Section>
  )
}
