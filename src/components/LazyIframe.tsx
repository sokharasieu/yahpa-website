import { useRef } from "react";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { Box, AspectRatio, AspectRatioProps } from "@chakra-ui/react";
import { Shimmer } from "./Image";

type LazyIframeProps = {
  url: string;
  title?: string;
} & AspectRatioProps;

export default function LazyIframe({
  url,
  title,
  ...aspectRatioProps
}: LazyIframeProps) {
  const containerRef = useRef(null);
  const lockRef = useRef(false);
  const entry = useIntersectionObserver(containerRef, {});
  const isVisible = !!entry?.isIntersecting;

  if (isVisible && !lockRef.current) {
    lockRef.current = true;
  }

  return (
    <AspectRatio
      borderRadius="lg"
      boxShadow="xl"
      overflow="hidden"
      margin="auto"
      ref={containerRef}
      {...aspectRatioProps}
    >
      {lockRef.current ? (
        <Box
          as="iframe"
          title={title}
          src={url}
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <Shimmer isLoading={true} />
      )}
    </AspectRatio>
  );
}
