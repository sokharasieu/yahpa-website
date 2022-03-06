import { Flex, Heading, Stack } from "@chakra-ui/react";
import { PageProjectStory } from "types/story";
import Image from "./Image";
import Link from "./Link";
import RenderRichText from "./RenderRichText";
import Time from "./Time";

export default function CardProject(props: PageProjectStory) {
  return (
    <Stack
      position="relative"
      direction={{ base: "column", md: "row" }}
      bg="white"
      gap={4}
      padding={2}
      borderRadius="md"
    >
      <Flex flex={2}>
        <Image
          src={props.content.project_image?.filename}
          alt={props.content.project_image?.title}
          ratio={16 / 9}
          w={{ base: "full" }}
          borderRadius="md"
        />
      </Flex>
      <Stack flex={2} width="full" px={4} py={2} flexDirection="column">
        <Heading
          as="h3"
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          marginBottom={1}
        >
          {props.content.project_title}
        </Heading>
        <Time
          fontSize={{ base: "lg" }}
          marginBottom={4}
          time={props?.content?.project_date as Date}
        />
        {RenderRichText(props.content.project_description)}
        <Stack
          paddingTop={4}
          direction={{ base: "column", lg: "row" }}
          spacing={3}
        >
          {props.content.project_links?.map((link) => (
            <Link
              key={link?.title}
              href={link?.link?.url}
              w={{ base: "full", sm: "fit-content" }}
              textAlign="center"
              display="flex"
              justifyContent="center"
              paddingX={{ sm: 3, lg: 6 }}
              paddingY={{ base: 1, lg: 2 }}
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight={400}
              bg="orange.400"
              rounded={"full"}
              color="white"
              _hover={{ bg: "orange.500" }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
