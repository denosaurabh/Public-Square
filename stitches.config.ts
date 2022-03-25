import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    fonts: {
      // main: "Satoshi-Variable",
      main: "ClashGrotesk-Variable",
      sansSerif: "EBGaramond",

      websafe: `-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif`,
    },
    colors: {
      grey100: "#FFFFFF",
      grey200: "#EEEEEE",
      grey300: "#DDDDDD",
      grey400: "#323232",
      grey500: "#222222",
      grey600: "#111111",

      // bg: "#d4d6d4",
      // textColor: "#2d2d2d",
      // textColorDark: "#2e2e2e",
      // alertBg: "#DEDEDE",
    },

    fontSizes: {
      xs: "10px",
      sm: "14px",
      md: "16px",
      lg: "19px",
      xl: "24px",
      xxl: "35px",
    },
    radii: {
      900: "20px",
      500: "14px",
    },
  },
  media: {
    ["mobile-small"]: "(max-width: 300px)",
    mobile: "(max-width: 500px)",
    tablet: "(max-width: 768px)",
    laptop: "(max-width: 1024px)",
    desktop: "(max-width: 1200px)",
    tv: "(min-width: 1201px)",
  },
});

export const darkTheme = createTheme("dark-theme", {
  colors: {
    grey600: "#FFFFFF",
    grey500: "#EEEEEE",
    grey400: "#DDDDDD",
    grey300: "#323232",
    grey200: "#222222",
    grey100: "#111111",
  },
});

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "html, body, #__next": {
    width: "100%",
    minHeight: "100vh",
    height: "fit-content",

    backgroundColor: "$grey100",

    fontSize: "62.5%",
    fontFamily: "$main",
    fontWeight: 400,

    overflowX: "hidden",

    "@laptop": {
      fontSize: "58%",
    },
    "@tablet": {
      fontSize: "54%",
    },
    "@mobile": {
      fontSize: "48%",
    },
    "@mobile-small": {
      fontSize: "42%",
    },
  },

  html: {
    overflowY: "scroll",
    backgroundColor: "$grey100",
  },
  body: {
    margin: "0",
    fontFamily: "$main",
    lineHeight: "20px",
    backgroundColor: "$grey100",
  },
  a: {
    textDecoration: "underline",
    color: "inherit",
  },
  button: {
    border: "none",
  },
  input: {
    border: "none",
    outline: "none",
  },

  "::-webkit-scrollbar": {
    width: "3px",
  },
  "::-webkit-scrollbar-track": {
    borderRadius: "10px",
  },
  "::-webkit-scrollbar-thumb": {
    background: "$grey100",
    borderRadius: "10px",
  },

  "@font-face": [
    {
      fontFamily: "Satoshi-Variable",
      src: `url('/fonts/Satoshi-Variable.woff2') format('woff2')`,
      fontDisplay: "optional",
      fontStyle: "normal",
    },
    {
      fontFamily: "ClashGrotesk-Variable",
      src: `url('/fonts/ClashGrotesk-Variable.woff2') format('woff2')`,
      fontDisplay: "optional",
      fontStyle: "normal",
    },
    {
      fontFamily: "EBGaramond",
      src: `url('/fonts/EBGaramond-Regular.woff2') format('woff2')`,
      fontDisplay: "optional",
      fontStyle: "normal",
    },
    {
      fontFamily: "EBGaramond",
      src: `url('/fonts/EBGaramond-Italic.woff2') format('woff2')`,
      fontDisplay: "optional",
      fontStyle: "italic",
    },
  ],
});
