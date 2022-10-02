/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c3440",
        secondary: "#9ab",
        tertiary: "rgba(0, 0, 0, 0.35)",
        "bg-start": "#303946"
      }
    },
  },
  plugins: [],
}

