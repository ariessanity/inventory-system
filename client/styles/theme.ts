import { extendTheme } from "@chakra-ui/react";
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';

const theme = extendTheme({
  fonts: {
    heading: `'DM Sans', sans-serif`,
    body: `'DM Sans', sans-serif`,
  },
  colors: {
    brand: {
      50: "#DBE2EF",
      // 100: "#3F72AF",
      // 300: "#3F72AF",
      500: "#112D4E",
      600: "#112D4E",
    },
    primary: "#112D4E",
    secondary: "#3F72AF",
    accent: "blue",
    logo: ""
  },
});

export default theme;
