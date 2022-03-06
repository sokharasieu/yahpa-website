import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "components/Image";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import RenderRichText from "components/RenderRichText";
import Section from "components/Section";
import SEO from "components/SEO";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { getProjects } from "utils/api";
import { useStoryblok } from "utils/storyblokClient";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { landing, projects } = await getProjects({ language: context.locale });

  //because of [[...slug]] its hard to catch 404s i.e. /fr/this-is-not-real
  if (context?.params?.slug) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      landing,
      projects,
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export default function Projects(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props?.landing!!);

  return (
    <Page>
      <SEO meta={story.content.seo} />
      <PageTitle
        title={story.content.page_title}
        language={story.lang}
        translatedSlugs={story.translated_slugs}
        defaultSlug={story.full_slug}
      />
      <Section>
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, lg: 2 }}
          templateRows="auto"
        >
          <Box bg="white" p={4} borderRadius="lg">
            {RenderRichText(story.content.page_description)}
          </Box>
          <Box w="full" h="full">
            <Image
              borderRadius="lg"
              boxShadow="md"
              ratio={16 / 9}
              priority
              src={story.content.page_image?.filename ?? "/images/image2.jpg"}
              alt={story.content.page_image?.name}
            />
          </Box>
        </SimpleGrid>
      </Section>
      <Section>
        <Heading>Latest Projects</Heading>
        <SimpleGrid>
          {props.projects?.map((project) => (
            <Text key={project.id}>{project.content.project_title}</Text>
          ))}
        </SimpleGrid>
      </Section>
    </Page>
  );
}
