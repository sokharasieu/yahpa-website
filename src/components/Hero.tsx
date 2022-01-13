import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "./Image";

type HeroProps = React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
}>;

export default function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <Box position="relative">
      <Box
        width={{ base: "100%", md: "60%" }}
        height="80%"
        marginLeft="auto"
        background="gray.300"
      >
        <Image src="/images/image2.jpg" alt="picture" ratio={4 / 3} />
      </Box>
      <Box
        position="absolute"
        top={{ md: 0 }}
        bottom={{ base: 0 }}
        width="full"
        height="full"
        zIndex={3}
        bgGradient={{
          base: "linear(to-t, whiteAlpha.900 35%, whiteAlpha.800 60%, whiteAlpha.300 100%)",
          sm: "linear(to-t, gray.100 30%, whiteAlpha.400 60%, blackAlpha.200 100%)",
          md: "linear(to-r, gray.100 45%, blackAlpha.200 60%,  blackAlpha.200 80%, blackAlpha.100 100%)",
          lg: "linear(to-r, gray.100 40%, blackAlpha.200 60%,  blackAlpha.200 80%, blackAlpha.100 100%)",
        }}
      >
        <VStack
          h="full"
          width={{ md: "45%", lg: "40%" }}
          justify={{ base: "flex-end", md: "center" }}
          alignItems={{ base: "center", md: "flex-start" }}
          p={8}
        >
          <Stack align={{ base: "center", md: "flex-start" }} spacing={8}>
            <Stack>
              <Text
                color="black"
                fontWeight={700}
                lineHeight={1.2}
                textAlign={{ base: "center", md: "start" }}
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              >
                {title}
              </Text>
              <Text
                display={{ base: "none", md: "block" }}
                color="black"
                textAlign={{ base: "center", md: "start" }}
                fontSize={{ base: "md", md: "lg" }}
              >
                {subtitle}
              </Text>
            </Stack>
            <Stack direction={"row"} spacing={4} wrap="wrap">
              {children}
            </Stack>
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
}
