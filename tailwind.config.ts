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
        "brand-cyan": "#00A9E8",
        "deep-blue": "#0077A8",
        champagne: "#C4A962",
        charcoal: "#202124",
        dark: "#0B0D0F",
        "cool-gray": "#6B7280",
        "light-gray": "#E5E7EB",
        "off-white": "#F8FAFB",
        "premium-dark": "#111418",
        surface: "#FFFFFF",
        elevated: "#F3F6F8",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 4px 24px rgba(11, 13, 15, 0.05)",
        card: "0 12px 40px rgba(11, 13, 15, 0.08)",
        premium: "0 24px 64px rgba(11, 13, 15, 0.12)",
        glow: "0 0 0 1px rgba(0, 169, 232, 0.15), 0 8px 32px rgba(0, 169, 232, 0.12)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-light":
          "radial-gradient(at 40% 20%, rgba(0,169,232,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(196,169,98,0.06) 0px, transparent 50%)",
        "mesh-dark":
          "radial-gradient(at 20% 30%, rgba(0,169,232,0.15) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(196,169,98,0.08) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
