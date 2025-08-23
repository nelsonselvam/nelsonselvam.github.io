/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather', 'ui-sans-serif','system-ui','-apple-system','Segoe UI','Inter','Noto Sans','Ubuntu'],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2,6,23,0.08)"
      },
      colors: {
        accent: {
          DEFAULT: "#2563eb",
          dark: "#1e40af"
        }
      }
    },
  },
  plugins: [],
}