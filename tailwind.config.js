/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    //Para compilar todos los archivos en nuestros componentes
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

