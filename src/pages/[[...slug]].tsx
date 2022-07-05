import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import CardGoal from "components/CardGoal";
import Carousel, { defaultResponsiveConfig } from "components/Carousel";
import Hero from "components/Hero";
import Image from "components/Image";
import LatestNews from "components/LatestEvents";
import Link from "components/Link";
import Page from "components/Page";
import RenderRichText from "components/RenderRichText";
import Section from "components/Section";
import SEO from "components/SEO";
import useTranslation from "hooks/useTranslation";
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { getHome, getStoriesPaths } from "utils/api";
import { useStoryblok } from "utils/storyblokClient";

const LazyVideoEmbed = dynamic(() => import("components/VideoEmbed"));

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
      story,
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
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const { t } = useTranslation();

  const openFormLinks = () => setShowRegisterForm(!showRegisterForm);

  const sortedEvents = story.content.event_latest?.[0].events?.sort((a, b) => {
    if (a.content?.date && b.content?.date) {
      return +new Date(b.content?.date) - +new Date(a.content?.date);
    } else {
      return 0;
    }
  });

  return (
    <>
      <SEO meta={story.content?.seo} />
      <Page>
        <Section bgGradient="linear(145deg, primary.100 20%, primary.200 50%, primary.300 70%, primary.400 100%)">
          <Hero
            src={story.content.image?.filename ?? "/images/image2.jpg"}
            alt={story.content.image?.name}
            title={story.content.title}
            subtitle={story.content.description}
          />
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
              <Heading color="primary.400">
                {story.content.register_title}
              </Heading>
              {RenderRichText(story?.content.register_description)}
              <Flex justifyContent="flex-start" width="100%" margin="auto">
                <Collapse animateOpacity in={!showRegisterForm} unmountOnExit>
                  <Button
                    onClick={openFormLinks}
                    bg="primary.500"
                    fontWeight={400}
                    _hover={{ bg: "primary.600" }}
                  >
                    {t("register_cta")}
                  </Button>
                </Collapse>
              </Flex>
              <Collapse animateOpacity in={showRegisterForm} unmountOnExit>
                <Flex justifyContent={{ base: "center", lg: "start" }}>
                  <Stack spacing={4}>
                    {story.content.register_links?.map((item) => (
                      <Link
                        key={item.title}
                        href={item.link?.url}
                        borderRadius="xl"
                        paddingY={2}
                        paddingX={3}
                        display="flex"
                        textAlign="center"
                        justifyContent="center"
                        bg="orange.400"
                        _hover={{ backgroundColor: "orange.500" }}
                        sx={{
                          svg: { display: "none" },
                        }}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </Stack>
                </Flex>
              </Collapse>
            </Stack>
            <LazyVideoEmbed
              title={story?.content.title}
              url={story?.content.register_video_link?.url ?? ""}
            />
          </SimpleGrid>
        </Section.Parallax>
        <Section>
          <Stack maxW={{ base: "xl", xl: "2xl" }}>
            <Heading as="h2" fontSize={{ base: "2xl", xl: "3xl" }}>
              {story.content.event_title}
            </Heading>
            <Text fontSize={{ base: "md", xl: "lg" }}>
              {story.content.event_description}
            </Text>
          </Stack>
          <LatestNews events={sortedEvents} />
        </Section>
        <Section paddingTop={0} color="black">
          <Stack spacing={6}>
            <Stack maxW={{ base: "xl", xl: "2xl" }}>
              <Heading fontSize={{ base: "2xl", xl: "3xl" }}>
                {story?.content.option_title}
              </Heading>
              <Text fontSize={{ base: "md", xl: "lg" }}>
                {story?.content.option_description}
              </Text>
            </Stack>
            <SimpleGrid spacing={6} columns={{ base: 1, lg: 2 }}>
              {story?.content?.option_items?.map((option) => (
                <CardGoal key={option.title} {...option} />
              ))}
            </SimpleGrid>
          </Stack>
        </Section>
        <Section
          overflow="hidden"
          bgGradient="linear(to-b, white 5%, primary.100 30%, primary.200 50%, primary.300)"
        >
          <Carousel
            overflow="visible"
            responsive={defaultResponsiveConfig}
            title={story.content?.members_title}
          >
            {story.content.members?.map((item) =>
              item.members?.map((member) => {
                return (
                  <Box key={member.id} paddingLeft={"1rem"}>
                    <Box w="full" position="relative">
                      <Image
                        ratio={2 / 3}
                        src={
                          member.content?.image?.filename ??
                          "/images/image2.jpg"
                        }
                        alt=""
                        width={"full"}
                        borderRadius="2xl"
                      />
                      {member.content?.name && (
                        <Text
                          padding={1}
                          color="white"
                          borderRadius="md"
                          bg="orange.400"
                          width="max-content"
                          position="absolute"
                          left={"1rem"}
                          bottom={"1rem"}
                          right={"2rem"}
                          textAlign="center"
                        >
                          {member.content?.name}
                        </Text>
                      )}
                    </Box>
                  </Box>
                );
              })
            )}
          </Carousel>
        </Section>
      </Page>
    </>
  );
}
