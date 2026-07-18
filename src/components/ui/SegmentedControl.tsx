import { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { cn } from '@/lib/cn';
import { colors } from '@/theme/tokens';

type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type Segment = { key: string; label: string; icon?: MCIName };

type Props = {
  segments: Segment[];
  value: string;
  onChange: (key: string) => void;
  /**
   * When set, the selected segment is filled with this color and its text is
   * white (Expense/Income toggle). When omitted, the selected segment renders
   * as a white pill with brand-colored text (Manual/Scan/Voice tabs).
   */
  selectedBg?: string;
  className?: string;
};

export function SegmentedControl({ segments, value, onChange, selectedBg, className }: Props) {
  return (
    <View className={cn('w-full flex-row rounded-field bg-track p-1', className)}>
      {segments.map((seg) => {
        const active = seg.key === value;
        const filled = active && !!selectedBg;
        const pill = active && !selectedBg;
        const contentColor = filled ? colors.white : active ? colors.brand.DEFAULT : colors.ink.soft;
        return (
          <Pressable
            key={seg.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(seg.key)}
            style={filled ? { backgroundColor: selectedBg } : undefined}
            className={cn(
              'h-10 flex-1 flex-row items-center justify-center gap-1.5 rounded-[10px]',
              pill && 'bg-surface shadow-sm',
            )}>
            {seg.icon ? <MaterialCommunityIcons name={seg.icon} size={16} color={contentColor} /> : null}
            <Text
              className={cn('text-sm', active ? 'font-semibold' : 'font-medium')}
              style={{ color: contentColor }}>
              {seg.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
