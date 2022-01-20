import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation, { Resource } from "hooks/useTranslation";
import SocialMedia from "./SocialMedia";

function ListHeader({ children }: React.PropsWithChildren<{}>) {
  return (
    <Text fontWeight={"700"} fontSize={"lg"} fontStyle="bold" mb={2}>
      {children}
    </Text>
  );
}

export default function Footer() {
  const { t, languages, updateLocale, locales, locale } = useTranslation();

  const handleLocaleChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const newLocale = (e.target as HTMLAnchorElement).lang;
    updateLocale(newLocale);
  };

  return (
    <Box bg="gray.700" color="whiteAlpha.800" pt={10}>
      <Container as={Stack} maxW={"6xl"}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>{t("organization")}</ListHeader>
            <Link href="/projects">{t("projects")}</Link>
            <Link href="/about">{t("about")}</Link>
            <Link href="/contribute">{t("contribute")}</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>{t("languages")}</ListHeader>
            {locales?.map((language) => (
              <Link
                key={language}
                lang={language}
                href={language}
                onClick={handleLocaleChange}
              >
                {languages[language as Resource]}
              </Link>
            ))}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>{t("support")}</ListHeader>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Link href="/contact">{t("contact")}</Link>
              <Tag
                size={"sm"}
                bg={useColorModeValue("red.300", "red.800")}
                ml={2}
                color={"white"}
              >
                {t("coming_soon")}
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
          <Stack
            alignItems={{ base: "center", lg: "flex-start" }}
            mt={5}
            spacing={0}
          >
            <Text fontWeight={600}>{t("follow_social")}</Text>
            <SocialMedia px={0} spacing={4}>
              <SocialMedia.Facebook />
              <SocialMedia.Youtube />
              <SocialMedia.Instagram />
              <SocialMedia.WeChat />
            </SocialMedia>
          </Stack>
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
