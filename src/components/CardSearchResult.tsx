import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { MemberStory } from "types/story";
import Image from "./Image";

type CardSearchResultProps = MemberStory;

export default function CardSearchResult(props: CardSearchResultProps) {
  return (
    <Stack direction="row" p={4} backgroundColor="white" borderRadius="lg">
      <Box w="240px">
        <Image
          ratio={2 / 3}
          src={props.content.image?.filename}
          alt={props.content.name}
        />
      </Box>
      <Stack>
        <Heading>{props.content.name}</Heading>
        <Text>{props.content.languages}</Text>
        <Text>{props.content.position}</Text>
      </Stack>
    </Stack>
  );
}
