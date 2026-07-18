import { Pressable, Text, View } from 'react-native';

import { cn } from '@/lib/cn';

type Props = {
  title: string;
  /** Right-side text (e.g. "See all >", "July 2025"). */
  action?: string;
  onAction?: () => void;
  className?: string;
};

export function SectionHeader({ title, action, onAction, className }: Props) {
  return (
    <View className={cn('mb-3 flex-row items-center justify-between', className)}>
      <Text className="text-xl font-bold text-royal">{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text className="text-sm font-medium text-brand">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
