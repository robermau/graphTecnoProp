/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      fontFamily: {
        principal: ['"Helvetica Rounded LT Std"', 'Arial', 'sans-serif'],
        secundaria: ['"Helvetica LT Std Light"', 'Arial', 'sans-serif'],
        terciaria: ['"DM Sans"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
