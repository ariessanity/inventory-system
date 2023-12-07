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
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

export default theme;
