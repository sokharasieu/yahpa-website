import { Box, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import CardProject from "components/CardProject";
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
      <Section paddingBottom={0}>
        <Stack direction={{ base: "column", lg: "row" }} spacing={8}>
          <Flex flex={1} bg="white" p={4} borderRadius="lg" h="min-content">
            {RenderRichText(story.content.page_description)}
          </Flex>
          <Box width={{ base: "full", lg: "50%" }}>
            <Image
              borderRadius="lg"
              boxShadow="md"
              ratio={16 / 9}
              priority
              src={story.content.page_image?.filename ?? "/images/image2.jpg"}
              alt={story.content.page_image?.name}
            />
          </Box>
        </Stack>
      </Section>
      <Section>
        <Heading marginBottom={8}>Latest Projects</Heading>
        <SimpleGrid spacing={8} columns={{ base: 1 }} gridAutoRows="1fr">
          {props.projects?.map((project) => (
            <CardProject key={project.id} {...project} />
          ))}
        </SimpleGrid>
      </Section>
    </Page>
  );
}
