import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import { StoryNews, StoryResult } from "types/story";
import Image from "./Image";
import Link from "./Link";
import RenderRichText from "./RenderRichText";

type CardProps = {
  story?: StoryResult<StoryNews>;
};

export default function CardLatest(props: CardProps) {
  const { t } = useTranslation();
  return (
    <Stack direction={{ base: "column-reverse", xl: "row" }} spacing={5}>
      <Flex flex={3} justifyContent="center" height="fit-content">
        <Stack
          background="primary.800"
          padding="0.5rem"
          borderRadius="md"
          boxShadow="lg"
        >
          <Image
            ratio={16 / 9}
            src={props.story?.content.image?.filename ?? "/images/image2.jpg"}
            alt={props.story?.content.image?.name}
            borderRadius="md"
            overflow="hidden"
            width={{ base: "full", sm: 320, md: 640 }}
            height={{ base: "full", sm: 240, md: 480 }}
          />
          <Text textAlign="center" fontStyle="italic">
            {props.story?.content.image?.name}
          </Text>
        </Stack>
      </Flex>
      <Stack spacing={6} sx={{ p: { lineHeight: 1.5, fontSize: "xl" } }}>
        <Heading as="h3" color="primary.400" fontSize="2xl">
          {props.story?.content.title}
        </Heading>
        {RenderRichText(props.story?.content.description)}
        <Flex>
          <Link
            href="#"
            as={Button}
            backgroundColor="green.500"
            _hover={{ backgroundColor: "green.600" }}
          >
            {t("see_more_events")}
          </Link>
        </Flex>
      </Stack>
    </Stack>
  );
}
