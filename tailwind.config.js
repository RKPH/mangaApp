/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image':
          'url("https://img.freepik.com/free-vector/set-torii-gates-water_52683-44986.jpg?size=626&ext=jpg&ga=GA1.1.1911711112.1708163071&semt=sph")',
        'custom-image2':
          'url("https://cdnb.artstation.com/p/assets/images/images/024/538/827/original/pixel-jeff-clipa-s.gif?1582740711")',
        'custom-image3':
          'url("https://ac-o.namu.la/20240613sac/b377704a3964ec28fb649a20e5e9f924a097a945ea301b78cf57c9a40a407a63.png?expires=1719230475&key=MdLlWuAmWR-rKufZSJvhZA&type=orig")'
      },
      screens: {
        xs: '375px',
        s: '540px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px'
      },
      fontFamily: {
        sansII: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen-Sans',
          'DejaVu Sans',
          'Ubuntu',
          'Cantarell',
          'Helvetica Neue',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
}
