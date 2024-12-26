
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite", // Slow spin (3 seconds)
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};