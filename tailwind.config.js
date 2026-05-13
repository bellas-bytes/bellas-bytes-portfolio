/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Chatime", "cursive"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        cyan: {
          deep: "#1e3a5a",
          mid: "#3a6a94",
          light: "#6a9cc4",
          wash: "#8bb4d4",
          paper: "#f0ebe1",
          cream: "#faf6ee",
        },
      },
    },
  },
  plugins: [],
};
