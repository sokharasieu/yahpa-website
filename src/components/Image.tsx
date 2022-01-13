import {
  AspectRatio,
  AspectRatioProps,
  Box,
  keyframes,
  useToken,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";

const shimmer = keyframes({
  "0%": { backgroundPosition: "0% 0%" },
  "50%": { backgroundPosition: "100% 100%" },
  "100%": { backgroundPosition: "0% 0%" },
});

type ImageProps = React.ComponentPropsWithRef<typeof NextImage> &
  AspectRatioProps;

export default function Image({
  ratio,
  src,
  alt,
  ...AspectRatioProps
}: ImageProps) {
  const [loading, setLoading] = useState(false);
  const [gray1, gray2, gray3] = useToken("colors", [
    "gray.300",
    "gray.400",
    "gray.500",
  ]);

  return (
    <AspectRatio ratio={ratio ?? 4 / 3} overflow="hidden" {...AspectRatioProps}>
      <>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            zIndex: 1,
            opacity: !loading ? 1 : 0,
            transition: "opacity 1s ease-out",
            background: `linear-gradient(145deg, ${gray1}, ${gray2}, ${gray3})`,
            backgroundPosition: "0% 0%",
            backgroundSize: "200% 200%",
            width: "100%",
            height: "100%",
            animation: `${shimmer} 2s ease-in-out infinite`,
          }}
        />
        <NextImage
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setLoading(true)}
          src={src}
          alt={alt}
        />
      </>
    </AspectRatio>
  );
}
