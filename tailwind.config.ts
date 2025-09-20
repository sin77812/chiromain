import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          black: '#0A0A0A',
          white: '#FAFAF8',
          stone: '#6B6B68',
          gold: '#D4AF37',
          taupe: '#3E3A35',
          marble: '#E8E6E1',
          carrara: '#F0F0EC',
          walnut: '#5D4037',
          bronze: '#796B5E',
          obsidian: '#1A1A1A',
        }
      },
      fontFamily: {
        'display': ['Inter', 'Helvetica', 'sans-serif'],
        'body': ['Inter', 'Arial', 'sans-serif'],
        'korean': ['Pretendard', 'Apple SD Gothic Neo', 'sans-serif'],
      },
      fontSize: {
        'display': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['36px', { lineHeight: '1.3', letterSpacing: '0' }],
        'h3': ['24px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'body': ['16px', { lineHeight: '1.8', letterSpacing: '0.02em' }],
        'caption': ['14px', { lineHeight: '1.6', letterSpacing: '0.03em' }],
      },
      fontWeight: {
        'thin': '100',
        'light': '300',
        'regular': '400',
        'medium': '500',
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '48px',
        'xl': '80px',
        '2xl': '120px',
        '3xl': '200px',
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'marquee-reverse': 'marquee-reverse 20s linear infinite',
        'marquee-mobile': 'marquee 30s linear infinite',
        'marquee-reverse-mobile': 'marquee-reverse 30s linear infinite',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'dramatic': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: {
        'micro': '200ms',
        'fast': '400ms',
        'normal': '800ms',
        'slow': '1200ms',
        'cinematic': '2000ms',
      },
    },
  },
  plugins: [],
};
export default config;
