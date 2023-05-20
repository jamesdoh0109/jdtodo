/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'g-xl': 'repeat(5, auto)',
        'g-lg': 'repeat(4, auto)',
        'g-md': 'repeat(3, auto)',
        'g-sm': 'repeat(2, auto)',
        'g-xs': 'repeat(1, auto)',
      }
    },
    screens: {
      'm-2xs': {'max': '499px'},
      'm-xs': {'min': '500px', 'max': '599px'},
      'm-sm': {'min': '600px', 'max': '699px'},
      'm-md': {'min': '700px', 'max': '799px'},
      'm-lg': {'min': '800px', 'max': '899px'},
      'm-xl': {'min': '900px'},
      'pl-xl': {'min': '1500px'},
      'pl-lg': {'min': '1200px', 'max': '1499px'},
      'pl-md': {'min': '900px', 'max': '1199px'},
      'pl-sm': {'min': '600px', 'max': '899px'},
      'pl-xs': {'max': '599px'},
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

