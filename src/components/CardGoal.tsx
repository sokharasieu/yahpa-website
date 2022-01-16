import { Box, Button, Flex, Text } from "@chakra-ui/react";
import type { Option } from "types/story";

export default function CardGoal(props: Option) {
  return (
    <Box
      position="relative"
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      h="40vh"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundImage={`url(${props.image?.filename})`}
    >
      <Flex
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
