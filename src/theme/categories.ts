import type { ComponentProps } from 'react';
import type { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from './tokens';

type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type Category = {
  key: string;
  /** Full label, e.g. "Food & Dining". */
  label: string;
  /** Short label used on compact chips, e.g. "Food". */
  short: string;
  color: string;
  icon: MCIName;
};

/** Canonical spend categories used across Log, Budget and Home. */
export const CATEGORIES: Category[] = [
  { key: 'food', label: 'Food & Dining', short: 'Food', color: colors.cat.red, icon: 'silverware-fork-knife' },
  { key: 'transport', label: 'Transportation', short: 'Transportation', color: colors.cat.orange, icon: 'car' },
  { key: 'shopping', label: 'Shopping', short: 'Shopping', color: colors.cat.purple, icon: 'shopping' },
  { key: 'bills', label: 'Bills & Utilities', short: 'Bills', color: colors.cat.blue, icon: 'flash' },
  { key: 'medicine', label: 'Medicine', short: 'Medicine', color: colors.cat.green, icon: 'medical-bag' },
  { key: 'leisure', label: 'Leisure', short: 'Leisure', color: colors.cat.pink, icon: 'movie-open' },
  { key: 'education', label: 'Education', short: 'Education', color: colors.cat.amber, icon: 'book-open-variant' },
  { key: 'others', label: 'Others', short: 'Others', color: colors.cat.teal, icon: 'dots-horizontal-circle' },
];

export const CATEGORY_BY_KEY: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
);
