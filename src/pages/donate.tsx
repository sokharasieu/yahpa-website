import Page from "components/Page";
import PageTitle from "components/PageTitle";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { getAbout } from "utils/api";
import { useStoryblok } from "utils/storyblokClient";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getAbout({
    language: context.locale,
  });

  //because of [[...slug]] its hard to catch 404s i.e. /fr/this-is-not-real
  if (context?.params?.slug) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      story,
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props?.story!!);

  return (
    <Page>
      {/* <SEO meta={story.content.seo} /> */}
      <PageTitle
        title={"This is the donation page"}
        // language={story.lang}
        // translatedSlugs={story.translated_slugs}
        // defaultSlug={story.full_slug}
      />
    </Page>
  );
}
