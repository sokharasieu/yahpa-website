import {
  Box,
  Button,
  Center,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import Section from "components/Section";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MemberStory } from "types/story";
import { getSearch } from "utils/api";

type SearchInputForm = {
  value: string;
};

export default function About() {
  const [searchResults, setSearchResults] = useState<MemberStory[]>([]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchInputForm>();

  const onSubmit = async ({ value }: SearchInputForm) => {
    //Refactor this submit using swr instead
    const members = await getSearch({
      starts_with: "team",
      search_term: value,
    });
    setSearchResults(members);
  };

  return (
    <Page>
      <PageTitle title={"temporary search"} />
      <Section css={{ minHeight: "50vh" }}>
        <Stack as="form" direction="row" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Enter some text here" {...register("value")} />
          <Button type="submit">Submit</Button>
          <Button onClick={() => reset()}>Clear</Button>
        </Stack>
        <Box>
          {isSubmitting ? (
            <Center my={6}>
              <Spinner size="lg" color="primary.500" />
            </Center>
          ) : (
            <Stack>
              {searchResults?.map((result) => (
                <Text key={result.id}>{result.content.name}</Text>
              ))}
            </Stack>
          )}
        </Box>
      </Section>
    </Page>
  );
}
