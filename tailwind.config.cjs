module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: { brand: { 900: '#0f172a', 800: '#1e293b', 700: '#334155', accent: '#f97316', accentHover: '#ea580c' } }
    }
  },
  plugins: []
};
