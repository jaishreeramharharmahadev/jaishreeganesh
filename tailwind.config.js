/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-animation-1': 'wave 8s ease-in-out infinite',
        'wave-animation-2': 'wave 6s ease-in-out infinite reverse',
        'wave-animation-3': 'wave 10s ease-in-out infinite 1s',
        'float-dot-1': 'floatDot 8s ease-in-out infinite',
        'float-dot-2': 'floatDot 10s ease-in-out infinite 1s',
        'float-dot-3': 'floatDot 12s ease-in-out infinite 2s',
        'float-dot-4': 'floatDot 9s ease-in-out infinite 3s',
        'float-dot-5': 'floatDot 11s ease-in-out infinite 4s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '50%': { transform: 'translateX(-20px) translateY(10px) scale(1.05)' },
          '75%': { transform: 'translateX(10px) translateY(5px) scale(1.02)' },
        },
        floatDot: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.7' },
          '25%': { transform: 'translate(20px, -15px) scale(1.2)', opacity: '1' },
          '50%': { transform: 'translate(-10px, 10px) scale(0.8)', opacity: '0.5' },
          '75%': { transform: 'translate(-20px, -5px) scale(1.1)', opacity: '0.9' },
        }
      }
    }
  },
  plugins: [],
}

