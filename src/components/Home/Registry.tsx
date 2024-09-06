import {
  Button,
  Collapse,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import Link from 'components/Link'
import Section from 'components/Section'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useState } from 'react'

type RegistryLink = {
  label: string
  link: string
}

const LazyVideoEmbed = dynamic(() => import('components/VideoEmbed'))

export default function Registry() {
  const t = useTranslations()
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false)
  const openFormLinks = () => setShowRegisterForm(!showRegisterForm)

  const REGISTRY_LINKS: RegistryLink[] = [
    {
      label: t('Home.registry_option1'),
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSf4AFg50H2uxIO7FJapvPvDkINePUWVhgq7U-MxTD_GcPkzQA/viewform',
    },
    {
      label: t('Home.registry_option2'),
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSfRESdsjUn9Uc8CunXLYcZCuwYN7YibBZtLZM_fg5IGUHEzTg/viewform',
    },
  ]

  return (
    <Section.Parallax backgroundImageUrl={'/images/bg.jpg'}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} templateRows="auto" spacing={4}>
        <Stack
          height="full"
          width="full"
          justifyContent="center"
          spacing={5}
          color="white"
        >
          <Heading color="primary.400">{t('Home.registry_title')}</Heading>
          <Text>{t('Home.registry_description')}</Text>
          <Flex justifyContent="flex-start" width="100%" margin="auto">
            <Collapse animateOpacity in={!showRegisterForm} unmountOnExit>
              <Button
                onClick={openFormLinks}
                bg="primary.500"
                fontWeight={400}
                _hover={{ bg: 'primary.600' }}
              >
                {t('Home.registry_button')}
              </Button>
            </Collapse>
          </Flex>
          <Collapse animateOpacity in={showRegisterForm} unmountOnExit>
            <Flex justifyContent={{ base: 'center', lg: 'start' }}>
              <Stack spacing={4}>
                {REGISTRY_LINKS?.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    borderRadius="xl"
                    paddingY={2}
                    paddingX={3}
                    display="flex"
                    textAlign="center"
                    justifyContent="center"
                    bg="orange.400"
                    _hover={{ backgroundColor: 'orange.500' }}
                    sx={{
                      svg: { display: 'none' },
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Flex>
          </Collapse>
        </Stack>
        <LazyVideoEmbed
          title={t('Home.registry_video_title')}
          url={'https://www.youtube.com/embed/1rr-lOXWpeI'}
        />
      </SimpleGrid>
    </Section.Parallax>
  )
}
