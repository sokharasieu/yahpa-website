import { Container, ContainerProps } from "@chakra-ui/react";

function OuterSection({ children, ...containerProps }: ContainerProps) {
  return (
    <Container
      as="section"
      maxW="full"
      bg="gray.100"
      p={{ base: "2rem", md: "5rem" }}
      {...containerProps}
    >
      {children}
    </Container>
  );
}

function InnerSection({ children, ...containerProps }: ContainerProps) {
  return (
    <Container
      padding={0}
      maxW={{ base: "full", md: "2xl", lg: "4xl", xl: "6xl" }}
      {...containerProps}
    >
      {children}
    </Container>
  );
}

export default function Section({
  children,
  ...containerProps
}: ContainerProps) {
  return (
    <OuterSection {...containerProps}>
      <InnerSection>{children}</InnerSection>
    </OuterSection>
  );
}

Section.Inner = InnerSection;
Section.Outer = OuterSection;

type SectionWithParallaxProps = {
  backgroundImageUrl?: string;
} & ContainerProps;

Section.Parallax = function SectionWithParallax({
  children,
  backgroundImageUrl,
  ...containerProps
}: SectionWithParallaxProps) {
  return (
    <Section
      position="relative"
      backgroundImage={`url(${backgroundImageUrl})`}
      backgroundAttachment="fixed"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      zIndex={0}
      _before={{
        content: "' '",
        display: "block",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: backgroundImageUrl ? "blackAlpha.600" : undefined,
      }}
      {...containerProps}
    >
      {children}
    </Section>
  );
};
