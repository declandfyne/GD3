/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        concrete: '#D9D4CC',
        black: '#111111',
        bone: '#F3F1EC',
        primary: '#9F3A2D', // Red Oxide
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"Inter"', 'sans-serif'],
        data: ['"Space Mono"', 'monospace'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}

