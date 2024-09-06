import { Box, Button, Container, Heading, Text } from '@chakra-ui/react'
import Link from 'components/Link'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
  }
}

export default function NotFound() {
  const t = useTranslations('App')
  return (
    <Container maxWidth="full" py={10} backgroundColor="gray.200">
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, red.400, red.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="xl" mt={3} mb={2}>
          {t('error_404_title')}
        </Text>
        <Text color={'gray.500'} mb={6}>
          {t('error_404_message')}
        </Text>
        <Link
          href="/"
          _hover={{ textDecoration: 'none' }}
          textDecoration="none"
        >
          <Button colorScheme="red">{t('error_404_button')}</Button>
        </Link>
      </Box>
    </Container>
  )
}
