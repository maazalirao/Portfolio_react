/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces (channel-based so /opacity modifiers work)
        bg: {
          DEFAULT: 'rgb(var(--bg-rgb) / <alpha-value>)',
          elevated: 'rgb(var(--bg-elevated-rgb) / <alpha-value>)',
          subtle: 'rgb(var(--bg-subtle-rgb) / <alpha-value>)',
        },
        // Text
        ink: {
          DEFAULT: 'rgb(var(--text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
          faint: 'rgb(var(--text-faint-rgb) / <alpha-value>)',
        },
        // Borders / hairlines (alpha already baked in — don't add /opacity)
        line: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        // Single signature accent — change --accent-rgb in index.css to re-theme the whole site
        accent: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover-rgb) / <alpha-value>)',
          contrast: 'var(--accent-contrast)',
        },
        // Legacy aliases so any stray classes still resolve
        background: 'var(--bg)',
        text: 'var(--text)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      screens: {
        xs: '480px',
      },
      maxWidth: {
        content: '72rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in': 'slideInRight 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'scroll': 'scrollDot 2s ease-in-out infinite',
        'marquee': 'marquee 32s linear infinite',
        'blink': 'blink 1.1s steps(1) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow': '0 0 40px -12px rgb(var(--accent-rgb) / 0.35)',
        'glow-sm': '0 0 24px -10px rgb(var(--accent-rgb) / 0.30)',
      },
      backgroundImage: {
        'grid': 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
