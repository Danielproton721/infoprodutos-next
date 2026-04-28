import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-soft': 'var(--bg-soft)',
        card: 'var(--card)',
        surface: 'var(--surface)',
        'surface-strong': 'var(--surface-strong)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        title: 'var(--title)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        mint: 'var(--mint)',
        sky: 'var(--sky)',
        blue: 'var(--blue)',
        green: 'var(--green)',
        red: 'var(--red)',
        whatsapp: 'var(--whatsapp)',
        'whatsapp-dark': 'var(--whatsapp-dark)',
        'footer-bg': 'var(--footer-bg)',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(74, 42, 113, 0.14)',
      },
      borderRadius: {
        xl2: '24px',
        xl3: '34px',
      },
      maxWidth: {
        container: '1160px',
      },
    },
  },
  plugins: [],
};

export default config;
