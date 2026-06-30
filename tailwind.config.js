/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        page: {
          deep: '#0A0C10',
          bg: '#12141A',
          card: '#181B23',
          elevated: '#1E212A',
        },
        ink: {
          primary: '#ECEBE4',
          secondary: '#8F929E',
        },
        line: '#262933',
        accent: {
          gold: '#E8A839',
          'gold-dim': 'rgba(232, 168, 57, 0.12)',
          'gold-hover': '#F0C060',
          blue: '#5B7FFF',
          'blue-dim': 'rgba(91, 127, 255, 0.1)',
        },
        surface: {
          hover: '#1E212A',
          active: '#242833',
        },
      },
      maxWidth: {
        content: '760px',
      },
      fontSize: {
        hero: ['4rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'hero-mobile': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        display: ['2.5rem', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '600' }],
      },
      boxShadow: {
        glow: '0 0 24px rgba(232, 168, 57, 0.1)',
        'glow-lg': '0 0 40px rgba(232, 168, 57, 0.08)',
        card: '0 2px 20px rgba(0,0,0,0.3)',
      },
      backgroundImage: {
        'nexus-glow': 'radial-gradient(ellipse at center, rgba(232, 168, 57, 0.08) 0%, transparent 70%)',
        'nexus-blue': 'radial-gradient(ellipse at center, rgba(91, 127, 255, 0.06) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
