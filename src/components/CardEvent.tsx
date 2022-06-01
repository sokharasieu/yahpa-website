import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { ArticleEventStory } from "types/story";
import Image from "./Image";
import RenderRichText from "./RenderRichText";
import Time from "./Time";
import Link from "./Link";

type CardProps = {
  story?: ArticleEventStory;
};

export default function CardEvent({ story }: CardProps) {
  return (
    <Stack
      w="full"
      direction={{ base: "column", md: "row" }}
      background="white"
      borderRadius="md"
      overflow="hidden"
      position="relative"
      padding={{ md: 3 }}
      _hover={{
        textDecoration: "none",
        "h2:first-of-type": { textDecoration: "underline" },
      }}
    >
      <Flex flex={{ base: 2, lg: 1 }}>
        <Image
          src={story?.content?.image?.filename ?? "/images/logo_white.png"}
          alt={story?.content?.image?.name}
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
          <Link href={ story?.content?.title}>
            <Heading color="primary.400" fontSize={{ base: "xl" }}>
            {story?.content?.title}
          </Heading>
          </Link>

          <Time time={story?.content?.date as Date} />
          <Box sx={{ p: { margin: 0 } }}>
            {RenderRichText(story?.content?.description)}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
