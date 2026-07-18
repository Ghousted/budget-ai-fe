/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Brand — royal blue. Used for primary buttons, links, the Budget AI
        // wordmark, active tab state, the "Log" FAB, peso glyph, scan brackets.
        brand: {
          DEFAULT: '#2563EB',
          50: '#EFF4FF',
          100: '#DBE6FE',
          200: '#BFD3FE',
          300: '#93B4FD',
          400: '#608CFA',
          500: '#2563EB',
          600: '#1D4FD8',
          700: '#1B44B8',
          800: '#1E3A8A', // navy — some screen headings ("Log Entry")
          900: '#172C6B',
          950: '#0F1E4D', // deep navy — balance-card / hero gradient anchor
        },
        // Deep saturated royal used for section/screen titles ("Budget",
        // "AI Insights"). Distinct from the button blue.
        royal: '#0A37C4',
        // Neutral ink scale for text.
        ink: {
          DEFAULT: '#111827',
          soft: '#374151',
          muted: '#6B7280',
          faint: '#9CA3AF',
        },
        // Semantic money colors.
        income: '#22C55E',
        expense: '#EF4444',
        // Category palette (matches the 8-swatch picker in the design).
        cat: {
          red: '#EF4444',
          orange: '#F97316',
          purple: '#8B5CF6',
          blue: '#3B82F6',
          green: '#10B981',
          pink: '#EC4899',
          amber: '#F59E0B',
          teal: '#14B8A6',
        },
        // Surfaces.
        surface: '#FFFFFF',
        track: '#F3F4F6', // input / segmented-control fill (gray-100)
        hairline: '#E5E7EB', // borders (gray-200)
      },
      borderRadius: {
        field: '12px',
        card: '16px',
        sheet: '24px',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
