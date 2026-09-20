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
        obsidian: {
          950: '#04070D',
          900: '#080C14',
          850: '#0B111D',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
        },
        parchment: {
          50: '#FDFBF7',
          100: '#F7F4EB',
          200: '#EFEAD9',
          300: '#E5DECE',
          400: '#C7BEAB',
          700: '#443E38',
          800: '#2C2825',
          900: '#1D1A18',
        },
        academic: {
          gold: '#C5A059',
          goldHover: '#D4AF37',
          crimson: '#B91C1C',
          navy: '#1D4ED8',
          emerald: '#059669',
          amber: '#D97706',
          purple: '#7C3AED',
          cyan: '#0284C7',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Source Serif 4', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        'reading': '720px',
      },
      lineHeight: {
        'scholarly': '1.65',
      },
    },
  },
  plugins: [],
}
