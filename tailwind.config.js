/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        du_red: "#F16367"
      }
    },
    fontFamily: {
      'sans': '"Helvetica Neue", "Helvetica", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Arial", "Yu Gothic", "Meiryo", sans-serif',
      'mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },
  safelist: [
    'multiselect',
    'multiselect__tags',
    'multiselect__placeholder',
    'multiselect__input',
    'multiselect__single',
    'multiselect__option--highlight',
    'multiselect__content-wrapper',
    'multiselect__option--selected'
  ],
  plugins: [],
}

