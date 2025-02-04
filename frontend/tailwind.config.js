const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 1s ease-in-out",
        "slide-up": "slide-up 1s ease-in-out",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
