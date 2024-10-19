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
        cate: '0px 0px 5px 0px #e5e5e5',
        cateHover: '0px 0px 5px 0px #d70018',
        'custom-inset': 'inset 0px 10px 10px red'
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
