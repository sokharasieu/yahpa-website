import {
  Box,
  Button,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import Image, { ImageProps } from "./Image";

type HeroProps = React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
}> &
  ImageProps;

export default function Hero({
  title,
  subtitle,
  src,
  alt,
  children,
  ...imageProps
}: HeroProps) {
  const { t } = useTranslation();
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      position="relative"
      spacing={0}
      paddingX={{ lg: "5rem" }}
      paddingY={{ lg: "3rem" }}
      bg="primary.100"
    >
      <VStack
        position="relative"
        zIndex={2}
        backgroundColor="primary.100"
        width={{ lg: "40%" }}
        justify={{ base: "center", sm: "flex-end", md: "center" }}
        alignItems={{ base: "center", lg: "flex-start" }}
        padding={{ base: "2rem", lg: "1rem" }}
        paddingBottom={{ base: "30vh" }}
      >
        <Flex flexDirection="column">
          <Heading
            color="black"
            fontWeight={700}
            lineHeight={1.4}
            maxW={{ base: "90%", lg: "full" }}
            fontSize={{ base: "4xl", xl: "5xl" }}
            mb={3}
          >
            {title}
          </Heading>
          <Divider bg="primary.400" h="0.2rem" mb="2rem" />
          <Text
            color="black"
            lineHeight={1.2}
            fontSize={{ base: "md", lg: "lg", xl: "xl", "2xl": "2xl" }}
            mb={{ base: "1.5rem", lg: "2rem" }}
          >
            {subtitle}
          </Text>
        </Flex>
        <Link
          as={Button}
          href="#"
          padding={{ base: 6, lg: 8 }}
          fontSize={{ base: "xl", lg: "2xl" }}
          fontWeight={400}
          bg="primary.400"
          rounded={"full"}
          color="white"
          _hover={{ bg: "primary.500" }}
        >
          {t("learn_more")}
        </Link>
      </VStack>
      <Box
        position="relative"
        bg={{ base: "gray.100", lg: "primary.100" }}
        width={{ base: "100%", lg: "60%" }}
        height={{ base: "30vh", md: "50vh", lg: "full" }}
        p={{ base: "2rem", lg: "1rem" }}
        zIndex={3}
      >
        <Image
          src={src}
          alt={alt}
          ratio={4 / 3}
          width={{ base: "auto", lg: "full" }}
          height={{ base: "50vh", md: "70vh", lg: "full" }}
          transform={{ base: "translateY(-30vh)", lg: "none" }}
          priority
          borderRadius="xl"
          boxShadow="lg"
          {...imageProps}
        />
        {/* <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex={3}
          // border="5px solid blue"
          bgGradient={{
            base: "linear(to-b,primary.100 3%, whiteAlpha.100 40%, blackAlpha.200 70%)",
            // sm: "linear(to-t, primary.50 5%, whiteAlpha.400 60%, blackAlpha.200 100%)",
            lg: "linear(to-r, primary.100 5%, blackAlpha.100 40%)",
            // lg: "linear(to-r, primary.50 40%, blackAlpha.100 70%,  blackAlpha.200 80%, blackAlpha.100 100%)",
          }}
        ></Box> */}
      </Box>
    </Stack>
  );
}
