/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#02DF82", // Verde brillante (acentos pequeños)
        secondary: "#03624C", // Verde oscuro (fondos, botones, hover)
        "primary-light": "#04f08e", // Verde para hover del brillante
        dark: {
          100: "#194B80", // Azul grisáceo (no lo tocamos si no molesta)
          200: "#022b22", // Un tono súper oscuro del verde secundario para fondos
          900: "#050505" // Un negro casi puro para fondos principales (estilo premium)
        }
      }
    },
  },
  plugins: [],
}
