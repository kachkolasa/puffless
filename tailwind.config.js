/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './node_modules/@ionic/react/**/*.js' // Include Ionic React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

