/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#00286E",
        "light-blue": "#0047C4",
        "gray-background": "#F2F2F2",
        "button-pink": "#F43054",
        'nav-black': "#36393E",
        'nav-gray': "#5E646D",
        'nav-blue': "#00286E"
      },
      fontFamily: {
        "nunito-sans": ['Nunito Sans', "sans-serif"],
        "inter": ['Inter', "sans-serif"]
      }
    },
  },
  plugins: [],
}
