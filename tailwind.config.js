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
      'sans': 'system-ui, -apple-system, "Segoe UI", sans-serif',
      'mono': 'ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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

