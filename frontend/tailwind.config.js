/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c3440",
        secondary: "#9ab",
        tertiary: "rgba(0, 0, 0, 0.35)",
        "bg-start": "#303946",
        "teal": "rgba(64, 224, 208, 0.486)",
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      brightness: {
        10: ".10",
        20: ".20",
        30: ".30",
        40: ".40",
      },
      boxShadow: {
        'whitexl': '0 0 25px rgba(255, 255, 255, .4)',
        "teal": "0 0 10px rgb(0, 128, 128)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

