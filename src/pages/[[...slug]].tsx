import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import CardLatest from "components/CardEvent";
import CardGoal from "components/CardGoal";
import Hero from "components/Hero";
import LazyIframe from "components/LazyIframe";
import Link from "components/Link";
import Page from "components/Page";
import RenderRichText from "components/RenderRichText";
import Section from "components/Section";
import useTranslation from "hooks/useTranslation";
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { getHome, getStoriesPaths } from "utils/api";
import { useStoryblok } from "utils/storyblokClient";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getHome({
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
      story: story,
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = await getStoriesPaths({ starts_with: "home" }, locales);
  return {
    paths,
    fallback: "blocking",
  };
}

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story?.home!!);
  const { t } = useTranslation();

  return (
    <Page>
      <Section.Outer p={0}>
        <Hero
          src={story.content.image?.filename ?? "/images/image2.jpg"}
          alt={story.content.image?.name}
          title={story.content.title}
          subtitle={story.content.description}
        />
      </Section.Outer>
      <Section bg="gray.100" color="black">
        <Stack spacing={8}>
          <Heading as="h2" fontSize={{ base: "2xl", xl: "4xl" }}>
            {t("latest_activity")}
          </Heading>
          <CardLatest story={props.story?.latestPost} />
        </Stack>
      </Section>
      <Section bg="gray.100" color="black">
        <Stack spacing={6}>
          <Heading fontSize={{ base: "2xl", xl: "4xl" }}>
            {props.story?.home.content.option_title}
          </Heading>
          <SimpleGrid spacing={6} columns={{ base: 1, lg: 2 }}>
            {props.story?.home.content?.option_items?.map((option) => (
              <CardGoal key={option.title} {...option} />
            ))}
          </SimpleGrid>
        </Stack>
      </Section>
      <Section.Parallax backgroundImageUrl={"/images/bg.jpg"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          templateRows="auto"
          spacing={4}
        >
          <Stack
            height="full"
            width="full"
            justifyContent="center"
            spacing={5}
            color="white"
          >
            <Heading color="primary.400" mb={4}>
              {t("register_title")}
            </Heading>
            {RenderRichText(props.story?.home.content.register_description)}
            <Flex justifyContent="flex-start" width="100%" margin="auto">
              <Link
                as={Button}
                href="#"
                bg="primary.500"
                _hover={{ bg: "primary.600" }}
              >
                {t("register_cta")}
              </Link>
            </Flex>
          </Stack>
          <Box borderRadius="lg" width="full">
            <LazyIframe
              maxWidth={640}
              ratio={4 / 3}
              url={props.story?.home.content.register_video_link?.url ?? ""}
              title={props.story?.home.content.title}
            />
          </Box>
        </SimpleGrid>
      </Section.Parallax>
    </Page>
  );
}
