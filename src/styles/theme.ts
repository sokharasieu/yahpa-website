import { extendTheme, theme as BaseTheme, Theme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

const breakpoints = createBreakpoints({
  sm: "480px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1440px",
});

const styles = {
  ...BaseTheme.styles,
  global: () => ({
    body: {
      fontFamily: "body",
      color: "gray.800",
      bg: "gray.50",
      lineHeight: "base",
    },
    html: {
      boxSizing: "border-box",
    },
    "*::placeholder": {
      color: "gray.400",
    },
    "*, *::before, &::after": {
      borderColor: "gray.200",
      wordWrap: "break-word",
      boxSizing: "inherit",
    },
    ul: {
      listStyle: "none",
    },
    "html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6":
      {
        margin: 0,
        padding: 0,
      },
  }),
};
const theme: Dict<Theme> = extendTheme({
  ...BaseTheme,
  styles,
  breakpoints,
  fonts: {
    body: "Lato",
    heading: "Lato",
  },
  colors: {
    ...BaseTheme.colors,
    primary: {
      "50": "#E8F8FD",
      "100": "#BEEAF8",
      "200": "#95DDF4",
      "300": "#6BCFF0",
      "400": "#42C2EB",
      "500": "#18B4E7",
      "600": "#1390B9",
      "700": "#0E6C8B",
      "800": "#0A485C",
      "900": "#05242E",
    },
  },
});

export default theme;
