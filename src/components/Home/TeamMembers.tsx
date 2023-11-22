import { Stack, Heading, Wrap, WrapItem, Avatar, Text } from '@chakra-ui/react'
import Section from 'components/Section'
import { useTranslations } from 'next-intl'

type TeamMember = {
  name: string
  imageUrl: string
}

export default function TeamMembers() {
  const t = useTranslations()
  const TEAM_MEMBERS: TeamMember[] = [
    { name: 'Kimfay Hua', imageUrl: '/images/team/kimfayhua.jpg' },
    { name: 'Brendon Pham', imageUrl: '/images/team/brendonpham.jpg' },
    { name: 'Yuxin Hu', imageUrl: '/images/team/yuxinhu.jpg' },
    { name: 'Melissa Hua', imageUrl: '/images/team/melissahua.jpg' },
    { name: 'Vida Sieu', imageUrl: '/images/team/vidasieu.jpg' },
  ]

  return (
    <Section bgGradient="linear(to-b, white 5%, primary.100 30%, primary.200 50%, primary.300)">
      <Stack maxW={{ base: 'xl', xl: '2xl' }} mb={5}>
        <Heading as="h2" fontSize={{ base: '2xl', xl: '3xl' }}>
          {t('Home.team_title')}
        </Heading>
        <Text fontSize={{ base: 'md', xl: 'lg' }}>
          {t('Home.team_description')}
        </Text>
      </Stack>
      <Wrap
        position="relative"
        align="center"
        justify="center"
        spacing={{ base: '-12px', md: 4, xl: 6 }}
        maxW={{ base: 'full', xl: '8xl' }}
      >
        {TEAM_MEMBERS.map((member) => {
          return (
            <WrapItem key={member.name}>
              <Stack h="full" position="relative" align="center">
                <Avatar
                  src={member.imageUrl}
                  width={{ base: '150px', md: '200px' }}
                  height={{ base: '150px', md: '200px' }}
                />
                <Text
                  padding={1}
                  color="white"
                  borderRadius="md"
                  bg="orange.400"
                  textAlign="center"
                  position="relative"
                  bottom="3rem"
                >
                  {member.name}
                </Text>
              </Stack>
            </WrapItem>
          )
        })}
      </Wrap>
    </Section>
  )
}
