import { Breadcrumb, BreadcrumbItem, Heading, Stack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import Link from './Link'
import Section from './Section'

type PageTitleProps = {
  title?: string
  translatedTitle?: string
}

export default function PageTitle({ title, translatedTitle }: PageTitleProps) {
  const t = useTranslations('App')

  return (
    <Section
      backgroundColor="gray.800"
      paddingY={{ base: '2rem', md: '3rem' }}
      color="white"
      bgGradient="linear(70deg,primary.400 30%, primary.500 50%, primary.600 100%)"
    >
      <Stack fontSize="lg">
        <Heading>{title}</Heading>
        <Breadcrumb alignItems="center">
          <BreadcrumbItem>
            <Link href="/">{t('home')}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link>{translatedTitle}</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>
    </Section>
  )
}
