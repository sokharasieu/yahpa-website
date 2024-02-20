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

export default function Leadership() {
  const theme = useTheme()
  const t = useTranslations('About')

  const MEMBERS = [
    {
      name: 'Kimfay Hua',
      title: t('role.president'),
      src: '/images/leadership/kimfay.png',
    },
    {
      name: 'Caroline Trinh',
      title: t('role.eventplanning'),
      src: '/images/leadership/caroline.png',
    },
    {
      name: 'Alex Chung',
      title: t('role.eventplanning'),
      src: '/images/leadership/alex.png',
    },
    {
      name: 'Brendon Pham',
      title: t('role.external'),
      src: '/images/leadership/brendon.png',
    },
    {
      name: 'Uyen Do',
      title: t('role.marketing'),
      src: '/images/leadership/uyen.png',
    },
    {
      name: 'Belinda Jiao',
      title: t('role.marketing'),
      src: '/images/leadership/belinda.png',
    },
    {
      name: 'Kaiyang Li',
      title: t('role.registry'),
      src: '/images/leadership/kaiyang.png',
    },
    {
      name: 'Yu Xin Hu',
      title: t('role.funding'),
      src: '/images/leadership/yuxin.png',
    },
    {
      name: 'Melissa Hua',
      title: t('role.secretary'),
      src: '/images/leadership/melissa.png',
    },
    {
      name: 'Vida Sieu',
      title: t('role.treasurer'),
      src: '/images/leadership/vida.png',
    },
    {
      name: 'Oliver Ying Zhan',
      title: t('role.wechat'),
      src: '/images/leadership/oliver.png',
    },
    {
      name: 'Robert Chen',
      title: t('role.volunteer'),
      src: '/images/leadership/robert.png',
    },
    {
      name: 'Jin Kuang',
      title: t('role.volunteer'),
      src: '/images/leadership/jin.png',
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
                width={{ base: 'full', md: '100px' }}
                maxW={{ base: 'full', md: '100px' }}
                marginLeft={{ md: '-4' }}
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
                <Text fontSize="xs">{member.title}</Text>
              </Stack>
            </WrapItem>
          )
        })}
      </Stack>
    </Container>
  )
}
