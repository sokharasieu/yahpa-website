import { Box, Stack, Text, VStack } from "@chakra-ui/react";
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
  return (
    <Box
      position="relative"
      paddingBottom={{ base: "20%", sm: "35%", md: "0%" }}
    >
      <Box
        width={{ base: "100%", md: "70%" }}
        marginLeft="auto"
        background="gray.300"
      >
        <Image src={src} alt={alt} ratio={4 / 3} priority {...imageProps} />
      </Box>
      <Box
        position="absolute"
        top={{ md: 0 }}
        bottom={{ base: 0 }}
        width="full"
        height="full"
        zIndex={3}
        bgGradient={{
          base: "linear(to-t,gray.100 50%, whiteAlpha.900 70%, whiteAlpha.800 100%)",
          sm: "linear(to-t, gray.100 50%, whiteAlpha.400 70%, blackAlpha.200 100%)",
          md: "linear(to-r, gray.100 45%, blackAlpha.200 60%,  blackAlpha.200 80%, blackAlpha.100 100%)",
          lg: "linear(to-r, gray.100 38%, whiteAlpha.100 60%,  blackAlpha.200 80%, blackAlpha.100 100%)",
        }}
      >
        <VStack
          h="full"
          width={{ md: "45%", lg: "40%" }}
          justify={{ base: "center", sm: "flex-end", md: "center" }}
          alignItems={{ base: "center", md: "flex-start" }}
          p={{ base: 3, sm: 6, lg: 8 }}
        >
          <Stack align={{ base: "center", md: "flex-start" }} spacing={6}>
            <Stack>
              <Text
                color="primary.600"
                fontWeight={700}
                lineHeight={1.2}
                textAlign={{ base: "center", md: "start" }}
                fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}
              >
                {title}
              </Text>
              <Text
                color="black"
                textAlign={{ base: "center", md: "start" }}
                fontSize={{ base: "md", lg: "lg" }}
              >
                {subtitle}
              </Text>
            </Stack>
            <Stack
              direction={{ base: "column", xl: "row" }}
              spacing={{ base: 3, lg: 4 }}
              wrap="wrap"
            >
              {children}
            </Stack>
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
}
