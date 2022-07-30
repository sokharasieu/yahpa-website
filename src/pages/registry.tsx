import {
  Button,
  Center,
  Input,
  Box,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import CardSearchResult from "components/CardSearchResult";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import RenderRichText from "components/RenderRichText";
import Section from "components/Section";
import useDebounce from "hooks/useDebounce";
import useSearch from "hooks/useSearch";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getRegistry } from "utils/api";
import { useStoryblok } from "utils/storyblokClient";
import useTranslation from "hooks/useTranslation";

type SearchInputForm = {
  value: string;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { landing } = await getRegistry({ language: context.locale });

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
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export default function Registry(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props?.landing!!);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 200);
  const { data } = useSearch(debouncedTerm, "");
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    reset,
    setValue: setSearchDefaultValue,
  } = useForm<SearchInputForm>();

  const handleReset = () => {
    reset();
    setSearchTerm("");
    router.replace(
      {
        pathname: router.pathname,
      },
      undefined,
      { shallow: true }
    );
  };

  const onSubmit = async ({ value }: SearchInputForm) => {
    setSearchTerm(value);
    router.query.term = value;
    router.push(router);
  };

  useEffect(() => {
    if (router.query.term) {
      setSearchTerm(router.query.term as string);
      setSearchDefaultValue("value", router.query.term as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <Page>
      <PageTitle
        title={story.content.page_title}
        language={story.lang}
        translatedSlugs={story.translated_slugs}
        defaultSlug={story.full_slug}
      />

      <Section>
        <Stack>
          <Box fontSize="xl" textAlign="center">
            {RenderRichText(story.content.page_description)}
          </Box>
        </Stack>
        <Stack
          as="form"
          justifyContent="center"
          direction="row"
          width="80%"
          mx="auto"
          onChange={handleSubmit(onSubmit)}
          bg="gray.100"
          p={4}
          borderRadius="2xl"
          my={4}
        >
          <Input
            placeholder={t("registry_search_placeholder")}
            bg="white"
            {...register("value")}
          />
          <Button colorScheme="red" onClick={handleReset}>
            Clear
          </Button>
        </Stack>
        <Stack spacing={6} direction="row">
          <Stack flex={2}>
            {!data && (
              <Center>
                <Spinner size="xl" />
              </Center>
            )}
            {data?.totalResults && (
              <Text fontSize="2xl" fontWeight="bold">
                {data?.totalResults} {t("results_found")}
              </Text>
            )}
            <SimpleGrid spacing={6} columns={1}>
              {data?.stories?.map((result) => (
                <CardSearchResult key={result.id} {...result} />
              ))}
              {data?.stories.length === 0 && (
                <Text fontSize="2xl" fontWeight="bold">
                  {t("results_not_found")}
                </Text>
              )}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Section>
    </Page>
  );
}
