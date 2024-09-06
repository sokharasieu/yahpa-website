import { Container, ContainerProps } from '@chakra-ui/react'

export default function Page({ children, ...containerProps }: ContainerProps) {
  return (
    <Container maxWidth="full" p={0} {...containerProps}>
      {children}
    </Container>
  )
}
