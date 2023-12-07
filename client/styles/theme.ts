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
      50: "#EBF3E8",
      100: "#D2E3C8",
      300: "#B2C8BA",
      500: "#86A789",
      600: "#86A789",
    },
    primary: "#86A789",
    secondary: "red",
    accent: "blue",
    logo: ""
  },
});

export default theme;
