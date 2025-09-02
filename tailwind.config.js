/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Fira Code', 'Monaco', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#1e1e1e',
          text: '#ffffff',
          green: '#00ff00',
          cyan: '#00ffff',
          prompt: '#00ff00',
          gray: '#333333',
        }
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}