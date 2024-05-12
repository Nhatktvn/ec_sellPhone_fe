const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      boxShadow: {
        cate: '10px 10px 10px 10px #e5e5e5'
      },
      colors: {
        orange: 'rgb(215, 0, 24)'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        },
        '.category-selected': {
          color: theme('colors.orange'),
          fontWeight: 'bolder'
        }
      })
    })
  ]
}
