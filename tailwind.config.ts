import type { Config } from "tailwindcss";

const COLORS = {
  background: "#000000",
  text: "#FFFFFF",
  highlight: "#BFFF00",
} as const;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: COLORS.background,
        text: COLORS.text,
        highlight: COLORS.highlight,
      },
      fontFamily: {
        sans: ['"Uncut Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      letterSpacing: {
        "wider-custom": "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
