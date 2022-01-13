import {
  AspectRatio,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Stack,
  StackDivider,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function ListHeader({ children }: React.PropsWithChildren<{}>) {
  return (
    <Text fontWeight={"700"} fontSize={"lg"} fontStyle="bold" mb={2}>
      {children}
    </Text>
  );
}

export default function Footer() {
  return (
    <Box bg="gray.700" color="whiteAlpha.800" pt={10}>
      <Container as={Stack} maxW={"6xl"}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Organization</ListHeader>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contribute">Contribute</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Languages</ListHeader>
            <Link>English</Link>
            <Link>French</Link>
            <Link>Chinese</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Link href="/contact">Contact Us</Link>
              <Tag
                size={"sm"}
                bg={useColorModeValue("red.300", "red.800")}
                ml={2}
                color={"white"}
              >
                Coming Soon
              </Tag>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Container maxW={"6xl"} mt={4} py={4}>
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <HStack
            pt={6}
            divider={<StackDivider borderColor="gray.600" />}
            spacing={4}
            width="full"
            alignItems="center"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Link
              _hover={{ color: "blue.600" }}
              href="https://www.facebook.com/YAHPAMontreal"
            >
              Facebook
            </Link>
            <Link
              _hover={{ color: "red.500" }}
              href="https://www.youtube.com/channel/UCKFif2TbH7QunfPRzARPSgw"
            >
              Youtube
            </Link>
            <Link
              _hover={{
                color: "pink.400",
              }}
              href="https://www.instagram.com/yahpamontreal/"
            >
              Instagram
            </Link>
          </HStack>
          <Flex
            width="100%"
            justifyContent={{ base: "center", md: "flex-end" }}
          >
            YAHPA © 2021
          </Flex>
          <AspectRatio maxW="200px" width="full" ratio={4 / 3}>
            <Image
              src="/images/logo_wb.png"
              alt="YAHPA full logo"
              objectFit="cover"
            />
          </AspectRatio>
        </Stack>
      </Container>
    </Box>
  );
}
