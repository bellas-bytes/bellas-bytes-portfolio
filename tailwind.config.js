/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        "heart-float": {
          "0%": { opacity: 1, transform: "translateY(0) scale(1)" },
          "100%": { opacity: 0, transform: "translateY(-60px) scale(1.5)" },
        },
      },
      animation: {
        "heart-float": "heart-float 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
