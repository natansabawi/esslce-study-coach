/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ethiopia: {
          green: "#1F4D3D",
          emerald: "#10B981",
          gold: "#F59E0B",
          purple: "#6366F1",
          cream: "#FAF8F5",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "sans-serif"],
        display: ["'Spectral'", "serif"],
      },
    },
  },
  plugins: [],
};