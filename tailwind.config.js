/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        nunito: ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
      },
      colors: {
        paper: { light: '#fefcf7', DEFAULT: '#fdfbf4', dark: '#1c1a16', darker: '#14120f' },
        ink: { light: '#5c5347', DEFAULT: '#2c2416', dark: '#e8dcc8' },
        gold: {
          50: '#fdf8ef', 100: '#f5e6c8', 200: '#e8d0a0', 300: '#d4b06a',
          400: '#c4a35a', 500: '#b08d3e', 600: '#8a6d2f', 700: '#6b5324',
          800: '#4d3b1a', 900: '#2e2310',
        },
      },
      animation: {
        'page-enter': 'pageEnterRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}