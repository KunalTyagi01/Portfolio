import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#061015",
        panel: "#0b1820",
        line: "rgba(148, 163, 184, 0.18)",
        mint: "#49f2c2",
        cyan: "#50c7f6",
        coral: "#ff8066",
      },
      boxShadow: {
        glow: "0 0 48px rgba(73, 242, 194, 0.16)",
        card: "0 24px 80px rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
