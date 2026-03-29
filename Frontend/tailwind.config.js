/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#c9a961',
        'gold-light': '#d4b76f',
        'dark-brown': '#1a1816',
        'light-beige': '#faf8f5',
        'off-white': '#f5f5f0',
        'border-gray': '#e0ddd6',
        'text-gray': '#5a5550',
        'muted-gray': '#8a867f',
        'dark-gray': '#3a3632',
        'success-green': '#2d5a3a',
        'light-tan': '#f5f3ed',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        'serif-alt': ['Crimson Pro', 'serif'],
      },
    },
  },
  plugins: [],
}
