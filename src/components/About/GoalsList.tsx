import {
  Container,
  Divider,
  Heading,
  Stack,
  Text,
  WrapItem,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'

export default function GoalsList() {
  const t = useTranslations('About')

  const VALUES = [
    {
      title: t('values.title1'),
      text: t('values.value1'),
    },
    {
      title: t('values.title2'),
      text: t('values.value2'),
    },
    {
      title: t('values.title3'),
      text: t('values.value3'),
    },
    {
      title: t('values.title4'),
      text: t('values.value4'),
    },
    {
      title: t('values.title5'),
      text: t('values.value5'),
    },
    {
      title: t('values.title6'),
      text: t('values.value6'),
    },
  ]

  return (
    <Container maxW="6xl" px={0} pb={{ base: '20vh', md: 12 }}>
      <Stack alignItems="center" pb={12} mx={4}>
        <Heading fontSize="5xl" textAlign="center">
          {t('goals_header')}
        </Heading>
        <Divider
          width="5%"
          borderWidth="2px"
          borderColor="primary.500"
          my={1}
        />
        <Text maxW="xl" textAlign="center">
          {t('goals_description')}
        </Text>
      </Stack>
      <Text fontSize="xl" textAlign="center" py={4}>
        {t('values_header')}
      </Text>
      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        mx={4}
      >
        {VALUES.map((value, index) => {
          return (
            <WrapItem
              key={index}
              background="primary.200"
              p={4}
              borderRadius="md"
              height={{ base: '100%', md: '200px' }}
              width="full"
              maxWidth={{ md: '300px' }}
            >
              <Stack>
                <Text fontSize="xl" fontWeight="bold">
                  {value.title}
                </Text>
                <Text>{value.text}</Text>
              </Stack>
            </WrapItem>
          )
        })}
      </Stack>
    </Container>
  )
}
