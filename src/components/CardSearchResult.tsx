import { Avatar, Box, Heading, Stack, Text, Wrap } from "@chakra-ui/react";
import { FiMail, FiMapPin, FiPhone, FiGlobe } from "react-icons/fi";
import { RegistryMemberStory } from "types/story";
import Link from "./Link";
import RenderRichText from "./RenderRichText";

type CardSearchResultProps = RegistryMemberStory;

export default function CardSearchResult(props: CardSearchResultProps) {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      p={4}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
    >
      <Stack flex={1} alignItems={{ base: "center", md: "start" }}>
        {props.content.image?.filename && (
          <Avatar
            src={props.content.image?.filename}
            size="xl"
            name={props.content.name}
          />
        )}
        <Heading
          as="h3"
          color="primary.500"
          fontSize={{ base: "3xl" }}
          textAlign={{ base: "center", md: "start" }}
        >
          {props.content.name}
        </Heading>
        <Text
          fontSize={{ base: "xl" }}
          textAlign={{ base: "center", md: "start" }}
        >
          {props.content.profession}
        </Text>
        <Wrap justify={{ base: "center", md: "start" }}>
          {props.content.languages?.map((lang) => (
            <Text bg="primary.100" px={2} borderRadius="md" key={lang}>
              {lang}
            </Text>
          ))}
        </Wrap>
      </Stack>
      <Stack flex={3} px={5}>
        <Text fontSize="2xl">{props.content.workplace}</Text>
        <Wrap pb={4}>
          {props.content.phone_number && (
            <Stack direction="row" alignItems="center">
              <FiPhone size={18} />
              <Text>{props.content.phone_number}</Text>
            </Stack>
          )}
          {props.content.email && (
            <Stack direction="row" alignItems="center">
              <FiMail size={18} />
              <Text>{props.content.email}</Text>
            </Stack>
          )}
          {props.content.address && (
            <Stack direction="row" alignItems="center">
              <FiMapPin size={18} />
              <Text>{props.content.address}</Text>
            </Stack>
          )}
          {props.content.website && (
            <Stack direction="row" alignItems="center">
              <FiGlobe size={18} />
              <Link href={props.content.website}>{props.content.website}</Link>
            </Stack>
          )}
        </Wrap>
        <Box>{RenderRichText(props.content.description)}</Box>
      </Stack>
    </Stack>
  );
}
