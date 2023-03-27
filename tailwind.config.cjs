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
      },
      width: {
        '18':'4.5rem',
        '128': '32rem',
        '256': '64rem'
      },
      flexGrow: {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      }
    },
  },
  plugins: [],
}
