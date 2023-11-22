import { Heading, SimpleGrid, HStack, Text, Box } from '@chakra-ui/react'
import Section from 'components/Section'
import { useTranslations } from 'next-intl'

export default function GoalsList() {
  const t = useTranslations('About')

  const GOALS = [
    t('goal1'),
    t('goal2'),
    t('goal3'),
    t('goal4'),
    t('goal5'),
    t('goal6'),
  ]

  return (
    <Section.Outer
      bg="gray.700"
      paddingBottom={{ base: '8rem', md: '5rem' }}
      color="whiteAlpha.900"
    >
      <Section.Inner borderRadius="lg" padding={4}>
        <Box>
          <Heading
            mb={3}
            fontSize={{ base: '2xl', lg: '3xl' }}
            fontWeight="bold"
          >
            {t('goals_header')}
          </Heading>
          <Text fontSize={{ base: 'md', xl: 'lg' }} mb={6}>
            {t('goals_description')}
          </Text>
        </Box>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gridTemplateRows={'repeat(3,1fr)'}
          gridAutoFlow={{ base: 'row', lg: 'column' }}
          spacing={6}
          mt="2rem"
        >
          {GOALS?.map((goal, index) => (
            <HStack key={index} alignItems="baseline" css={{ float: 'left' }}>
              <Heading fontSize="xl" as="span">
                {index + 1}.
              </Heading>
              <Text fontSize={{ base: 'md', xl: 'lg' }}>{goal}</Text>
            </HStack>
          ))}
        </SimpleGrid>
      </Section.Inner>
    </Section.Outer>
  )
}
