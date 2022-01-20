import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import { StoryNews, StoryResult } from "types/story";
import Image from "./Image";
import Link from "./Link";
import RenderRichText from "./RenderRichText";
import Time from "./Time";

type CardProps = {
  story?: StoryResult<StoryNews>;
};

export default function CardLatest(props: CardProps) {
  const { t } = useTranslation();
  return (
    <Link
      href="#"
      _hover={{
        textDecoration: "none",
        "h2:first-of-type": { textDecoration: "underline" },
      }}
    >
      <Stack
        w="full"
        direction={{ base: "column", md: "row" }}
        background="white"
        borderRadius="md"
        overflow="hidden"
        boxShadow="lg"
        position="relative"
        padding={{ md: 3 }}
      >
        <Flex flex={{ base: 2, lg: 1 }}>
          <Image
            src={props.story?.content.image?.filename ?? ""}
            alt={props.story?.content.image?.name}
            ratio={16 / 9}
            w={{ base: "full" }}
            borderRadius={{ md: "md" }}
          />
        </Flex>
        <Stack
          flex={2}
          justifyContent="space-between"
          py={{ base: 4, md: 0 }}
          px={4}
        >
          <Stack>
            <Heading color="primary.400" fontSize={{ base: "xl" }}>
              {props.story?.content.title}
            </Heading>
            <Time time={props.story?.content?.date as Date} />
            <Box sx={{ p: { fontSize: { base: "sm", lg: "md" }, margin: 0 } }}>
              {RenderRichText(props.story?.content.description)}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
}
