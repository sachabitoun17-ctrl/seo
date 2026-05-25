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
        cream: '#fafaf8',
        ink: '#111113',
        accent: '#c46f4d',
        'accent-soft': '#e7c2ad',
        muted: '#6b6660',
        line: '#e9e6e0',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Inter', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        prose: '68ch',
        container: '1180px',
      },
      letterSpacing: {
        tightish: '-0.012em',
      },
    },
  },
  plugins: [],
};

export default config;
