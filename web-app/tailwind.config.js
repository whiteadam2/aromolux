/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "custom-bg": "#ffbd2f",
        "body-color": "#ffd57a",
      },
    },
  },
  plugins: [],
};
