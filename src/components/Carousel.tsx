import {
  ButtonGroup,
  chakra,
  Container,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactMultiCarousel, {
  ButtonGroupProps,
  ResponsiveType,
} from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const defaultResponsiveConfig: ResponsiveType = {
  xl: {
    breakpoint: { max: 3000, min: 1201 },
    items: 4,
    partialVisibilityGutter: 20,
  },
  lg: {
    breakpoint: { max: 1200, min: 961 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  md: {
    breakpoint: { max: 960, min: 769 },
    items: 3,
    partialVisibilityGutter: 20,
  },
  sm: {
    breakpoint: { max: 768, min: 481 },
    items: 2,
    partialVisibilityGutter: 80,
  },
  base: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    partialVisibilityGutter: 150,
  },
};

function CustomButtonGroup({
  next,
  previous,
  carouselState,
}: ButtonGroupProps) {
  const lastIndex = carouselState?.totalItems!! - carouselState?.slidesToShow!!;
  const allItemsVisible =
    carouselState?.totalItems!! - carouselState?.slidesToShow!! === 0;
  return (
    <ButtonGroup
      position="absolute"
      right={{ base: "0rem", md: "1rem" }}
      top={0}
      transform="translateY(-100%)"
      paddingY={3}
      size="sm"
      display={allItemsVisible ? "none" : "block"}
    >
      <IconButton
        aria-label="previous"
        borderRadius="full"
        border="0.5px solid"
        borderColor="gray.300"
        disabled={carouselState?.currentSlide === 0 ? true : false}
        onClick={previous}
        icon={<FiChevronLeft size="1.5rem" />}
      />
      <IconButton
        aria-label="next"
        borderRadius="full"
        border="0.5px solid"
        borderColor="gray.300"
        disabled={carouselState?.currentSlide === lastIndex ? true : false}
        onClick={next}
        icon={<FiChevronRight size="1.5rem" />}
      />
    </ButtonGroup>
  );
}

const ChakraCarousel = chakra(ReactMultiCarousel);

type CarouselProps = {
  title?: string;
} & React.ComponentProps<typeof ChakraCarousel>;

export default function Carousel({
  children,
  title,
  responsive,
  renderButtonGroup,
  ...props
}: CarouselProps) {
  return (
    <>
      {title && (
        <Heading maxW="80%" fontSize={{ base: "2xl", lg: "3xl" }} p={3}>
          {title}
        </Heading>
      )}
      <Container padding={0} maxW="full" position="relative">
        <ChakraCarousel
          ssr={true}
          partialVisible={true}
          removeArrowOnDeviceType={["base", "sm", "md", "lg", "xl"]}
          responsive={responsive}
          customButtonGroup={<CustomButtonGroup />}
          renderButtonGroupOutside={true}
          {...props}
        >
          {children}
        </ChakraCarousel>
      </Container>
    </>
  );
}
