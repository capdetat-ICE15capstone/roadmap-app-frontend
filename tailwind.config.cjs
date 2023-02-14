/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-black': "#36393E",
        'nav-gray': "#5E646D"
      },
      fontFamily: {
        "nunito-sans": ['Nunito Sans', "sans-serif"]
      }
    },
  },
  plugins: [],
}
