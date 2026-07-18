import { Text, View } from 'react-native';

import { CategoryBadge } from '@/components/CategoryBadge';
import { peso } from '@/lib/format';
import { CATEGORY_BY_KEY } from '@/theme/categories';
import { colors } from '@/theme/tokens';
import type { LogEntry } from '@/lib/mock';

/** A single transaction row: category glyph, note + time, signed amount. */
export function LogRow({ entry }: { entry: LogEntry }) {
  const isIncome = entry.type === 'income';
  const cat = CATEGORY_BY_KEY[entry.categoryKey];
  const icon = isIncome ? 'cash-plus' : (cat?.icon ?? 'shape');
  const color = isIncome ? colors.income : (cat?.color ?? colors.ink.muted);

  return (
    <View className="flex-row items-center py-3">
      <CategoryBadge icon={icon} color={color} />
      <View className="ml-3 flex-1">
        <Text className="text-[15px] font-semibold text-ink" numberOfLines={1}>
          {entry.note}
        </Text>
        <Text className="text-xs text-ink-faint">{entry.when}</Text>
      </View>
      <Text
        className="text-[15px] font-bold"
        style={{ color: isIncome ? colors.income : colors.ink.DEFAULT }}>
        {isIncome ? '+' : '−'}
        {peso(entry.amount)}
      </Text>
    </View>
  );
}
