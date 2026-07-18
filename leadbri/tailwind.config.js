/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
        satoshi: ['Satoshi', 'system-ui', 'sans-serif'],
      },},
  },
  plugins: [],
}