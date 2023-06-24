/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        'Rubik': ["Rubik"]
      },
      gridColumn: {
        'fill-colums': 'repeat(auto-fill, minmax(21rem,1fr))'
      }
    },
  },
  plugins: [],
}

