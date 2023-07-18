/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.9rem",
      base: "1rem",
      lg: "1.125",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.7rem",
      "4xl": "2rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
      "10xl": ["11rem", "12rem"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#00000",
        "copy-black": "#231F20",
        "galaxy-blue": "#000735",
        "rose-quartz": "#eab8b2",
        "purple-rain": "#440B45",
        "classic-blue": "#0f4c81",
        "orange-red": "#DD5928",
        "chive-green": "#00966d",
        "biscay-green": "#00b3b0",
        "purbeck-stone": "#e3d9d7",
        "light-yellow": "#e3d9d7",
      },
      fontFamily: {
        "chivo-mono": ["Chivo Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
