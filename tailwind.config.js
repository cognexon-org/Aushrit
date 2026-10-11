/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Aushrit brand palette
        pine: {
          50: '#EEF6F3',
          100: '#DCEDE6',
          200: '#B6D9CB',
          300: '#86BFA9',
          400: '#4F9C84',
          500: '#2A7D69',
          600: '#1F6657',
          700: '#185246',
          800: '#113D35',
          900: '#0B2E28',
          950: '#06201C',
        },
        marigold: {
          50: '#FEF5E6',
          100: '#FDE7C2',
          300: '#F8C272',
          400: '#F5B14F',
          500: '#F2A33A',
          600: '#D5861C',
          700: '#A86512',
        },
        coral: { 400: '#EE7A58', 500: '#E4572E', 600: '#C4441F' },
        paper: '#F6F9F7',
        ink: '#17302B',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        deva: ['"Tiro Devanagari Hindi"', '"Noto Serif Devanagari"', 'serif'],
      },
      maxWidth: { site: '1240px' },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bedIn: {
          from: { opacity: '0', transform: 'scale(.6)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        fadeSwap: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(242,163,58,.55)' },
          '50%': { boxShadow: '0 0 0 12px rgba(242,163,58,0)' },
        },
        scan: {
          '0%, 100%': { top: '10%' },
          '50%': { top: '88%' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        'glow-pulse': 'glowPulse 1.6s ease-out infinite',
        floaty: 'floaty 4s ease-in-out infinite',
        scan: 'scan 1.8s ease-in-out infinite',
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
        'bed-in': 'bedIn .35s cubic-bezier(.2,.7,.2,1) both',
        wave: 'wave 1.1s ease-in-out infinite',
        'fade-swap': 'fadeSwap .35s ease-out both',
        'toast-in': 'toastIn .3s ease-out both',
      },
    },
  },
  plugins: [],
}
