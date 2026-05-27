/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030712',
          900: '#0a0f1e',
          800: '#0d1226',
          700: '#111827',
          600: '#1a2236',
        },
      },
      fontFamily: {
        sans:    ['Inter',  'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter',     'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0f1e 0%, #0d1226 50%, #030712 100%)',
        'accent-gradient': 'linear-gradient(135deg, #a855f7, #06b6d4)',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(168,85,247,0.45)',
        'neon-cyan':   '0 0 20px rgba(6,182,212,0.45)',
        'glass':       '0 8px 32px rgba(0,0,0,0.4)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
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
