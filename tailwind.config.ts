import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F0FF',
          100: '#E9E2FF',
          200: '#D5C7FF',
          300: '#B8A1FF',
          400: '#9470FF',
          500: '#6C3EE8',
          600: '#5B36F4',
          700: '#4C24D4',
          800: '#3D1BAF',
          900: '#2A107C',
        },
        card: {
          complete: '#F0EEFF',
          completeText: '#5B36F4',
          pending: '#FFEAEA',
          pendingText: '#FF5B5B',
        },
      },
    },
  },
  plugins: [],
};

export default config;
