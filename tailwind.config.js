/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#232C69",
        blue: "#5082B8",
        green: "#68BB9A",
        yellow: "#F2AD37",
        orange: "#E87357",
        pink: "#EA5B7D",
      },
    },
  },
  plugins: [nextui()],
};
