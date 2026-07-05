import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        status: "hsl(var(--status))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      fontFamily: {
        display: ['"Archivo Variable"', "system-ui", "sans-serif"],
        sans: ["var(--font-raleway)", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        // Hero name: tall condensed uppercase (pair with .stretch-condensed)
        display: [
          "clamp(3.25rem, 9vw, 7.5rem)",
          { lineHeight: "0.92", letterSpacing: "-0.015em", fontWeight: "650" },
        ],
        // Section headers
        title: [
          "clamp(1.625rem, 2.6vw, 2.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.01em", fontWeight: "640" },
        ],
        // HUD label: mono, uppercase, tracked wide — the workhorse style
        label: [
          "0.6875rem",
          { lineHeight: "1.5", letterSpacing: "0.15em", fontWeight: "400" },
        ],
        "label-lg": [
          "0.8125rem",
          { lineHeight: "1.5", letterSpacing: "0.12em", fontWeight: "500" },
        ],
      },
    },
  },
  plugins: [],
};

export default config;
