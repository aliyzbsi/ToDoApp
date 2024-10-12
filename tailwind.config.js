/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        mainColor: "#CE2829", // Özel rengi buraya ekliyorsun
        mainBgColor: "#FAF7F2",
        selectedColor: "#FFEECC",
      },
      fontFamily: {
        satisfy: ["Satisfy", "cursive"],
        "roboto-condensed": ['"Roboto Condensed"', "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        quattrocento: ["Quattrocento", "serif"],
      },
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        700: "700",
      },
      width: {
        112: "28rem", // 112 birim genişlik
        128: "32rem", // 128 birim genişlik
        144: "36rem", // 144 birim genişlik
        // Diğer genişlik değerlerini buraya ekleyebilirsin
      },
    },
  },
  plugins: [],
};
