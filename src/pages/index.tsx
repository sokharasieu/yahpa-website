import { Button, Container } from "@chakra-ui/react";
import Hero from "components/Hero";

export default function Home() {
  return (
    <Container px={0} maxWidth="100%" as="main">
      <Hero
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <Button
          bg={"orange.400"}
          rounded={"full"}
          color="white"
          _hover={{ bg: "orange.500" }}
        >
          Learn More
        </Button>
        <Button bg={"gray.300"} rounded={"full"} _hover={{ bg: "gray.400" }}>
          Become A Member
        </Button>
      </Hero>
    </Container>
  );
}
