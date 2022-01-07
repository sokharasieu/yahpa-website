import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import Link from "./Link";

function NavLink(props: React.ComponentProps<typeof Link>) {
  const router = useRouter();
  const isActiveLink = router.asPath === props.href;
  return (
    <Link
      sx={{
        fontSize: "xl",
        fontWeight: "500",
        color: isActiveLink ? "primary.500" : undefined,
        ":hover": {
          textDecoration: "none",
          color: "primary.500",
        },
      }}
      {...props}
    >
      {props.children}
    </Link>
  );
}

export default function Header() {
  return (
    <Stack spacing={0}>
      <HStack
        p={2}
        justifyContent="flex-end"
        backgroundColor="gray.800"
        spacing={6}
      >
        <Flex>
          <Text color="white">English</Text>
        </Flex>
        <HStack spacing={2}>
          <Button
            as={Link}
            size="xs"
            colorScheme="facebook"
            href="https://www.facebook.com/YAHPAMontreal"
          >
            <Icon as={FiFacebook} boxSize={18} color="white" />
          </Button>
          <Button
            as={Link}
            size="xs"
            colorScheme="red"
            href="https://www.youtube.com/channel/UCKFif2TbH7QunfPRzARPSgw"
          >
            <Icon as={FiYoutube} boxSize={18} />
          </Button>
          <Button
            aria-label="instagram"
            as={Link}
            size="xs"
            href="https://www.instagram.com/yahpamontreal/"
            background="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);"
            _hover={{ filter: "brightness(0.90)" }}
          >
            <Icon as={FiInstagram} boxSize={18} color="white" />
          </Button>
        </HStack>
      </HStack>
      <Flex p={2} px={3} alignItems="center" background="gray.100" h="80px">
        <Flex alignItems="center">
          <Image
            src={"/images/logo_wb.png"}
            alt="YAHPA logo"
            objectFit="cover"
            boxSize="60px"
          />
          <Heading mx={3} fontSize="4xl" color="primary.500" letterSpacing={4}>
            YAHPA
          </Heading>
        </Flex>
        <Divider
          orientation="vertical"
          ml={12}
          background="gray.400"
          height="80%"
          width="1px"
        />
        <Box width="100%">
          <HStack as="nav" spacing={6} mx={6} justifyContent="flex-start">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/contribute">Contribute</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </HStack>
        </Box>
      </Flex>
    </Stack>
  );
}
