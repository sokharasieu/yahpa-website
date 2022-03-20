import {
  Box,
  Button,
  Center,
  chakra,
  CheckboxGroup,
  Flex,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
} from "@chakra-ui/react";
import CardSearchResult from "components/CardSearchResult";
import Page from "components/Page";
import PageTitle from "components/PageTitle";
import Section from "components/Section";
import useSearch from "hooks/useSearch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type SearchInputForm = {
  value: string;
};

function CustomCheckbox(props: UseCheckboxProps) {
  const router = useRouter();
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  useEffect(() => {
    if (state.isChecked) {
      router.query.language = props.value as string;
      router.push(router);
    } else {
      router.query.language = undefined;
      router.push(router);
    }
  }, [state.isChecked]);

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="primary.500"
        borderRadius="full"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && (
          <Box w={2} h={2} bg="primary.500" borderRadius="full" />
        )}
      </Flex>
      <Text {...getLabelProps()}>{props.value}</Text>
    </chakra.label>
  );
}

export default function About() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    value,
    getCheckboxProps,
    setValue: setCheckboxValue,
  } = useCheckboxGroup({});
  const { data } = useSearch(searchTerm, value.toString());

  const {
    handleSubmit,
    register,
    reset,
    setValue: setSearchDefaultValue,
  } = useForm<SearchInputForm>();

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
    if (router.query.lang) {
      setCheckboxValue([router.query.lang as string]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <Page>
      <PageTitle title={"Search For A Health Professional Near You"} />
      <Section>
        <Stack spacing={6} direction="row">
          <Stack flex={1} bg="white" height="100%">
            <Stack
              as="form"
              direction="row"
              onSubmit={handleSubmit(onSubmit)}
              bg="white"
              p={4}
              borderRadius="2xl"
            >
              <Input
                placeholder="Enter some text here"
                {...register("value")}
              />
              <Button colorScheme="red" onClick={() => reset()}>
                Clear
              </Button>
              <Button colorScheme="green" type="submit">
                Search
              </Button>
            </Stack>
            <CheckboxGroup>
              <CustomCheckbox
                {...getCheckboxProps({
                  value: "Tiếng Việt",
                })}
              />
              <CustomCheckbox {...getCheckboxProps({ value: "ភាសាខ្មែរ" })} />
              <CustomCheckbox {...getCheckboxProps({ value: "简体中文" })} />
              <CustomCheckbox {...getCheckboxProps({ value: "English" })} />
              <CustomCheckbox {...getCheckboxProps({ value: "Français" })} />
              <CustomCheckbox {...getCheckboxProps({ value: "廣東話" })} />
              <CustomCheckbox {...getCheckboxProps({ value: "潮州話" })} />
            </CheckboxGroup>
          </Stack>
          <Stack flex={2}>
            {!data && (
              <Center>
                <Spinner size="xl" />
              </Center>
            )}
            {/* {data?.totalResults && (
              <Text>{data?.totalResults} result(s) found</Text>
            )} */}
            <SimpleGrid spacing={6} columns={1}>
              {data?.stories?.map((result) => (
                <CardSearchResult key={result.id} {...result} />
              ))}
              {data?.stories.length === 0 && <Text>No Results Found</Text>}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Section>
    </Page>
  );
}
