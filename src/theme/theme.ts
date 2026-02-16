
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#4F46E5",
      background: "#F5F7FA",
    },
    status: {
      surgery: "#F97316",
      specialist: "#22C55E",
      finance: "#EAB308",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.background",
      },
    },
  },
  fonts: {
    heading: "Manrope, Inter",
    body: "Manrope, Inter",
  },
});

export default theme;
