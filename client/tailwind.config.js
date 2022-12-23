/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: { colors: {
      green: colors.emerald,
      yellow: colors.amber,
      purple: colors.violet,
      current: 'currentColor',
    }},
  },
  plugins: [],
}

