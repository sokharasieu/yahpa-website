import { Container, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import Image from 'components/Image'
import { useTranslations } from 'next-intl'

export default function AboutUsHero() {
  const t = useTranslations('About')
  return (
    <Container maxW="6xl" px={0} pb={{ base: '20vh', md: 12 }} mb={4}>
      <Stack justifyContent="start" py={4} px={4}>
        <Divider
          py={2}
          width="90%"
          borderColor="primary.500"
          borderBottomWidth="3px"
        />
        <Heading fontSize="6xl">{t('page_title')}</Heading>
        <Text fontSize={'xl'} pb={4}>
          {t('page_description')}
        </Text>
      </Stack>
      <Stack
        position="relative"
        justifyContent={{ base: 'flex-end', md: 'center' }}
        height={{ base: '80vh', md: '65vh' }}
        mx={{ base: 0, md: 4 }}
      >
        <Image
          width={{ base: '100%', md: '90%' }}
          height="100%"
          src="/images/gloves.jpg"
          alt="bg"
          borderRadius={{ base: 'none', md: 'xl' }}
          zIndex={0}
        />
        <Stack
          borderRadius="xl"
          position="absolute"
          // bottom={0}
          // marginBottom={{ base: '-20vh', md: 0 }}
          backgroundColor="primary.200"
          justifySelf="center"
          alignSelf={{ base: 'center', md: 'flex-end' }}
          zIndex={1}
          mx={4}
          padding={12}
          maxW="xl"
        >
          <Divider borderColor="black" borderWidth={1.5} />
          <Heading fontSize="3xl">{t('part1_header')}</Heading>
          <Text>{t('part1_text')}</Text>
        </Stack>
      </Stack>
    </Container>
  )
}
