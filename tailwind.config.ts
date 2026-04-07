import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        cc: {
          purple: "var(--cc-purple)",
          green: "var(--cc-green)",
          blue: "var(--cc-blue)",
          pink: "var(--cc-pink)",
          yellow: "var(--cc-yellow)",
          red: "var(--cc-red)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
