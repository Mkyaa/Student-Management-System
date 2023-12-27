/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#fbf7ff",
        "bg-secondary": "#9747ff",
      },
      minHeight: {
        "100vh-80px": "calc(100vh - 80px)",
      },
    },
  },
  plugins: [],
};
