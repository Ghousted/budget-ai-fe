import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { cn } from '@/lib/cn';

type Props = {
  size?: number;
  layout?: 'stacked' | 'inline' | 'wordmark' | 'mark';
  className?: string;
  /** Render the wordmark in white (for use on the dark hero). */
  onDark?: boolean;
};

/**
 * Budget AI brand mark + wordmark. The mark is a placeholder standing in for the
 * robot-in-wallet mascot from the design — swap the icon for the exported asset
 * when available (see assets/images).
 */
export function Logo({ size = 64, layout = 'stacked', className, onDark = false }: Props) {
  const wordSize = Math.round(size * 0.34);

  const mark = (
    <View
      className="items-center justify-center rounded-2xl bg-brand"
      style={{ width: size, height: size }}>
      <MaterialCommunityIcons name="robot-happy" size={Math.round(size * 0.58)} color="#fff" />
    </View>
  );

  const wordmark = (
    <Text style={{ fontSize: wordSize }} className="font-extrabold tracking-tight">
      <Text className={onDark ? 'text-white' : 'text-brand'}>Budget</Text>
      <Text className={onDark ? 'text-brand-200' : 'text-brand-800'}> AI</Text>
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
