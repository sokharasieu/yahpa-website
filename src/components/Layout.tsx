import { Box, Flex, useBreakpoint } from "@chakra-ui/react";
import { useRouter } from "next/router";
import isDev from "utils/isDev";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const currentBreakpoint = useBreakpoint();
  const router = useRouter();

  return (
    <Flex
      bg="whiteAlpha.900"
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        display: "flex",
        //Arial is the most well read font for Vietnamese characters
        fontFamily: router.locale === "vi" ? "Arial" : undefined,
      }}
    >
      <Header />
      <Flex
        as="main"
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </Flex>
      <Footer />
      {isDev() && (
        <Box
          px={2}
          bg="black"
          borderRadius="md"
          color="white"
          sx={{
            position: "fixed",
            left: "0.5rem",
            bottom: "0.5rem",
            zIndex: 999,
          }}
        >
          {currentBreakpoint}
        </Box>
      )}
    </Flex>
  );
}
