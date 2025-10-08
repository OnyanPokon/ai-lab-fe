/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'arial', 'halvetica', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      animation: {
        scroll: 'scroll 10s linear infinite',
        scroll2: 'scroll2 10s linear infinite'
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        scroll2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
      },
      colors: {
        "primary-100": "#9091d6",
        "primary-200": "#7e7ecf",
        "primary-300": "#6b6cc8",
        "primary-400": "#5959c1",
        "primary-500": "#4647ba",
        "primary-600": "#3f40a7",
        "primary-700": "#383995",
        "primary-800": "#313282",
        "primary-900": "#2a2b70",

        "secondary-100": "#8fb2e5",
        "secondary-200": "#7ca5e0",
        "secondary-300": "#6998dc",
        "secondary-400": "#578bd7",
        "secondary-500": "#447ed3",
        "secondary-600": "#3d71be",
        "secondary-700": "#3665a9",
        "secondary-800": "#305894",
        "secondary-900": "#294c7f",

        "success-100": "#E5FBD4",
        "success-200": "#C5F8AA",
        "success-300": "#9AEC7D",
        "success-400": "#71D959",
        "success-500": "#39C12A",
        "success-600": "#21A51E",
        "success-700": "#158A1C",
        "success-800": "#0D6F1B",
        "success-900": "#085C1B",

        "info-100": "#CBF4FD",
        "info-200": "#97E5FB",
        "info-300": "#63CBF4",
        "info-400": "#3CAEEA",
        "info-500": "#0285DD",
        "info-600": "#0167BE",
        "info-700": "#014D9F",
        "info-800": "#003680",
        "info-900": "#00266A",

        "warning-100": "#FDF7CB",
        "warning-200": "#FCEE97",
        "warning-300": "#F8E063",
        "warning-400": "#F1D03C",
        "warning-500": "#E8B900",
        "warning-600": "#C79A00",
        "warning-700": "#A77E00",
        "warning-800": "#866200",
        "warning-900": "#6F4F00",

        "danger-100": "#FDE2D0",
        "danger-200": "#FBBFA2",
        "danger-300": "#F39272",
        "danger-400": "#E7674E",
        "danger-500": "#D8291A",
        "danger-600": "#B91313",
        "danger-700": "#9B0D19",
        "danger-800": "#7D081B",
        "danger-900": "#67041D",

        "dark-400": "#23233b",
        "dark-500": "#0b0b25",
        "dark-600": "#0a0a21",
        "dark-700": "#09091e",
        "dark-800": "#08081a",
      }
    }
  },
  darkMode: 'class',
  plugins: [],
}

