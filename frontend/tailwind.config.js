/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "karla": ["Karla", "sans-serif"],
        "lora": ["Lora", "serif"],
      },
      colors: {
        primary: "#2c3440",
        secondary: "#9ab",
        tertiary: "rgba(0, 0, 0, 0.35)",
        "bg-start": "#303946",
        "teal": {
          "standard" : "rgba(64, 224, 208, 0.486)",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        "slate": {
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        "yellow-green": "rgba(183, 221, 41, .8)",
      },
      width: {
        112: '28rem',
        120: '30rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
        176: '44rem',
        192: '48rem',
        208: '52rem',
      },
      height: {
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
        176: '44rem',
        192: '48rem',
        208: '52rem',
      },
      minWidth: {
        32: "8rem",
        28: "7rem",
        24: "6rem",
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },
      maxWidth: {
        4: "1rem",
        32: "8rem",
        28: "7rem",
        24: "6rem",
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
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
        "groove" : [
          "0px 1px 0px rgba(255, 255, 255, .5)", 
          // "0px -1px 0px rgba(0,0,0,.7)"
        ],
        "3xl": "0 10px 25px rgba(0, 0, 0, 0.35)"
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
      opacity: {
        96 : ".96",
        97 : ".97",
        98 : ".98",
        99 : ".99",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

