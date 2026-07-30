/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#000000',
          light: '#FFFFFF',
          cardDark: 'rgba(18, 18, 20, 0.85)',
          cardLight: 'rgba(244, 244, 245, 0.85)',
          primary: '#FFBA00',   // Gold/Yellow
          secondary: '#EAB308', // Darker Gold/Yellow
          accent: '#FACC15',    // Highlight Yellow
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
        'glass-light': '0 8px 32px 0 rgba(255, 186, 0, 0.05)',
        'glow': '0 0 15px rgba(255, 186, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
