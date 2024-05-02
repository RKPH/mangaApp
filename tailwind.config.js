/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "custom-image":
          "url('https://img.freepik.com/free-vector/set-torii-gates-water_52683-44986.jpg?size=626&ext=jpg&ga=GA1.1.1911711112.1708163071&semt=sph')",
      }),
    },
  },
  plugins: [],
};
