import {
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
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
    <Stack direction={{ base: "column", xl: "row" }} spacing={6}>
      <VStack
        flex={1}
        justify={{ base: "flex-start" }}
        alignItems={{ base: "start" }}
      >
        <Flex flexDirection="column">
          <Heading
            color="black"
            fontWeight={700}
            lineHeight={1.4}
            maxW={{ base: "full", lg: "full" }}
            fontSize={{ base: "5xl" }}
            mb={3}
          >
            {title}
          </Heading>
          <Divider
            backgroundColor="primary.400"
            h="0.5rem"
            mb="2rem"
            w="80%"
            borderRadius="lg"
          />
          <Text
            color="black"
            lineHeight={1.2}
            fontSize={{ base: "2xl" }}
            mb={{ base: "1.5rem", lg: "2rem" }}
          >
            {subtitle}
          </Text>
        </Flex>
        <Link
          href="/about"
          w={{ base: "full", sm: "fit-content" }}
          paddingX={{ sm: 6, lg: 8 }}
          paddingY={{ base: 3, lg: 4 }}
          textAlign="center"
          fontSize={{ base: "xl" }}
          fontWeight={400}
          bg="orange.400"
          rounded={"full"}
          color="white"
          _hover={{ bg: "orange.500" }}
        >
          {t("learn_more")}
        </Link>
      </VStack>
      <Image
        priority
        flex={{ base: 1, lg: 2 }}
        src={src}
        alt={alt}
        ratio={{ base: 4 / 3, lg: 16 / 9 }}
        borderRadius="xl"
        boxShadow="lg"
        {...imageProps}
      />
    </Stack>
  );
}
