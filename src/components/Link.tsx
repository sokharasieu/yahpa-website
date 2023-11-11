import { Icon, Text, Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FiExternalLink } from 'react-icons/fi'

export default function Link({
  children,
  hideIcon = false,
  ...props
}: React.PropsWithChildren<LinkProps & { hideIcon?: boolean }>) {
  const { locale } = useRouter()

  if (!props.href) {
    return <Text>{children}</Text>
  }

  const isExternal =
    !hideIcon && !!(props?.href as string).match(/^(https?:)?\/\//)
  return (
    <NextLink href={props.href as string} passHref>
      <ChakraLink
        as="span"
        display="inline-flex"
        alignItems="center"
        isExternal={isExternal}
        lang={locale}
        hrefLang={locale}
        {...props}
      >
        {children}
        {isExternal && <Icon as={FiExternalLink} ml={1} boxSize={4} />}
      </ChakraLink>
    </NextLink>
  )
}
