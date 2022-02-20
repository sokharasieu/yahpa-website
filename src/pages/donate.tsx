import { SimpleGrid, Box } from "@chakra-ui/react";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import RenderRichText from "components/RenderRichText";
import Section from "components/Section";
import Image from "components/Image";
import SEO from "components/SEO";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { getDonation } from "utils/api";
import { useStoryblok } from "utils/storyblokClient";
import Link from "components/Link";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getDonation({
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

export default function Donation(
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
            {RenderRichText(story.content.page_description)}
            <Link
              href={story.content.link_form?.url}
              isExternal
              hideIcon
              w={{ base: "full", sm: "fit-content" }}
              paddingX={{ sm: 6, lg: 8 }}
              paddingY={{ base: 3, lg: 4 }}
              textAlign="center"
              display="flex"
              justifyContent="center"
              fontSize={{ base: "xl" }}
              fontWeight={400}
              bg="orange.400"
              rounded={"full"}
              color="white"
              _hover={{ bg: "orange.500" }}
            >
              Donate
            </Link>
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
    </Page>
  );
}
