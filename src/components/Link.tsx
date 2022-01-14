import { Icon, Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import NextLink from "next/link";
import { FiExternalLink } from "react-icons/fi";

export default function Link({
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  const { locale } = useTranslation();
  const isExternal = !!(props?.href as string).match(/^(https?:)?\/\//);
  return (
    <NextLink href={props.href as string} passHref>
      <ChakraLink
        {...props}
        display="inline-flex"
        alignItems="center"
        color="primary.700"
        isExternal={isExternal}
        lang={locale}
      >
        {children}
        {isExternal && <Icon as={FiExternalLink} ml={1} boxSize={4} />}
      </ChakraLink>
    </NextLink>
  );
}
