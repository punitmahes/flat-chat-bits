/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      cursive: ['"Comic Sans MS"', 'cursive'],
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      serif: ['Merriweather', 'Georgia', 'Cambria', 'serif'],
      mono: ['Inconsolata', 'Consolas', 'Roboto Mono', 'monospace'],
      'custom-font': ['"My Custom Font"', 'cursive'],
    },
  },
  plugins: [],
}

