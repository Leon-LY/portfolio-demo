/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        vt323: ['VT323', 'monospace'],
      },
      colors: {
        surface: {
          0: '#02030A',
          1: '#08051A',
          2: '#100A24',
          3: '#171032',
        },
        accent: {
          DEFAULT: '#35DDF2',
          bright: '#35DDF2',
          deep: '#06B6D4',
          warm: '#E8B85D',
          violet: '#A477FF',
        },
        cyan: { DEFAULT: '#35DDF2' },
        blue: { DEFAULT: '#5E8CFF' },
        green: { DEFAULT: '#10B981' },
        pink: { DEFAULT: '#F45BA8' },
        purple: { DEFAULT: '#A477FF' },
        gold: { DEFAULT: '#E8B85D' },
        text: {
          primary: '#F8F3FF',
          secondary: '#A9A1B8',
          tertiary: '#7C748E',
          disabled: '#4A4558',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'cursor-pulse': 'cursor-pulse 2s ease-out infinite',
        'slide-down': 'slide-down 0.3s ease-out',
        'text-shimmer': 'text-shimmer 4s ease infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'pulse-glow': 'pulse-glow 3.4s ease-in-out infinite',
        'orbit-spin': 'orbit-spin 18s linear infinite',
        'mini-fall': 'mini-fall 4.2s ease-in-out infinite',
        'meter-breathe': 'meter-breathe 3.4s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'cursor-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'text-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'breathe': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'spin-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'orbit-spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'mini-fall': {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.82' },
          '50%': { transform: 'translateY(-18px) scale(1.3)', opacity: '1' },
        },
        'meter-breathe': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
