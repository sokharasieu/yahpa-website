import { Box, Button, Flex, Text } from "@chakra-ui/react";
import type { Option } from "types/story";
import Image from "./Image";

export default function CardGoal(props: Option) {
  return (
    <Box position="relative">
      <Image
        src={props.image?.filename ?? ""}
        alt={props.image?.name}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        h="40vh"
      />
      <Flex
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        zIndex={1}
        flexDirection="column"
        height="full"
        justifyContent="space-between"
        p={4}
      >
        <Text fontWeight={700} color="black" fontSize={{ base: "xl" }}>
          {props.title}
        </Text>
        <Flex justifyContent="flex-end">
          <Button bg="white" color="black" _hover={{ bg: "gray.200" }}>
            {props.call_to_action}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
