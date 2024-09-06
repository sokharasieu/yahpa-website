import { Box, Container, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import Image from 'components/Image'
import { useTranslations } from 'next-intl'
import React from 'react'

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

type TimelineItemProps = React.PropsWithChildren<{
  month?: string
  description?: string
  imageSrc?: string
}>

function TimelineItem({
  month,
  description,
  imageSrc,
  children,
}: TimelineItemProps) {
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
        <Stack px={5} pb={12} position="relative">
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
          <Text>{description}</Text>
          {imageSrc && (
            <Image
              alt=""
              src={imageSrc}
              width={{ base: '200px', sm: '280px', md: '480px' }}
              height={'full'}
              borderRadius="md"
            />
          )}
          {children}
        </Stack>
      </Box>
    </Stack>
  )
}

export default function Timeline() {
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
        <Text textAlign="center">{t('history_description')}</Text>
      </Stack>
      <Stack alignItems="center" gap={0}>
        <TimelineYear year={'2023'}>
          <TimelineItem
            month={t('timeline.months.oct')}
            description={t('timeline.2023.oct')}
            imageSrc="/images/timeline/2023_10_sip_share_connect.jpg"
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
          <TimelineItem
            month={t('timeline.months.aug')}
            description={t('timeline.2022.aug')}
            imageSrc="/images/timeline/2022_08_bbtc.jpg"
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
            imageSrc="/images/team.jpeg"
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
