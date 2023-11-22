import { Heading, SimpleGrid } from '@chakra-ui/react'
import CardMember from 'components/CardMember'
import Section from 'components/Section'
import { useTranslations } from 'next-intl'
import { ListMembersBlok } from 'types/story'

type LeadershipTeamProps = {
  members?: ListMembersBlok[]
}

export default function LeadershipTeam({ members }: LeadershipTeamProps) {
  const t = useTranslations('About')
  return (
    <>
      <Section.Parallax backgroundImageUrl="/images/bg2.jpg">
        <Heading
          color="white"
          fontSize={{ base: '2xl', lg: '3xl' }}
          width="fit-content"
          _after={{
            content: "' '",
            backgroundColor: 'primary.500',
            width: '100%',
            height: 1,
            borderRadius: 'md',
            display: 'block',
          }}
        >
          {t('leadership_header')}
        </Heading>
      </Section.Parallax>
      <Section
        paddingTop={{ base: '2rem', lg: '3rem' }}
        paddingBottom={{ base: '2rem', lg: '3rem' }}
      >
        <SimpleGrid
          spacing={{ base: 5 }}
          gridTemplateColumns={{
            base: 'repeat(1, 1fr)',
            lg: 'repeat(2,1fr)',
          }}
        >
          {members?.map((item) =>
            item.members?.map((member) => {
              return <CardMember key={member.id} member={member} />
            })
          )}
        </SimpleGrid>
      </Section>
    </>
  )
}
