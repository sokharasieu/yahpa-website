import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import CardDocument from "components/CardDocument";
import Image from "components/Image";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import RenderRichText from "components/RenderRichText";
import Section from "components/Section";
import SEO from "components/SEO";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { getCovid } from "utils/api";
import { useStoryblok } from "utils/storyblokClient";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getCovid({
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

export default function CovidPage(
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
      <Section paddingBottom={0}>
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, lg: 2 }}
          templateRows="auto"
        >
          <Box bg="white" p={4} borderRadius="lg" h="min-content">
            {RenderRichText(story.content.page_description)}
          </Box>
          <Box w="full" h="full" objectFit="cover">
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
        <Stack mb={6}>
          <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
            {story.content.documents_title}
          </Heading>
        </Stack>
        <Accordion defaultIndex={[0]}>
          {story.content?.documents?.map((doc) => (
            <AccordionItem
              key={doc._uid}
              borderTop="0.5px solid gray.100"
              borderBottom="0.5px gray.100"
              borderColor="gray.300"
            >
              <h2>
                <AccordionButton py={3}>
                  <Text
                    color="primary.500"
                    flex={1}
                    textAlign="left"
                    fontSize="lg"
                    as="h3"
                  >
                    {doc.title}
                  </Text>

                  <AccordionIcon w="1.5rem" h="1.5rem" color="primary.500" />
                </AccordionButton>
              </h2>
              <AccordionPanel px={0}>
                <CardDocument document={doc} />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </Page>
  );
}
