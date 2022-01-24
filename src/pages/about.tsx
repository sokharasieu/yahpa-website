import { Box, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import CardMember from "components/CardMember";
import Image from "components/Image";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import RenderRichText from "components/RenderRichText";
import Section from "components/Section";
import SEO from "components/SEO";
import { LayoutGroup } from "framer-motion";
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
      <SEO meta={story.content.seo} />
      <PageTitle
        title={story.content.page_title}
        language={story.lang}
        translatedSlugs={story.translated_slugs}
        defaultSlug={story.full_slug}
      />
      <Section.Fade>
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, lg: 2 }}
          templateRows="auto"
        >
          <Box>{RenderRichText(story.content.mission_text)}</Box>
          <Box w="full" h="full">
            <Image
              borderRadius="lg"
              boxShadow="md"
              ratio={16 / 9}
              src={
                story.content.mission_image?.filename ?? "/images/image2.jpg"
              }
              alt={story.content.mission_image?.name}
            />
          </Box>
        </SimpleGrid>
      </Section.Fade>
      <Section.Fade paddingTop={0} backgroundColor="gray.100">
        <Box>{RenderRichText(story.content.goals_text)}</Box>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mt="2rem">
          {story.content?.goals_table?.map((goal, index) => (
            <HStack key={goal._uid} alignItems="baseline">
              <Heading fontSize="xl" color="primary.500" as="span">
                {index + 1}.
              </Heading>
              <Text fontSize={{ base: "md", lg: "lg", xl: "xl" }}>
                {goal.text}
              </Text>
            </HStack>
          ))}
        </SimpleGrid>
      </Section.Fade>
      <Section.Parallax backgroundImageUrl="/images/bg2.jpg">
        <Heading
          color="white"
          fontSize={{ base: "3xl", lg: "4xl" }}
          width="fit-content"
          _after={{
            content: "' '",
            backgroundColor: "primary.500",
            width: "100%",
            height: 1,
            borderRadius: "md",
            display: "block",
          }}
        >
          {story.content.members_title}
        </Heading>
      </Section.Parallax>
      <Section
        paddingTop={{ base: "2rem", lg: "3rem" }}
        paddingBottom={{ base: "2rem", lg: "3rem" }}
      >
        <SimpleGrid
          spacing={3}
          gridTemplateColumns={{
            base: "repeat(1, auto)",
            md: "repeat(2,auto)",
            xl: "repeat(3,auto)",
          }}
        >
          <LayoutGroup>
            {story.content.members?.map((item) =>
              item.members?.map((member) => {
                return <CardMember key={member.id} member={member} />;
              })
            )}
          </LayoutGroup>
        </SimpleGrid>
      </Section>
    </Page>
  );
}
