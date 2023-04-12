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
        'nav-blue': "#00286E",
        'main-blue': "#00286E",
        'sub-blue': "#0047C4"
      },
      fontFamily: {
        "nunito-sans": ['Nunito Sans', "sans-serif"],
        "inter": ['Inter', "sans-serif"]
      },
      screens: {
        'max-2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'max-xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'max-lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        'max-md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        'max-sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      }
    },
  },
  plugins: [],
}
