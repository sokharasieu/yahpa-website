import {
  AspectRatio,
  AspectRatioProps,
  Box,
  BoxProps,
  keyframes,
  useToken,
} from "@chakra-ui/react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

const shimmer = keyframes({
  "0%": { backgroundPosition: "0% 0%" },
  "50%": { backgroundPosition: "100% 100%" },
  "100%": { backgroundPosition: "0% 0%" },
});

type NextImagePropsLimitedProps = Partial<
  Pick<NextImageProps, "src" | "alt" | "priority">
>;

type ShimmerProps = {
  isLoading?: boolean;
} & BoxProps;

export function Shimmer({ isLoading, ...boxProps }: ShimmerProps) {
  const [gray1, gray2, gray3] = useToken("colors", [
    "gray.300",
    "gray.400",
    "gray.500",
  ]);

  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      right={0}
      left={0}
      zIndex={1}
      sx={{
        opacity: isLoading ? 1 : 0,
        transition: "opacity 1s ease-out",
        background: `linear-gradient(145deg, ${gray1}, ${gray2}, ${gray3})`,
        backgroundPosition: "0% 0%",
        backgroundSize: "200% 200%",
        animation: `${shimmer} 2s ease-in-out infinite`,
      }}
      {...boxProps}
    />
  );
}

export type ImageProps = NextImagePropsLimitedProps & AspectRatioProps;

export default function Image({
  ratio,
  src = "/images/logo_white.png",
  alt,
  priority,
  ...AspectRatioProps
}: ImageProps) {
  const [loading, setLoading] = useState(true);

  if (priority) {
    return (
      <AspectRatio
        ratio={ratio ?? 4 / 3}
        overflow="hidden"
        {...AspectRatioProps}
      >
        <NextImage
          layout="fill"
          objectFit="cover"
          src={src ?? "/images/logo_white.png"}
          alt={alt}
          priority
        />
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={ratio ?? 4 / 3} overflow="hidden" {...AspectRatioProps}>
      <>
        <Shimmer isLoading={loading} />
        <NextImage
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setLoading(false)}
          src={src ?? "/images/logo_white.png"}
          alt={alt}
        />
      </>
    </AspectRatio>
  );
}
