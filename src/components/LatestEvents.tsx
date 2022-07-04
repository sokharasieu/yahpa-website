import {
  Box,
  Heading,
  Stack,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ArticleEventBlok, StoryResult } from "types/story";
import Image from "./Image";
import Link from "./Link";
import RenderRichText from "./RenderRichText";
import Time from "./Time";

type LatestEventsProps = {
  events?: (StoryResult<ArticleEventBlok> | undefined)[];
};

type LatestStoryProps = {
  event?: StoryResult<ArticleEventBlok>;
};

function CardTopEvent({ event }: LatestStoryProps) {
  return (
    <Box
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
      >
        <Box
          width={{ base: "100%", sm: "85%" }}
          zIndex="2"
          marginLeft={{ base: "0", sm: "5%" }}
          marginTop="5%"
        >
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <Image
              borderRadius="lg"
              src={event?.content?.image?.filename ?? "/images/logo_white.png"}
              alt={event?.content?.image?.name}
              objectFit="contain"
            />
          </Link>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              "radial(primary.600 1px, transparent 1px)",
              "radial(primary.300 1px, transparent 1px)"
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "0" }}
      >
        <Heading marginTop="1" color="primary.500">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            {event?.content.title}
          </Link>
        </Heading>
        <Time time={event?.content.date as Date} />
        <Box as="p" marginTop="2">
          {RenderRichText(event?.content?.description)}
        </Box>
      </Box>
    </Box>
  );
}

function CardEvent({ event }: LatestStoryProps) {
  return (
    <Box>
      <Box borderRadius="lg" overflow="hidden">
        <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
          <Image
            transform="scale(1.0)"
            src={event?.content?.image?.filename ?? "/images/logo_white.png"}
            alt={event?.content?.image?.name}
            objectFit="contain"
            width="100%"
            transition="0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
          />
        </Link>
      </Box>
      <Stack px={3}>
        <Heading fontSize="xl" marginTop="2">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            {event?.content.title}
          </Link>
        </Heading>
        <Time time={event?.content.date as Date} />
        <Box marginTop="2">{RenderRichText(event?.content?.description)}</Box>
      </Stack>
    </Box>
  );
}

export default function LatestEvents({ events }: LatestEventsProps) {
  return (
    <>
      <CardTopEvent event={events?.[0]} />
      <Wrap spacing="30px" marginTop="5" padding={3}>
        {events?.map(
          (event, index) =>
            index !== 0 && (
              <WrapItem
                key={event?.uuid}
                width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}
              >
                <CardEvent event={event} />{" "}
              </WrapItem>
            )
        )}
      </Wrap>
    </>
  );
}
