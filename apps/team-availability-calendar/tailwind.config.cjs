/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        confetti: {
          500: "#e5e56b",
          800: "#e5e56b4d",
        },
        amaranth: {
          900: "#E11D48",
        },
        grey: {
          50: "#f2f4f6",
          75: "#e5e7eb",
          100: "#D1D5DB",
          200: "#a2aeb8",
          300: "#98a1c3",
          400: "#999999",
          500: "#8E9194",
          600: "#67717a",
          700: "#6b7280",
          800: "#4b5563",
          900: "#515D8A",
          950: "#374151",
          1000: "#111827",
        },
        "grey-opacity": {
          "900/50": "#37415150",
          "800/25": "#11182720",
        },
        "grey-disabled": "#f8f9fa",
        green: {
          500: "#0CAF60",
          600: "#10B981",
          700: "#10B981",
        },
      },
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }

        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }

        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }

        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }

        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
        'x-sm': "425px",
      }
    },
  },
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  corePlugins: {
    preflight: false,
  },
}
