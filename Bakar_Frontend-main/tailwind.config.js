/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFE8E0',
          100: '#FFD5C6',
          200: '#FFAF93',
          300: '#FF8A60',
          400: '#FF6B35',
          500: '#FF4800',
          600: '#CC3A00',
          700: '#992B00',
          800: '#661D00',
          900: '#330E00',
        },
        secondary: {
          DEFAULT: '#4B6043',
          50: '#E8EBE6',
          100: '#D1D7CD',
          200: '#A3AF9B',
          300: '#758769',
          400: '#4B6043',
          500: '#3D4D36',
          600: '#2F3A29',
          700: '#21271C',
          800: '#13140F',
          900: '#050602',
        },
        background: '#F9F9F9',
        text: '#2E2E2E',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
