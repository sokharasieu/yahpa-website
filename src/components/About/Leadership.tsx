import {
  Avatar,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
  WrapItem,
  useTheme,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React from 'react'

type Member = {
  name: string
  titles: string[]
  src?: string
}

export default function Leadership() {
  const theme = useTheme()
  const t = useTranslations('About')

  const MEMBERS: Member[] = [
    {
      name: 'Kimfay Hua',
      titles: [
        t('role.founder', { gender: 'male' }),
        t('role.president', { gender: 'male' }),
      ],
      src: '/images/leadership/kimfay.png',
    },
    {
      name: 'Vida Sieu',
      titles: [t('role.vice_president', { gender: 'female' })],
      src: '/images/leadership/vida.png',
    },
    {
      name: 'Melissa Hua',
      titles: [t('role.founder', { gender: 'female' }), t('role.secretary')],
      src: '/images/leadership/melissa.png',
    },
    {
      name: 'Gillian Truong',
      titles: [t('role.treasurer', { gender: 'female' })],
    },
    {
      name: 'Belinda Jiao',
      titles: [t('role.marketing', { gender: 'female' })],
      src: '/images/leadership/belinda.png',
    },
    {
      name: 'Alex Chung',
      titles: [t('role.marketing', { gender: 'male' })],
      src: '/images/leadership/alex.png',
    },
    {
      name: 'Uyen Do',
      titles: [t('role.volunteers', { gender: 'female' })],
      src: '/images/leadership/uyen.png',
    },

    {
      name: 'Caroline Trinh',
      titles: [t('role.community_outreach', { gender: 'female' })],
      src: '/images/leadership/caroline.png',
    },
    {
      name: 'Robert Chen',
      titles: [t('role.community_outreach', { gender: 'male' })],
      src: '/images/leadership/robert.png',
    },

    {
      name: 'Brendon Pham',
      titles: [t('role.founder', { gender: 'male' }), t('role.member')],
      src: '/images/leadership/brendon.png',
    },

    {
      name: 'Kaiyang Li',
      titles: [t('role.member')],
      src: '/images/leadership/kaiyang.png',
    },
    {
      name: 'Yu Xin Hu',
      titles: [t('role.founder', { gender: 'female' }), t('role.member')],
      src: '/images/leadership/yuxin.png',
    },

    {
      name: 'Oliver Ying Zhan',
      titles: [t('role.member')],
      src: '/images/leadership/oliver.png',
    },
  ]

  return (
    <Container px={0} maxW="6xl">
      <Stack alignItems="center" mx={4}>
        <Heading fontSize="5xl" textAlign="center">
          {t('leadership_header')}
        </Heading>
        <Divider
          width="5%"
          borderWidth="2px"
          borderColor="primary.500"
          my={1}
        />
        <Text maxW="xl" textAlign="center">
          {t('leadership_description')}
        </Text>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        flexWrap="wrap"
        py={12}
        mx={4}
        gap={6}
      >
        {MEMBERS.map((member) => {
          return (
            <WrapItem
              key={member.name}
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems="center"
              gap={2}
            >
              <Avatar
                size="2xl"
                name={member.name}
                src={member.src}
                style={{
                  opacity: 0.7,
                  filter: 'grayscale(0.3)',
                  backgroundColor: theme.colors.primary['200'],
                }}
              />

              <Stack
                width={{ base: 'full', md: '120px' }}
                maxW={{ base: 'full', md: '120px' }}
                zIndex={1}
                gap={0}
                marginTop={{ base: 3, md: 30 }}
                marginBottom={{ md: 'auto' }}
                alignItems={{ base: 'center', md: 'flex-start' }}
              >
                <Divider borderWidth="1px" borderColor="primary.500" />
                <Text fontWeight="bold" pb={1}>
                  {member.name}
                </Text>
                <Text fontSize="xs">
                  {member.titles?.map((title, index) => (
                    <React.Fragment key={title}>
                      {title}
                      {index !== member.titles.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </Text>
              </Stack>
            </WrapItem>
          )
        })}
      </Stack>
    </Container>
  )
}
