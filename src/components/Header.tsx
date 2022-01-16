import {
  Box,
  Collapse,
  Flex,
  Heading,
  HStack,
  IconButton,
  Img,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import { useRouter } from "next/router";
import React from "react";
import {
  FiChevronLeft,
  FiFacebook,
  FiInstagram,
  FiMenu,
  FiX,
  FiYoutube,
} from "react-icons/fi";
import LanguagePicker from "./LanguagePicker";
import Link from "./Link";

function NavLink({
  children,
  ...linkProps
}: React.ComponentProps<typeof Link>) {
  const router = useRouter();
  const isActiveLink = router.asPath === linkProps.href;

  return (
    <Link
      fontSize="xl"
      fontWeight="500"
      position="relative"
      sx={{
        color: isActiveLink ? "primary.500" : undefined,
        ":after": {
          content: "''",
          display: isActiveLink ? "block" : "none",
          position: "absolute",
          bottom: "-0.75em",
          left: 0,
          width: "100%",
          backgroundColor: "primary.500",
          height: 1,
        },
        ":hover, :focus": {
          transition: "all 0.2s ease-in-out",
          textDecoration: "none",
          color: "primary.500",
          ":after": {
            content: "''",
            display: "block",
            position: "absolute",
            bottom: "-0.75em",
            left: 0,
            width: "100%",
            backgroundColor: "primary.500",
            height: 1,
          },
        },
      }}
      {...linkProps}
    >
      {children}
    </Link>
  );
}

function MenuLink({
  children,
  ...linkProps
}: React.ComponentProps<typeof Link>) {
  return (
    <NavLink
      p={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "xl",
        borderBottom: "1px solid",
        borderColor: "gray.300",
        svg: {
          opacity: 0,
          color: "primary.500",
        },
        ":last-child": {
          borderColor: "gray.500",
        },
        ":hover, :focus": {
          backgroundColor: "gray.200",

          svg: {
            opacity: 1,
          },
        },
      }}
      {...linkProps}
    >
      <Text>{children}</Text>
      <FiChevronLeft size={24} />
    </NavLink>
  );
}

type SocialMediaButtonProps = React.PropsWithChildren<
  React.ComponentPropsWithRef<typeof Link>
>;

function SocialMediaButton({ children, ...linkProps }: SocialMediaButtonProps) {
  return (
    <Link
      p={1}
      borderRadius="md"
      sx={{
        svg: {
          ":last-child": {
            display: "none",
          },
        },
      }}
      {...linkProps}
    >
      {children}
    </Link>
  );
}

export function Topbar() {
  const { t } = useTranslation();
  return (
    <HStack
      py={2}
      px={3}
      justifyContent={{ base: "flex-end", md: "space-between" }}
      backgroundColor="gray.800"
      spacing={6}
    >
      <Text color="white" display={{ base: "none", md: "block" }}>
        {t("yahpa_full")}
      </Text>
      <Flex>
        <LanguagePicker mr={4} />
        <HStack spacing={2}>
          <SocialMediaButton
            aria-label="facebook page"
            bg="facebook.500"
            _hover={{ backgroundColor: "facebook.400" }}
            href="https://www.facebook.com/YAHPAMontreal"
          >
            <FiFacebook size={18} color="white" />
          </SocialMediaButton>
          <SocialMediaButton
            aria-label="youtube channel"
            bg="red.500"
            _hover={{ backgroundColor: "red.400" }}
            href="https://www.youtube.com/channel/UCKFif2TbH7QunfPRzARPSgw"
          >
            <FiYoutube size={18} color="white" />
          </SocialMediaButton>
          <SocialMediaButton
            aria-label="youtube channel"
            bg="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)"
            _hover={{ filter: "brightness(0.80)" }}
            href="https://www.instagram.com/yahpamontreal/"
          >
            <FiInstagram size={18} color="white" />
          </SocialMediaButton>
        </HStack>
      </Flex>
    </HStack>
  );
}

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <Stack spacing={0}>
        <Topbar />
        <Flex
          position="relative"
          zIndex="10"
          p={0}
          px={3}
          alignItems="center"
          background="whiteAlpha.500"
          h={{ base: "70px", md: "60px" }}
          boxShadow={{ base: undefined, md: "md" }}
        >
          <Flex alignItems="center" mr={8}>
            <Img
              src={"/images/logo_wb.png"}
              alt="YAHPA logo"
              objectFit="cover"
              boxSize="60px"
            />
            <Heading
              mx={3}
              fontSize="4xl"
              color="primary.500"
              letterSpacing={2}
              fontFamily="Helvetica"
            >
              {t("yahpa")}
            </Heading>
          </Flex>
          <Box width="100%" display={{ base: "none", md: "block" }}>
            <HStack as="nav" spacing={6} mx={6} justifyContent="flex-start">
              <NavLink href="/">{t("home")}</NavLink>
              <NavLink href="/projects">{t("projects")}</NavLink>
              <NavLink href="/about">{t("about")}</NavLink>
              <NavLink href="/contribute">{t("contribute")}</NavLink>
              <NavLink href="/contact">{t("contact")}</NavLink>
            </HStack>
          </Box>
          <Flex
            width="100%"
            display={{ base: "flex", md: "none" }}
            justifyContent="flex-end"
          >
            <IconButton
              aria-label={isOpen ? "close menu" : "open menu"}
              backgroundColor="gray.200"
              _hover={{ backgroundColor: "gray.300" }}
              icon={isOpen ? <FiX /> : <FiMenu />}
              onClick={isOpen ? onClose : onOpen}
            />
          </Flex>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box px={3} py={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={0} px={2}>
              <MenuLink href="/">{t("home")}</MenuLink>
              <MenuLink href="/projects">{t("projects")}</MenuLink>
              <MenuLink href="/about">{t("about")}</MenuLink>
              <MenuLink href="/contribute">{t("contribute")}</MenuLink>
              <MenuLink href="/contact">{t("contact")}</MenuLink>
            </Stack>
          </Box>
        </Collapse>
      </Stack>
    </>
  );
}
