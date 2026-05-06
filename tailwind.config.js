/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "#09768D",
        tealTint: "rgba(9, 118, 141, 0.4)",
        tealOverlay: "rgba(9, 118, 141, 0.3)",
        surface: "#D0D9DC",
      },
      fontFamily: {
        sans: ['"GT Walsheim Trial"', "system-ui", "-apple-system", "sans-serif"],
        rounded: ["ui-rounded", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
        pill: "12px",
        panel: "28px",
      },
      boxShadow: {
        panel: "0 4px 28px rgba(0, 0, 0, 0.12)",
      },
      backdropBlur: {
        panel: "26px",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateX(-2%) scale(1.05)" },
          "50%": { transform: "translateX(2%) scale(1.05)" },
        },
        driftSlow: {
          "0%, 100%": { transform: "translateX(1%) scale(1.08)" },
          "50%": { transform: "translateX(-1%) scale(1.08)" },
        },
      },
      animation: {
        drift: "drift 24s ease-in-out infinite",
        "drift-slow": "driftSlow 36s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
