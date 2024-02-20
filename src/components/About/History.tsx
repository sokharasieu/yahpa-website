import { Box, Container, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'

type TimelineYearProps = React.PropsWithChildren<{
  year?: string
}>

function TimelineYear({ children, year }: TimelineYearProps) {
  return (
    <Stack flexDirection="row">
      <Heading textAlign="center" fontSize="5xl" pr={4}>
        {year}
      </Heading>
      <Stack gap={0}>{children}</Stack>
    </Stack>
  )
}

type TimelineItemProps = {
  month?: string
  description?: string
}

function TimelineItem({ month, description }: TimelineItemProps) {
  return (
    <Stack
      minHeight="150px"
      borderLeft="2px solid"
      borderColor="primary.600"
      _first={{
        paddingTop: '16px',
      }}
    >
      <Box width={{ base: '250px', md: '500px' }}>
        <Stack px={5} position="relative">
          <Heading fontSize="2xl">
            <Box
              w={3}
              h={3}
              borderRadius="full"
              backgroundColor="primary.600"
              position="absolute"
              top="9px"
              left={'-7px'}
            />
            {month}
          </Heading>
          <Text pb={12}>{description}</Text>
        </Stack>
      </Box>
    </Stack>
  )
}

export default function History() {
  const t = useTranslations('About')
  return (
    <Container maxW="6xl" px={0} pb={{ base: '20vh', md: 12 }}>
      <Stack alignItems="center" pb={12} mx={4}>
        <Heading fontSize="5xl">{t('history_title')}</Heading>
        <Divider
          width="5%"
          borderWidth="2px"
          borderColor="primary.500"
          my={1}
        />
        <Text>{t('history_description')}</Text>
      </Stack>
      <Stack alignItems="center" gap={0}>
        <TimelineYear year={'2023'}>
          <TimelineItem
            month={t('timeline.months.sep')}
            description={t('timeline.2023.sep')}
          />
          <TimelineItem
            month={t('timeline.months.jan')}
            description={t('timeline.2023.jan')}
          />
        </TimelineYear>
        <TimelineYear year={'2022'}>
          <TimelineItem
            month={t('timeline.months.dec')}
            description={t('timeline.2022.dec')}
          />
          <TimelineItem
            month={t('timeline.months.nov')}
            description={t('timeline.2022.nov')}
          />
          <TimelineItem
            month={t('timeline.months.oct')}
            description={t('timeline.2022.oct')}
          />
        </TimelineYear>
        <TimelineYear year={'2021'}>
          <TimelineItem
            month={t('timeline.months.oct')}
            description={t('timeline.2021.oct')}
          />
          <TimelineItem
            month={t('timeline.months.aug')}
            description={t('timeline.2021.aug')}
          />
          <TimelineItem
            month={t('timeline.months.jun')}
            description={t('timeline.2021.jun')}
          />
          <TimelineItem
            month={t('timeline.months.may')}
            description={t('timeline.2021.may')}
          />
        </TimelineYear>
        <TimelineYear year={'2020'}>
          <TimelineItem
            month={t('timeline.months.dec')}
            description={t('timeline.2020.dec')}
          />
          <TimelineItem
            month={t('timeline.months.nov')}
            description={t('timeline.2020.nov')}
          />
          <TimelineItem
            month={t('timeline.months.jun')}
            description={t('timeline.2020.jun')}
          />
        </TimelineYear>
        <TimelineYear year={'2019'}>
          <TimelineItem
            month={t('timeline.months.dec')}
            description={t('timeline.2019.dec')}
          />
        </TimelineYear>
      </Stack>
    </Container>
  )
}
