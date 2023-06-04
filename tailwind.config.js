/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ef1d26",
        secondary: "#121212",
        buttonColor: "#2196F3",
        textPrimary: "#001F3F",
      },
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
  },
  // plugins: [require("daisyui")],
});
