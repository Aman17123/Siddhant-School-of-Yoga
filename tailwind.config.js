/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f22924",
        primaryHover: "#F08C5C",
        accent: "#F5B860",
        accentLight: "#FBDD8E",
        bg: "#FFF9F2",
        card: "#FBF2E9",
        textDark: "#4A3F3A",
        textMuted: "#6B5D54",
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "var(--font-manrope)", "sans-serif"],
        belleza: ["var(--font-belleza)", "Belleza", "sans-serif"],
        figtree: ["var(--font-figtree)", "Figtree", "sans-serif"],
        fortune: ['"Fortune Parade"', "cursive", "serif"],
        serif: [
          "var(--font-belleza)",
          "var(--font-playfair)",
          "Georgia",
          "serif",
        ],
        heading: ["var(--font-belleza)", "var(--font-figtree)", "sans-serif"],
        body: ["var(--font-figtree)", "sans-serif"],
        accent: ['"Fortune Parade"', "var(--font-philosopher)", "serif"],
      },
    },
  },
  plugins: [],
};
