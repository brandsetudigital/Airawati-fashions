/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#5C1329',
          dark: '#430D1E',
          deep: '#300814',
          light: '#7A1A37'
        },
        gold: {
          DEFAULT: '#C5A059',
          dark: '#A37F38',
          light: '#DFBF7A',
          cream: '#F4ECE0',
          bg: '#FDFBF7'
        },
        silk: {
          cream: '#FAF6F0',
          ivory: '#FFFDF9',
          subtle: '#F5EFE6'
        },
        espresso: {
          DEFAULT: '#1E060D',
          dark: '#140308',
          soft: '#2D121B'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(92, 19, 41, 0.12)',
        'luxury-lg': '0 20px 40px -15px rgba(92, 19, 41, 0.2)',
      }
    },
  },
  plugins: [],
}
