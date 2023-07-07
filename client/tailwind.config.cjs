/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textcolor: colors.zinc,
        bgcolor: colors.zinc,
        accentcolor: colors.blue,
        green: {
          50: "#ecffe5",
          100: "#d5ffc7",
          200: "#acff95",
          300: "#76ff57",
          400: "#4af626",
          500: "#27dc06",
          600: "#18b100",
          700: "#148605",
          800: "#16690b",
          900: "#14590e",
        },
        black: "black",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar"),
  ],
};
