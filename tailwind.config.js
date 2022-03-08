module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        'primary-green':'#40995B',
        // 'modern':'#466954',
        'modern-green':'#3a5948',
      }),
      gridTemplateColumns: {
        // Simple 16 column grid
       '16': 'repeat(16, minmax(0, 1fr))',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd','even','focus','active'],
      backgroundOpacity: ['active','odd','even'],
      borderWidth: ['odd','even','focus','active'],
      borderColor: ['odd','even','focus'],
    },
  },
  plugins: [],
}
