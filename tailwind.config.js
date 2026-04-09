/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0f172a', // slate-900
          gold: '#f59e0b', // amber-500
          light: '#f8fafc', // slate-50
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Cinzel Decorative"', 'serif'],
      }
    },
  },
  plugins: [],
}
