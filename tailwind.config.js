export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        fg: "#ffffff",
        accent: {
          pink: "#ff61d8",
          lemon: "#e6ff55",
          blue: "#55daff",
          purple: "#c261ff",
          orange: "#ff7e4b",
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
