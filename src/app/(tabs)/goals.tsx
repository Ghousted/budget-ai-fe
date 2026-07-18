import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/ui/Card';
import { DonutRing } from '@/components/ui/DonutRing';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { peso, pct } from '@/lib/format';
import { goals, goalsSummary } from '@/lib/mock';
import { colors, gradients } from '@/theme/tokens';

export default function Goals() {
  const insets = useSafeAreaInsets();
  const overall = pct(goalsSummary.totalSaved, goalsSummary.totalTarget);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-6">
        <View className="flex-row items-center justify-between py-3">
          <View>
            <Text className="text-2xl font-bold text-royal">Goals</Text>
            <Text className="text-sm text-ink-muted">Track your savings targets</Text>
          </View>
          <Pressable
            onPress={() => router.push({ pathname: '/goal-form', params: { mode: 'add' } })}
            className="h-10 w-10 items-center justify-center rounded-lg bg-brand">
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </Pressable>
        </View>

        {/* Savings summary */}
        <LinearGradient colors={gradients.balanceCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="rounded-sheet p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold uppercase tracking-wide text-white/70">Total Saved</Text>
            <View className="rounded-full bg-white/20 px-2.5 py-1">
              <Text className="text-xs font-bold text-white">{overall}%</Text>
            </View>
          </View>
          <Text className="mt-1 text-4xl font-extrabold text-white">{peso(goalsSummary.totalSaved)}</Text>
          <Text className="mb-3 text-sm text-white/70">of {peso(goalsSummary.totalTarget)} target</Text>
          <ProgressBar value={overall} color="#fff" trackClassName="bg-white/25" height={8} />
        </LinearGradient>

        {/* Goal cards */}
        <View className="mt-5 gap-3">
          {goals.map((g) => {
            const percent = pct(g.saved, g.target);
            return (
              <Card key={g.key}>
                <View className="flex-row items-center gap-4">
                  <DonutRing value={percent} color={g.color} size={64} strokeWidth={7}>
                    <MaterialCommunityIcons name={g.icon as any} size={22} color={g.color} />
                  </DonutRing>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-base font-bold text-ink">{g.name}</Text>
                      <Pressable
                        hitSlop={8}
                        onPress={() => router.push({ pathname: '/goal-form', params: { mode: 'edit', key: g.key } })}>
                        <MaterialCommunityIcons name="pencil-outline" size={18} color={colors.ink.faint} />
                      </Pressable>
                    </View>
                    <Text className="mt-0.5 text-[13px] text-ink-muted">
                      <Text className="font-bold text-ink">{peso(g.saved)}</Text> of {peso(g.target)}
                    </Text>
                    <View className="mt-1 flex-row items-center gap-1">
                      <MaterialCommunityIcons name="calendar-outline" size={13} color={colors.ink.faint} />
                      <Text className="text-xs text-ink-faint">Target {g.targetLabel}</Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() => router.push({ pathname: '/add-funds', params: { key: g.key } })}
                  className="mt-3 flex-row items-center justify-center gap-1.5 rounded-field bg-brand-50 py-2.5">
                  <MaterialCommunityIcons name="plus-circle-outline" size={16} color={colors.brand.DEFAULT} />
                  <Text className="text-sm font-semibold text-brand">Add Funds</Text>
                </Pressable>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
