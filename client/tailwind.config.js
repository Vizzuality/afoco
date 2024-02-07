/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/containers/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-bricolage)'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        green: {
          200: '#8BB0A8',
          300: '#64968B',
          400: '#3D7C6E',
          500: '#176252',
          600: '#124E41',
          700: '#0D3A31',
          800: '#092720',
          900: '#041310',
        },
        yellow: {
          50: '#FBF0D4',
          200: '#F5D47F',
          300: '#F2C655',
          400: '#EFB82A',
          500: '#ECAA00',
          600: '#D48D00',
          700: '#BC7100',
          800: '#7D4B00',
          900: '#3E2500',
        },
        red: {
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#FF0000',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#B00000',
        },
      },
      boxShadow: {
        sm: '0px 1px 2px 0px #0000000D',
        base: '0px 1px 3px 0px #0000001A 0px 1px 2px 0px #0000000F',
        md: '0px 4px 6px -1px #0000001A 0px 2px 4px -1px #0000000F',
        lg: '0px 10px 15px -3px #0000001A 0px 4px 6px -2px #0000000D',
        xl: '0px 20px 25px -5px #0000001A 0px 10px 10px -5px #0000000A',
        '2xl': '0px 25px 50px -12px #00000040',
        inner: '0px 0px 5px 1px #00000029 inset',
      },
      borderRadius: {
        '4xl': '32px',
        '8xl': '100px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
