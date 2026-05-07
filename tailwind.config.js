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
        rounded: ['"SF Pro Rounded"', "ui-rounded", "system-ui", "sans-serif"],
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
          // Moves from slightly left to slightly right
          "0%, 100%": { transform: "translateX(-8%) scale(1.1)" },
          "50%": { transform: "translateX(8%) scale(1.1)" },
        },
        driftSlow: {
          // Moves in the opposite direction for parallax depth
          "0%, 100%": { transform: "translateX(6%) scale(1.1)" },
          "50%": { transform: "translateX(-6%) scale(1.1)" },
        },
      },
      animation: {
        drift: "drift 8s ease-in-out infinite",
        "drift-slow": "driftSlow 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
