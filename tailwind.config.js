/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1c3b2b",
        primaryHover: "#0f6b57",
        accent: "#1c3b2b",
        accentLight: "#3aab92",
        bg: "#def4ee",
        card: "#ffffff",
        textDark: "#1e2422",
        textMuted: "#66675c",
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "var(--font-manrope)", "sans-serif"],
        belleza: ["var(--font-belleza)", "Belleza", "sans-serif"],
        figtree: ["var(--font-figtree)", "Figtree", "sans-serif"],
        fortune: ["var(--font-belleza)", "Belleza", "sans-serif"],
        serif: [
          "var(--font-belleza)",
          "var(--font-playfair)",
          "Georgia",
          "serif",
        ],
        heading: ["var(--font-belleza)", "var(--font-figtree)", "sans-serif"],
        body: ["var(--font-figtree)", "sans-serif"],
        accent: ["var(--font-belleza)", "var(--font-philosopher)", "serif"],
      },
    },
  },
  plugins: [],
};
