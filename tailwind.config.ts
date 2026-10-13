import type { Config } from "tailwindcss";

// Palette colours are CSS variables (see globals.css) so one attribute on <html>
// switches the whole site. `<alpha-value>` keeps opacity utilities like bg-spark/20 working.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: v("ink"), soft: v("ink-soft"), mute: v("ink-mute") },
        // `spark` is the accent: red in both palettes.
        spark: { DEFAULT: v("spark"), dark: v("spark-dark"), light: v("spark-light") },
        // `volt` is the secondary tone: the logo blue.
        volt: { DEFAULT: v("volt"), light: v("volt-light") },
        hero: { DEFAULT: v("hero"), eyebrow: v("hero-eyebrow"), blob: v("hero-blob") },
        brand: v("brand"),
        paper: v("paper"),
        // Sanjeeda keeps its own pink identity, independent of the Conductivity palette.
        sanj: { DEFAULT: "#E0457B", dark: "#B92F61", light: "#FDE7EF", deep: "#3A1230" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: { card: "0 1px 2px rgba(11,27,51,.06), 0 8px 24px rgba(11,27,51,.06)" },
    },
  },
  plugins: [],
};
export default config;
