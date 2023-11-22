import { useStoryblokState } from '@storyblok/react'
import AboutUs from 'components/About/AboutUs'
import GoalsList from 'components/About/GoalsList'
import LeadershipTeam from 'components/About/LeadershipTeam'
import ValuesList from 'components/About/ValuesList'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import SEO from 'components/SEO'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslations } from 'next-intl'
import { PageAboutBlok } from 'types/story'
import { getAboutV2 } from 'utils/sbApi'

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getAboutV2({
    language: context.locale,
  })

  return {
    props: {
      story,
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
    revalidate: 60 * 60,
  }
}

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const t = useTranslations()
  const story = useStoryblokState<PageAboutBlok>(props?.story)

  return (
    <Page>
      <SEO
        title={t('About.seo_title')}
        description={t('About.seo_description')}
      />
      <PageTitle
        title={t('About.page_title')}
        translatedTitle={t('About.page_slug')}
      />
      <AboutUs />
      <GoalsList />
      <ValuesList />
      {/* TODO: eventually replace members content */}
      <LeadershipTeam members={story.content.members} />
    </Page>
  )
}
