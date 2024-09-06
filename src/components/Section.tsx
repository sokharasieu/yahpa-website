import { Box, BoxProps, Container, ContainerProps } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'

type SectionProps = ContainerProps

function OuterSection({ children, ...containerProps }: SectionProps) {
  return (
    <Container
      as="section"
      maxW="full"
      bg="white"
      paddingLeft={{ base: '1rem', md: '5rem' }}
      paddingRight={{ base: '1rem', md: '5rem' }}
      paddingTop={{ base: '1rem', md: '5rem' }}
      paddingBottom={{ base: '1rem', md: '5rem' }}
      {...containerProps}
    >
      {children}
    </Container>
  )
}

function InnerSection({ children, ...containerProps }: SectionProps) {
  return (
    <Container
      padding={0}
      maxW={{ base: 'full', md: '3xl', lg: '5xl', xl: '8xl' }}
      {...containerProps}
    >
      {children}
    </Container>
  )
}

export default function Section({ children, ...containerProps }: SectionProps) {
  return (
    <OuterSection {...containerProps}>
      <InnerSection>{children}</InnerSection>
    </OuterSection>
  )
}

Section.Inner = InnerSection
Section.Outer = OuterSection

type SectionWithParallaxProps = {
  backgroundImageUrl?: string
} & SectionProps

Section.Parallax = function SectionWithParallax({
  children,
  backgroundImageUrl,
  ...containerProps
}: SectionWithParallaxProps) {
  return (
    <Section
      position="relative"
      backgroundImage={`url(${backgroundImageUrl})`}
      backgroundAttachment={{ base: 'scroll', lg: 'fixed' }}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      zIndex={0}
      _before={{
        content: "' '",
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: backgroundImageUrl ? 'blackAlpha.600' : undefined,
      }}
      {...containerProps}
    >
      {children}
    </Section>
  )
}

const MotionBox = motion<BoxProps>(Box)

Section.Fade = function SeciontWithFade({
  children,
  ...sectionProps
}: SectionProps) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <Section overflowY="hidden" {...sectionProps}>
      <MotionBox
        initial={
          shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 64 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transitionDuration="0.2s"
      >
        {children}
      </MotionBox>
    </Section>
  )
}
