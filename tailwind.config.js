/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-dark': 'var(--background-dark)',
        text: 'var(--text)',
        'text-dark': 'var(--text-dark)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'gradient-x': 'gradientX 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in': 'slideInRight 0.5s ease-out forwards',
        'shimmer': 'shimmer 1.4s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'scroll': 'scroll 2s ease-in-out infinite',
        'rotate': 'rotate 60s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(96, 165, 250, 0.5)',
        'glow-lg': '0 0 40px -10px rgba(96, 165, 250, 0.5)',
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.6)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.6)',
        'glow-purple': '0 0 20px -5px rgba(147, 51, 234, 0.6)',
        'neon': 'var(--neon-glow)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      blur: {
        'xs': '2px',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      rotate: {
        '360': '360deg',
      },
      scale: {
        '102': '1.02',
      },
      opacity: {
        '15': '0.15',
        '85': '0.85',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
      },
    },
  },
  plugins: [],
}
