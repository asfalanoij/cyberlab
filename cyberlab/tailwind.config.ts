import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['IBM Plex Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg:      '#0F0F0F',
        surface: '#1A1A1A',
        border:  '#282828',
        'border-faint': '#1F1F1F',

        'text-primary':   '#EDEAE4',
        'text-secondary': '#7A7570',
        'text-muted':     '#4A4540',

        accent:     '#5B8EF0',
        'accent-dim': '#1E2D4A',

        // Per-tactic palette
        tactic: {
          recon:      '#6C9BCF',
          initial:    '#CF6C6C',
          execution:  '#CF9B6C',
          persist:    '#9B6CCF',
          evasion:    '#6CCF9B',
          cred:       '#CFB86C',
          discovery:  '#6CBFCF',
          lateral:    '#CF6CA0',
          collection: '#A0CF6C',
          c2:         '#CF8A6C',
          exfil:      '#8ACF6C',
          impact:     '#CF6C6C',
          defense:    '#6C9BCF',
        },
      },
      fontSize: {
        // Tight type scale — nothing bloated
        'xs':  ['11px', { lineHeight: '16px', letterSpacing: '0.02em' }],
        'sm':  ['12px', { lineHeight: '18px' }],
        'base':['14px', { lineHeight: '22px' }],
        'md':  ['15px', { lineHeight: '24px' }],
        'lg':  ['17px', { lineHeight: '26px' }],
        'xl':  ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        '3xl': ['30px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.03em' }],
      },
      spacing: {
        // 4-point grid
        '18': '72px',
        '22': '88px',
      },
      borderRadius: {
        'none': '0',
        'sm':   '2px',   // almost nothing — technical feel
        'DEFAULT': '4px',
        'md':   '6px',
        'lg':   '8px',
      },
      animation: {
        'fade-in':    'fadeIn 0.15s ease-out',
        'slide-in':   'slideIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',   opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}

export default config
