/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#427fbe',
        accentWhite: '#fafafa',
        accentGrey: '#DBDBDB',
        accentGreen: '#edeee2',
        accentYellow: '#fffef0'
      }
    },
  },
  plugins: [],
}
