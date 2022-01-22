import { AspectRatio, AspectRatioProps, Box } from "@chakra-ui/react";
import { useState } from "react";
import { Shimmer } from "./Image";

type VideoEmbedProps = {
  url: string;
  title?: string;
} & AspectRatioProps;

export default function VideoEmbed({
  url,
  title,
  ...aspectRatioProps
}: VideoEmbedProps) {
  const [isLoading, setLoading] = useState(true);
  return (
    <AspectRatio
      ratio={4 / 3}
      borderRadius="lg"
      boxShadow="xl"
      overflow="hidden"
      {...aspectRatioProps}
    >
      <>
        <Shimmer isLoading={isLoading} zIndex={0} />
        <Box
          as="iframe"
          title={title}
          src={url}
          frameBorder="0"
          loading="lazy"
          onLoad={() => setLoading(false)}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </>
    </AspectRatio>
  );
}
