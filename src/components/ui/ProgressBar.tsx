import { View } from 'react-native';

import { cn } from '@/lib/cn';

type Props = {
  /** 0–100. */
  value: number;
  color: string;
  /** Track height in px. Default 8. */
  height?: number;
  trackClassName?: string;
  className?: string;
};

/** Rounded linear progress bar with a colored, rounded-cap fill. */
export function ProgressBar({ value, color, height = 8, trackClassName, className }: Props) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <View
      className={cn('w-full overflow-hidden rounded-full bg-gray-300/70', trackClassName, className)}
      style={{ height }}>
      <View
        className="h-full rounded-full"
        style={{ width: `${clamped}%`, backgroundColor: color, minWidth: clamped > 0 ? height : 0 }}
      />
    </View>
  );
}
