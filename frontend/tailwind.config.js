/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "karla": ["Karla", "sans-serif"]
      },
      colors: {
        primary: "#2c3440",
        secondary: "#9ab",
        tertiary: "rgba(0, 0, 0, 0.35)",
        "bg-start": "#303946",
        "teal": "rgba(64, 224, 208, 0.486)",
        "yellow-green": "rgba(183, 221, 41, .8)",
      },
      minWidth: {
        32: "8rem",
        28: "7rem",
        24: "6rem",
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
        'white': '0 0 5px rgba(255, 255, 255, .5)',
        'whitexl': '0 0 25px rgba(255, 255, 255, .4)',
        "teal": "0 0 10px rgb(0, 128, 128)",
        "blur": "0px 100px 1000px 50px rgba(0, 0, 0, 0.6)",
      },
      dropShadow: {
        'white': '0 0 50px rgba(255, 255, 255, .8)',
        'white-text': '0 0 2px rgba(255, 255, 255, .5)',
      },
      maxHeight: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },    
      spacing: {
        '10%': '10%', 
        '20%': '20%', 
        '30%': '30%', 
        '40%': '40%', 
        '50%': '50%', 
        '60%': '60%', 
        '70%': '70%', 
        '80%': '80%', 
        '90%': '90%', 
      },
      backgroundImage: {
        "fading" : "linear-gradient(90deg, transparent 95%, grey)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

