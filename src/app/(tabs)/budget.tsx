import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/Card';
import { DonutRing } from '@/components/ui/DonutRing';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/cn';
import { peso, pct } from '@/lib/format';
import { budget } from '@/lib/mock';
import { CATEGORY_BY_KEY } from '@/theme/categories';
import { colors } from '@/theme/tokens';

const MONTHS = ['July', 'June', 'May', 'Apr'];

export default function Budget() {
  const insets = useSafeAreaInsets();
  const [month, setMonth] = useState('July');

  const totalSpent = budget.reduce((s, b) => s + b.spent, 0);
  const totalBudget = budget.reduce((s, b) => s + b.budget, 0);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-6">
        <View className="py-3">
          <Text className="text-2xl font-bold text-royal">Budget</Text>
          <Text className="text-sm text-ink-muted">Monthly spending overview</Text>
        </View>

        {/* Month selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pb-1">
          {MONTHS.map((m) => {
            const active = m === month;
            return (
              <Pressable
                key={m}
                onPress={() => setMonth(m)}
                className={cn(
                  'rounded-full border px-4 py-2',
                  active ? 'border-brand bg-brand' : 'border-hairline bg-surface',
                )}>
                <Text className={cn('text-sm font-medium', active ? 'text-white' : 'text-ink-soft')}>{m}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Total spent */}
        <Card className="mt-4 items-center py-6">
          <Text className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Total Spent</Text>
          <Text className="mt-1 text-4xl font-extrabold text-brand">{peso(totalSpent)}</Text>
          <Text className="mb-3 text-sm text-ink-muted">of {peso(totalBudget)}</Text>
          <ProgressBar value={pct(totalSpent, totalBudget)} color={colors.brand.DEFAULT} height={8} className="w-full" />
        </Card>

        {/* Categories */}
        <View className="mb-3 mt-6 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-royal">Categories</Text>
          <Pressable
            onPress={() => router.push({ pathname: '/category-form', params: { mode: 'add' } })}
            className="h-10 w-10 items-center justify-center rounded-lg bg-brand">
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </Pressable>
        </View>

        <View className="gap-3">
          {budget.map((line) => {
            const cat = CATEGORY_BY_KEY[line.key];
            const percent = pct(line.spent, line.budget);
            return (
              <Pressable
                key={line.key}
                onPress={() => router.push({ pathname: '/category-form', params: { mode: 'edit', key: line.key } })}>
                <Card className="flex-row items-center gap-3.5">
                  <DonutRing value={percent} color={cat.color} size={52} strokeWidth={6}>
                    <Text className="text-[11px] font-bold text-ink">{percent}%</Text>
                  </DonutRing>
                  <View className="flex-1">
                    <View className="mb-2 flex-row items-center gap-2">
                      <MaterialCommunityIcons name={cat.icon} size={18} color={cat.color} />
                      <Text className="text-[15px] font-semibold text-ink">{cat.label}</Text>
                      <Text className="ml-auto text-[13px] text-ink-muted">
                        <Text className="font-bold text-ink">{peso(line.spent)}</Text>/{peso(line.budget)}
                      </Text>
                    </View>
                    <ProgressBar value={percent} color={cat.color} height={7} />
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
