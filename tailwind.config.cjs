/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
      },
      colors: {
        night: {
          deep: '#050313',
          purple: '#160b34',
          blue: '#06182f',
        },
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-2%, -3%, 0) scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5, filter: 'blur(24px)' },
          '50%': { opacity: 0.9, filter: 'blur(30px)' },
        },
        grainFlicker: {
          '0%, 100%': { opacity: 0.12 },
          '50%': { opacity: 0.2 },
        },
      },
      animation: {
        gradientShift: 'gradientShift 18s ease-in-out infinite alternate',
        floatSlow: 'float 10s ease-in-out infinite',
        pulseGlow: 'pulseGlow 8s ease-in-out infinite',
        grainFlicker: 'grainFlicker 0.8s steps(2, end) infinite',
      },
      letterSpacing: {
        wideTitle: '0.28em',
      },
    },
  },
  plugins: [],
};
