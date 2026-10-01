import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B1B33", soft: "#1B2F4F", mute: "#5B6B85" },
        spark: { DEFAULT: "#00B8A9", dark: "#008F84", light: "#D9F5F2" },
        volt: { DEFAULT: "#F5A524", light: "#FEF1D8" },
        sanj: { DEFAULT: "#E0457B", dark: "#B92F61", light: "#FDE7EF", deep: "#3A1230" },
        paper: "#F6F8FB",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: { card: "0 1px 2px rgba(11,27,51,.06), 0 8px 24px rgba(11,27,51,.06)" },
    },
  },
  plugins: [],
};
export default config;
