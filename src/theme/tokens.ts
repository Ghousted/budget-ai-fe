/**
 * Budget AI design tokens.
 *
 * These mirror `tailwind.config.js` and exist for the places where a NativeWind
 * className can't reach: SVG strokes/fills, LinearGradient stops, icon colors,
 * and status-bar tint. Keep the two in sync.
 */

export const colors = {
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
    800: '#1E3A8A',
    900: '#172C6B',
    950: '#0F1E4D',
  },
  royal: '#0A37C4',
  ink: {
    DEFAULT: '#111827',
    soft: '#374151',
    muted: '#6B7280',
    faint: '#9CA3AF',
  },
  income: '#22C55E',
  expense: '#EF4444',
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
  surface: '#FFFFFF',
  track: '#F3F4F6',
  hairline: '#E5E7EB',
  white: '#FFFFFF',
} as const;

/** The 8 category swatches, in picker order. */
export const categoryPalette = [
  colors.cat.red,
  colors.cat.orange,
  colors.cat.purple,
  colors.cat.blue,
  colors.cat.green,
  colors.cat.pink,
  colors.cat.amber,
  colors.cat.teal,
] as const;

/** Gradient stops for the deep-blue balance card and navy auth hero. */
export const gradients = {
  balanceCard: ['#1E3A8A', '#2563EB'] as [string, string],
  hero: ['#0F1E4D', '#1E3A8A'] as [string, string],
};

export const radii = {
  field: 12,
  card: 16,
  sheet: 24,
} as const;
