/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
      },
      colors: {
        game: {
          bg: "#0a0a1a",
          panel: "#0d1117",
          accent: "#4a9eff",
          "accent-dim": "#1a3a5c",
          border: "#1e3a5f",
        },
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 4px rgba(74, 158, 255, 0.3))",
          },
          "50%": {
            filter: "drop-shadow(0 0 12px rgba(74, 158, 255, 0.7))",
          },
        },
      },
      animation: {
        glow: "glow-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
