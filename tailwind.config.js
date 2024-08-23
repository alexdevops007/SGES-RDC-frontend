/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue,ts}"],
  theme: {
    extend: {
      colors: {
        "pnc-blue": "#003366", // Bleu marine profond
        "pnc-gold": "#FFD700", // Or, pour les insignes ou détails dorés
        "pnc-white": "#FFFFFF", // Blanc pur pour les contrastes
        "pnc-dark": "#000022", // Bleu très sombre, presque noir
        "pnc-gray": "#B0B0B0", // Gris pour des éléments neutres ou de fond
      },
    },
  },
  plugins: [],
};
