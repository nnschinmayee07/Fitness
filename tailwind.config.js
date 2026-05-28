/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8F5F0',
          card: '#EFE6DD',
          terracotta: '#C97B63',
          sage: '#6B705C',
          heading: '#2B2B2B',
          body: '#5E5E5E',
        },
      },
      fontFamily: {
        sans:    ['Inter',  'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter',     'sans-serif'],
      },
      backgroundImage: {
// Gradient backgrounds removed per design guidelines – solid colors used instead
      },
      boxShadow: {
        'neon-purple': '0 10px 30px -10px rgba(201,123,99,0.18)',
        'neon-cyan':   '0 10px 30px -10px rgba(107,112,92,0.18)',
        'glass':       '0 8px 32px rgba(43,43,43,0.04)',
        'card':        '0 4px 20px rgba(43,43,43,0.03)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-delay':  'float 6s ease-in-out 2s infinite',
        'spin-slow':    'spin 8s linear infinite',
        'blob':         'blob 7s infinite',
        'blob-delay':   'blob 7s 2s infinite',
        'blob-delay2':  'blob 7s 4s infinite',
        'fade-in':      'fadeIn 0.6s ease-out',
        'slide-up':     'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        blob: {
          '0%':   { transform: 'translate(0px, 0px) scale(1)' },
          '33%':  { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':  { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
