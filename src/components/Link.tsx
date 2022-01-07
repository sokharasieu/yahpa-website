import NextLink from "next/link";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

export default function Link({
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  const isExternal = !!(props?.href as string).match(/^(https?:)?\/\//);
  return (
    <NextLink href={props.href as string} passHref>
      <ChakraLink {...props} isExternal={isExternal}>
        {children}
      </ChakraLink>
    </NextLink>
  );
}
