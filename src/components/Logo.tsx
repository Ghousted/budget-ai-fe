import { Image, Text, View } from 'react-native';

import { cn } from '@/lib/cn';

// Robot-in-wallet brand mark — the same raster export the splash animation uses.
// Native size 70×84 (≈5:6); we scale it to `size` width and keep that ratio.
const logoMark = require('../../assets/images/logo-mark.png');

const MARK_RATIO = 84 / 70;

type Props = {
  size?: number;
  layout?: 'stacked' | 'inline' | 'wordmark' | 'mark';
  className?: string;
  /** Render the wordmark in white (for use on the dark hero). */
  onDark?: boolean;
};

/**
 * Budget AI brand mark + wordmark. The mark is the robot-in-wallet mascot
 * (assets/images/logo-mark.png), matching the splash animation.
 */
export function Logo({ size = 64, layout = 'stacked', className, onDark = false }: Props) {
  const wordSize = Math.round(size * 0.34);

  const mark = (
    <Image
      source={logoMark}
      resizeMode="contain"
      style={{ width: size, height: Math.round(size * MARK_RATIO) }}
    />
  );

  const wordmark = (
    <Text style={{ fontSize: wordSize }} className="font-extrabold tracking-tight">
      <Text className={onDark ? 'text-white' : 'text-brand-500'}>Budget </Text>
      <Text className={onDark ? 'text-brand-200' : 'text-royal'}>AI</Text>
    </Text>
  );

  if (layout === 'mark') return <View className={className}>{mark}</View>;
  if (layout === 'wordmark') return <View className={className}>{wordmark}</View>;

  return (
    <View
      className={cn(
        'items-center',
        layout === 'inline' ? 'flex-row gap-2.5' : 'gap-3',
        className,
      )}>
      {mark}
      {wordmark}
    </View>
  );
}
