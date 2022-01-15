import { Button, Container } from "@chakra-ui/react";
import Hero from "components/Hero";
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
  const story = useStoryblok(props?.story!!);
  const { t } = useTranslation();

  return (
    <Container px={0} maxWidth="100%" as="main">
      <Hero
        src={story.content.image?.filename ?? "/images/image2.jpg"}
        alt={story.content.image?.name}
        title={story.content.title}
        subtitle={story.content.description}
      >
        <Button
          bg={"orange.400"}
          rounded={"full"}
          color="white"
          _hover={{ bg: "orange.500" }}
        >
          {t("learn_more")}
        </Button>
        <Button bg={"gray.300"} rounded={"full"} _hover={{ bg: "gray.400" }}>
          {t("become_member")}
        </Button>
      </Hero>
    </Container>
  );
}
