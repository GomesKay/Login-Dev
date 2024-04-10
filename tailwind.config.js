/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      gray: "#64748B",
      night: "#121212",
      red: "#DC2626",
      white: "#FFFFFF",
    },
    extend: {
      backgroundImage: {
        mountain: "url('/mountain_6000.jpg')",
      },
      fontFamily: {
        sans: ["Bebas Neue", "sans-serif"],
        serif: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: { min: "320px", max: "425px" },
        // => @media (min-width: 320px and max-width: 425px)
        md: { min: "426px", max: "768px" },
        // => @media (min-width: 426px and max-width: 768px)
        lg: { min: "769px", max: "1024px" },
        // => @media (min-width: 769px and max-width: 1024px)
      },
    },
  },
  plugins: [],
};
