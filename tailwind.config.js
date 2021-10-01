module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#282c34'
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
