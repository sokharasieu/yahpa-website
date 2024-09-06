import {
  Box,
  BoxProps,
  Flex,
  HStack,
  IconButton,
  IconButtonProps,
  useMediaQuery,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function ButtonNavigation({
  ...props
}: React.PropsWithChildren<IconButtonProps>) {
  return (
    <IconButton
      bg="blackAlpha.500"
      _hover={{
        background: 'blackAlpha.600',
      }}
      _active={{
        background: 'blackAlpha.700',
      }}
      color="white"
      position="absolute"
      top={{ base: '50%' }}
      height={{ base: 'auto' }}
      p={8}
      zIndex={10}
      {...props}
    />
  )
}

export default function Carousel({
  children,
}: React.PropsWithChildren<Record<never, never>>) {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNavigation, setShowNavigation] = useState(false)
  const [autoSlide, setAutoSlide] = useState(true)
  const slidesCount = React.Children.count(children)

  const SLIDES_INTERVAL_TIME = 3000

  const prevSlide = useCallback(() => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1))
  }, [slidesCount])

  const nextSlide = useCallback(() => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1))
  }, [slidesCount])

  const setSlide = (slide: number) => {
    setCurrentSlide(slide)
  }

  // automatically shows the navigation buttons on mobile
  useEffect(() => {
    if (isMobile) {
      setShowNavigation(true)
    } else {
      setShowNavigation(false)
    }
  }, [isMobile])

  // automatically change slides
  useEffect(() => {
    const automatedSlide = setInterval(() => {
      autoSlide ? nextSlide() : null
    }, SLIDES_INTERVAL_TIME)

    return () => clearInterval(automatedSlide)
  }, [slidesCount, nextSlide, autoSlide])

  const onMouseEnterHandler = () => {
    !isMobile && setShowNavigation(true)
    setAutoSlide(false)
  }
  const onMouseLeaveHandler = () => {
    !isMobile && setShowNavigation(false)
    setAutoSlide(true)
  }

  return (
    <Flex
      w="full"
      alignItems="center"
      position="relative"
      justifyContent="center"
      isolation="isolate"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      marginBottom={{ base: 10, lg: 3 }}
    >
      <ButtonNavigation
        aria-label="Prev Slide"
        borderEndRadius="full"
        opacity={showNavigation ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
        left={{ base: 0 }}
        icon={<FiChevronLeft size={32} />}
        onClick={prevSlide}
      />
      <ButtonNavigation
        aria-label="Next Slide"
        borderStartRadius="full"
        opacity={showNavigation ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
        right={{ base: 0 }}
        icon={<FiChevronRight size={32} />}
        onClick={nextSlide}
      />
      <Flex
        w="full"
        position="relative"
        overflow="hidden"
        borderRadius={{ base: 'none', lg: 'xl' }}
      >
        <Flex
          h="500px" //TODO: height might need to be predefined in a config file
          w="full"
          transition="all .5s"
          ml={`-${currentSlide * 100}%`}
        >
          {children}
        </Flex>
      </Flex>
      <HStack justify="center" position="absolute" bottom="-2rem" w="full">
        {Array.from({
          length: slidesCount,
        }).map((_, slide) => (
          <Box
            key={`dots-${slide}`}
            cursor="pointer"
            boxSize={['7px', null, '15px']}
            m="0 2px"
            bg={currentSlide === slide ? 'primary.800' : 'primary.500'}
            rounded="50%"
            display="inline-block"
            transition="background-color 0.6s ease"
            _hover={{
              bg: 'primary.800',
            }}
            onClick={() => setSlide(slide)}
          />
        ))}
      </HStack>
    </Flex>
  )
}

Carousel.Item = function CarouselItem({
  children,
  ...props
}: React.PropsWithChildren<BoxProps>) {
  return (
    <Flex boxSize="full" flex="none" {...props}>
      {children}
    </Flex>
  )
}
