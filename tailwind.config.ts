import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#C4682A",
          light: "#243560",
          dark: "#111C33",
        },
        amber: {
          brand: "#C4682A",
          light: "#F5A832",
          pale: "#FDF3E0",
        },
        tan: {
          DEFAULT: "#C5A47E",
          light: "#D4B896",
          pale: "#F5EEE4",
        },
        terracotta: {
          DEFAULT: "#C4682A",
          light: "#D4803E",
          pale: "#F5E8DC",
        },
        cream: "#FAF9F7",
        stone: {
          50: "#FAF9F7",
          100: "#F5F0EA",
          200: "#E8DDD0",
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.3em",
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee2": "marquee2 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
