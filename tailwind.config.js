/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050816',
          900: '#0B1020',
          800: '#111729',
          700: '#1a2238',
        },
        accent: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          pink: '#EC4899',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'blob-slow': 'blob 18s ease-in-out infinite',
        'blob-slower': 'blob 24s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 1s infinite',
        'grid-pan': 'gridPan 40s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
        shine: 'shine 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%) rotate(25deg)' },
          '60%, 100%': { transform: 'translateX(250%) rotate(25deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.4)' },
          '50%': { boxShadow: '0 0 0 6px rgba(16,185,129,0)' },
        },
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4)',
      },
    },
  },
  plugins: [],
};
