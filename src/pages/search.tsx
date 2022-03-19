import { Box, Button, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import Section from "components/Section";
import useSearch from "hooks/useSearch";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SearchInputForm = {
  value: string;
};

export default function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useSearch(searchTerm);

  const { handleSubmit, register, reset } = useForm<SearchInputForm>();

  const onSubmit = async ({ value }: SearchInputForm) => {
    setSearchTerm(value);
  };

  return (
    <Page>
      <PageTitle title={"temporary search"} />
      <Section css={{}}>
        <Stack
          as="form"
          direction="row"
          onSubmit={handleSubmit(onSubmit)}
          bg="white"
          p={4}
          borderRadius="2xl"
        >
          <Input placeholder="Enter some text here" {...register("value")} />
          <Button colorScheme="red" onClick={() => reset()}>
            Clear
          </Button>
          <Button colorScheme="green" type="submit">
            Search
          </Button>
        </Stack>
        <Box>
          <Stack>
            {data?.totalResults && (
              <Text>{data?.totalResults} result(s) found</Text>
            )}
            <SimpleGrid spacing={6} columns={{ base: 1 }}>
              {data?.stories?.map((result) => (
                <Text key={result.id}>{result.content.name}</Text>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
      </Section>
    </Page>
  );
}
