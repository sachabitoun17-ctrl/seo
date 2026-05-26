import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf7f2',
        paper: '#ffffff',
        ink: '#1a1a1c',
        charcoal: '#3a3a3c',
        muted: '#6b6660',
        line: '#e9e3d7',
        accent: '#c5563f',
        'accent-deep': '#a03f2c',
        'accent-soft': '#f4d3c2',
        sage: '#7d9171',
        'sage-soft': '#dde6d8',
        sand: '#d4a35e',
        'sand-soft': '#f5e7cc',
        sky: '#8aa9bc',
        'sky-soft': '#dde7ed',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Inter', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        display: ['ui-serif', 'Georgia', 'Cambria', 'serif'],
      },
      maxWidth: {
        prose: '68ch',
        container: '1200px',
      },
      letterSpacing: {
        tightish: '-0.012em',
        tightest: '-0.02em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26,26,28,0.04), 0 4px 12px rgba(26,26,28,0.04)',
        'soft-lg': '0 2px 6px rgba(26,26,28,0.06), 0 12px 32px rgba(26,26,28,0.08)',
      },
      backgroundImage: {
        'cream-gradient': 'linear-gradient(180deg, #faf7f2 0%, #f5efe4 100%)',
        'paper-gradient': 'linear-gradient(180deg, #ffffff 0%, #faf7f2 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
