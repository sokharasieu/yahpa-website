import { Box, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import CardMember from "components/CardMember";
import Image from "components/Image";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import RenderRichText from "components/RenderRichText";
import Section from "components/Section";
import SEO from "components/SEO";
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
      <Section>
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, lg: 2 }}
          templateRows="auto"
        >
          <Box bg="white" p={4} borderRadius="lg">
            {RenderRichText(story.content.mission_text)}
          </Box>
          <Box w="full" h="full">
            <Image
              borderRadius="lg"
              boxShadow="md"
              ratio={16 / 9}
              priority
              src={
                story.content.mission_image?.filename ?? "/images/image2.jpg"
              }
              alt={story.content.mission_image?.name}
            />
          </Box>
        </SimpleGrid>
      </Section>
      <Section.Outer
        bg="gray.700"
        paddingBottom={{ base: "8rem", md: "5rem" }}
        color="whiteAlpha.900"
      >
        <Section.Inner borderRadius="lg" padding={4}>
          <Box>{RenderRichText(story.content.goals_text)}</Box>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt="2rem">
            {story.content?.goals_table?.map((goal, index) => (
              <HStack key={goal._uid} alignItems="baseline">
                <Heading fontSize="xl" as="span">
                  {index + 1}.
                </Heading>
                <Text fontSize={{ base: "md", xl: "lg" }}>{goal.text}</Text>
              </HStack>
            ))}
          </SimpleGrid>
        </Section.Inner>
      </Section.Outer>
      <Section>
        <Box marginTop={{ base: "-8rem", md: 0 }}>
          <SimpleGrid
            spacing={8}
            columns={{ base: 1, md: 2 }}
            templateRows="auto"
          >
            <Box w="full" h="full">
              <Image
                borderRadius="lg"
                boxShadow="md"
                ratio={4 / 3}
                src={
                  story.content.values_image?.filename ?? "/images/image2.jpg"
                }
                alt={story.content.values_image?.name}
              />
            </Box>
            <Box bg="white" p={4} borderRadius="lg" h="fit-content">
              {RenderRichText(story.content.values_text)}
            </Box>
          </SimpleGrid>
        </Box>
      </Section>
      <Section.Parallax backgroundImageUrl="/images/bg2.jpg">
        <Heading
          color="white"
          fontSize={{ base: "2xl", lg: "3xl" }}
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
          spacing={{ base: 5 }}
          gridTemplateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(2,1fr)",
          }}
        >
          {story.content.members?.map((item) =>
            item.members?.map((member) => {
              return <CardMember key={member.id} member={member} />;
            })
          )}
        </SimpleGrid>
      </Section>
    </Page>
  );
}
