import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'display': ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'heading': ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs':   ['13px', { lineHeight: '18px', letterSpacing: '0.02em' }],
        'sm':   ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg':   ['18px', { lineHeight: '28px' }],
        'xl':   ['20px', { lineHeight: '28px' }],
        '2xl':  ['22px', { lineHeight: '30px' }],
        '3xl':  ['28px', { lineHeight: '34px' }],
        '4xl':  ['32px', { lineHeight: '40px' }],
        '5xl':  ['40px', { lineHeight: '48px' }],
        '6xl':  ['48px', { lineHeight: '56px' }],
        '7xl':  ['60px', { lineHeight: '68px' }],
        '8xl':  ['72px', { lineHeight: '80px' }],
      },
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-surface': '#141414',
        'bg-surface-hover': '#1C1C1C',
        'border-subtle': '#242424',
        'text-primary': '#F5F5F0',
        'text-secondary': '#9A9A93',
        'text-tertiary': '#5C5C56',
        'accent': '#FF6B35',
        'success': '#4ADE80',
        'info': '#7DA2FF',
        border: "#242424",
        input: "#242424",
        ring: "#FF6B35",
        background: "#0A0A0A",
        foreground: "#F5F5F0",
        primary: {
          DEFAULT: "#F5F5F0",
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#141414",
          foreground: "#F5F5F0",
        },
        muted: {
          DEFAULT: "#141414",
          foreground: "#9A9A93",
        },
        card: {
          DEFAULT: "#141414",
          foreground: "#F5F5F0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "zoom-in": {
          "0%": {
            transform: "scale(1.05)"
          },
          "100%": {
            transform: "scale(1)"
          }
        },
        "fade-zoom-in": {
          "0%": {
            opacity: "0",
            transform: "scale(1.1)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "slide-in-right": {
          "0%": {
            transform: "translateX(100%)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        },
        "scroll-left": {
          "0%": {
            transform: "translate3d(0, 0, 0)"
          },
          "100%": {
            transform: "translate3d(-50%, 0, 0)"
          }
        },
        "scroll-right": {
          "0%": {
            transform: "translate3d(-50%, 0, 0)"
          },
          "100%": {
            transform: "translate3d(0, 0, 0)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-zoom-in": "fade-zoom-in 1s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "scroll-left": "scroll-left 120s linear infinite",
        "scroll-right": "scroll-right 120s linear infinite",
        "scroll-left-fast": "scroll-left 90s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
