/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052D9',
        secondary: '#7C4DFF',
        'bg-dark': '#121212',
        surface: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
}
