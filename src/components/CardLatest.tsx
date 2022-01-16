import { Button, Stack, Text } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import { StoryNews, StoryResult } from "types/story";
import Link from "./Link";
import Time from "./Time";

type CardProps = {
  story?: StoryResult<StoryNews>;
};

export default function CardLatest(props: CardProps) {
  const { t } = useTranslation();
  return (
    <Stack
      direction={{ base: "row", lg: "row" }}
      alignItems="center"
      justifyContent="space-between"
      background="gray.700"
      borderRadius="md"
      boxShadow="lg"
      width={{ base: "auto", sm: "auto" }}
      spacing={9}
      padding={{ base: 3, lg: 4 }}
    >
      <Stack spacing={3}>
        <Text color="primary.400" fontSize={{ base: "xl" }}>
          {props.story?.content.title}
        </Text>
        <Time time={props.story?.content?.date as Date} fontSize="lg" />
      </Stack>
      <Link
        href="#"
        as={Button}
        backgroundColor="green.500"
        _hover={{ backgroundColor: "green.600" }}
      >
        {t("see_event")}
      </Link>
    </Stack>
  );
}
