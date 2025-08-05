/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-black": "#0B0B0B",
        "custom-gray": "#333533",
        "custom-ivory": "#F2ECDD",
        "custom-gold": "#F5CB5C",
        "custom-darkgold": "#CD9C20",
      },
      boxShadow: {
        custom: "0 10px 20px -10px rgba(0,0,0,0.6)",
      },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
