/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
              "headline": ["Epilogue"],
              "body": ["Manrope"],
              "label": ["Inter"]
            },
    borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
  },
  plugins: [],
}

