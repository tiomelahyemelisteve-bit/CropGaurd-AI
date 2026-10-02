/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f0',
          100: '#dcecdc',
          200: '#bcd9bd',
          300: '#8fc091',
          400: '#5fa363',
          500: '#3d8741',
          600: '#2c6c30',
          700: '#225625',
          800: '#1c451f',
          900: '#163318',
          950: '#0d2010',
        },
        natural: {
          50: '#f6faf6',
          100: '#e8f3e9',
          200: '#cde6cf',
          300: '#a3d3a7',
          400: '#71ba78',
          500: '#4d9e55',
          600: '#3a8041',
          700: '#306635',
          800: '#28522c',
          900: '#224325',
        },
        amber2: {
          50: '#fffaeb',
          100: '#fef0c7',
          200: '#fde08a',
          300: '#fac957',
          400: '#f7ad2e',
          500: '#ef8e10',
          600: '#d56e06',
          700: '#b14d08',
          800: '#913c0e',
          900: '#78330f',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scan-line': 'scanLine 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'progress-fill': 'progressFill 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scanLine: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress, 100%)' },
        },
      },
    },
  },
  plugins: [],
};
