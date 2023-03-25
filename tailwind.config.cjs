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
        'nav-gray': "#5E646D",
        'nav-blue': "#00286E",
        'main-blue': "#00286E",
        'sub-blue': "#0047C4"
      },
      fontFamily: {
        "nunito-sans": ['Nunito Sans', "sans-serif"],
        "inter": ['Inter', "sans-serif"]
      }
    },
  },
  plugins: [],
}
