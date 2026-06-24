import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          400: 'rgb(var(--primary-rgb) / <alpha-value>)',
          500: 'rgb(var(--primary-dark-rgb) / <alpha-value>)',
          600: 'rgb(var(--primary-darker-rgb) / <alpha-value>)',
        },
        'on-primary': 'var(--primary-fg)',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f5c842 0%, #ff8c00 100%)',
      },
    },
  },
  plugins: [],
}

export default config
