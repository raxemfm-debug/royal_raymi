/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cacao: {
          DEFAULT: "#3B241C",
          light: "#68483A",
        },
        cream: {
          DEFAULT: "#FDFBF7",
          dark: "#F7F2EB",
        },
        amber: {
          gold: "#B58A52",
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
