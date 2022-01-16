import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import CardLatest from "components/CardLatest";
import Hero from "components/Hero";
import Link from "components/Link";
import RenderRichText from "components/RenderRichText";
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
    <Container px={0} maxWidth="100%" as="main">
      <Hero
        src={story.content.image?.filename ?? "/images/image2.jpg"}
        alt={story.content.image?.name}
        title={story.content.title}
        subtitle={story.content.description}
      >
        <Link
          as={Button}
          href="#"
          bg={"orange.400"}
          rounded={"full"}
          color="white"
          _hover={{ bg: "orange.500" }}
        >
          {t("learn_more")}
        </Link>
      </Hero>
      <Container
        as="section"
        maxW="full"
        px={{ base: 3, lg: 6 }}
        bg="gray.800"
        color="white"
        py={{ base: "2rem", md: "5rem" }}
      >
        <Stack spacing={8}>
          <Heading as="h2" fontSize={{ base: "xl", lg: "3xl" }}>
            {t("latest_activity")}
          </Heading>
          <CardLatest story={props.story?.latestPost} />
        </Stack>
      </Container>
      <Container
        as="section"
        maxW="full"
        px={{ base: 3, lg: 6 }}
        bg="gray.200"
        backgroundImage={"url(/images/mask2.jpg)"}
        backgroundAttachment="fixed"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        position="relative"
        zIndex={0}
        _before={{
          content: "' '",
          display: "block",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: -1,
          backgroundColor: "blackAlpha.700",
        }}
        color="white"
        py={{ base: "2rem", md: "5rem" }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          templateRows="auto"
          spacing={4}
        >
          <Stack
            height="full"
            width="full"
            justifyContent="center"
            p={12}
            spacing={5}
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
            <AspectRatio
              maxW={640}
              ratio={4 / 3}
              borderRadius="lg"
              boxShadow="xl"
              margin="auto"
            >
              <Box
                as="iframe"
                src={props.story?.home.content.register_video_link?.url}
                allowFullScreen
                borderRadius="md"
              />
            </AspectRatio>
          </Box>
        </SimpleGrid>
      </Container>
    </Container>
  );
}
