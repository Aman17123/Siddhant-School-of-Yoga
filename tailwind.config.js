/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8735A',
        primaryHover: '#F08C5C',
        accent: '#F5B860',
        accentLight: '#FBDD8E',
        bg: '#FFF9F2',
        card: '#FBF2E9',
        textDark: '#4A3F3A',
        textMuted: '#6B5D54',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'var(--font-nunito-sans)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'var(--font-philosopher)', 'Georgia', 'serif'],
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        accent: ['var(--font-philosopher)', 'serif'],
      },
    },
  },
  plugins: [],
};
