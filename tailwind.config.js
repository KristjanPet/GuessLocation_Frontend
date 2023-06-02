/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#619B8A',
        dark: '#233D4D',
        white: '#ffffff',
        danger: 'rgb(185 28 28)',
      },
      screens: {
        mobile: '769px',
        // => @media (min-width: 769px) { ... }

        laptop: '1570px',
        // => @media (min-width: 1570px) { ... }

        desktop: '1660px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  important: true,
  plugins: [],
}
