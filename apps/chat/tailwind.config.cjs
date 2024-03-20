/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // Added to prevent damage to the outer Bootstrap styles
    preflight: false,
  },
  presets: [
    require('@turborepo/tailwind-preset'),
  ],
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
}
