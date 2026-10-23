import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f6f8fb",
        card: "#ffffff",
        ink: { DEFAULT: "#17233b", soft: "#4a5876", mute: "#7886a3" },
        line: "#e3e8f1",
        brand: { DEFAULT: "#1f6feb", soft: "#e8f0ff", dark: "#1650b0" },
        teal: { DEFAULT: "#0e9f8e", soft: "#e2f6f3" },
        amber: { DEFAULT: "#d98a0b", soft: "#fff3dc" },
        calm: { DEFAULT: "#5b6fb3", soft: "#eceffa" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-deva)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "14px", "2xl": "20px" },
      boxShadow: { soft: "0 1px 2px rgba(23,35,59,.05), 0 6px 20px -8px rgba(23,35,59,.10)" },
    },
  },
  plugins: [],
};
export default config;
