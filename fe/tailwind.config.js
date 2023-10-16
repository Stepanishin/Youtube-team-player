/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    colors: {
      primary: {
        blackPetrol: "#032633",
        flameRed: "#EE4723",
      },
      secondary: {
        petrol: "#065668",
        lightPetrol: "#098898",
        lightPetrol50: "#C9E3E8",
      },
      neutral: {
        white: "#FFFFFF",
      },
      accent: {
        gray50: "#F4F4F4",
        gray100: "#E8E8E8",
        gray200: "#DBDFE0",
        gray300: "#819399",
        gray400: "#535353",
      },
      background: {
        bgLight100: "#FFFFFF",
        bgLight200: "#FDFDFD",
        bgLight300: "#F9F9F9",
        bgDark100: "#12333F",
        bgDark200: "#0B2D39",
        bgDark300: "#032633",
      },
      button: {
        btnLight: "#032633",
        btnLightHover: "#294752",
        btnDark: "#294752",
        btnDarkHover: "#3A5660",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      nunitoSans: ["Nunito Sans", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
    },
    fontSize: {
      input_Large: [
        "16px",
        {
          fontWeight: "400",
          lineHeight: "22px",
          letterSpacing: "-0.5%",
          fontFamily: "Nunito Sans, sans-serif",
        },
      ],
      input_Small: [
        "14px",
        {
          fontWeight: "400",
          lineHeight: "18px",
          letterSpacing: "-0.5%",
          fontFamily: "Nunito Sans, sans-serif",
        },
      ],
      button_Default: [
        "14px",
        {
          fontWeight: "700",
          lineHeight: "18px",
          letterSpacing: "-0.5%",
          fontFamily: "Nunito Sans, sans-serif",
        },
      ],
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
};
