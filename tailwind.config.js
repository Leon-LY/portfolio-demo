/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        surface: {
          0: '#020617',
          1: '#0A0A0A',
          2: '#141414',
          3: '#1A1A2E',
        },
        accent: {
          DEFAULT: '#00E5FF',
          bright: '#00F0FF',
          deep: '#00B8D4',
          warm: '#F59E0B',
          violet: '#7C3AED',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          tertiary: '#475569',
          disabled: '#334155',
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
        'breathe': 'breathe 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,255,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(0,229,255,0.35)' },
        },
        'spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'spin-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
      },
    },
  },
  plugins: [],
}
