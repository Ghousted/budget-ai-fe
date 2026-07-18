import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LogRow } from '@/components/LogRow';
import { SectionHeader } from '@/components/SectionHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { peso, pesoSigned, pct } from '@/lib/format';
import { budget, insights, recentLogs, summary, user } from '@/lib/mock';
import { CATEGORY_BY_KEY } from '@/theme/categories';
import { colors, gradients } from '@/theme/tokens';

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-6">
        {/* Header */}
        <View className="flex-row items-center justify-between py-3">
          <Text className="text-2xl font-bold text-ink">{user.fullName}</Text>
          <View className="flex-row gap-2">
            <IconButton icon="bell-outline" badge onPress={() => router.push('/notifications')} />
            <IconButton icon="cog-outline" onPress={() => router.push('/settings')} />
          </View>
        </View>

        {/* Balance card */}
        <LinearGradient colors={gradients.balanceCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="rounded-sheet p-5">
          <Text className="text-xs font-semibold uppercase tracking-wide text-white/70">Total Balance</Text>
          <Text className="mt-1 text-4xl font-extrabold text-white">{peso(summary.totalBalance)}</Text>
          <View className="mt-1 flex-row items-center gap-1">
            <MaterialCommunityIcons name="arrow-up" size={15} color={colors.income} />
            <Text className="text-sm font-semibold text-income">{pesoSigned(summary.monthChange)}</Text>
            <Text className="text-sm text-white/70"> this month</Text>
          </View>

          <View className="mt-5 flex-row gap-3">
            <BalanceSub label="Income" amount={summary.income} icon="arrow-top-right" />
            <BalanceSub label="Expenses" amount={summary.expenses} icon="arrow-bottom-left" />
          </View>
        </LinearGradient>

        {/* AI Insights */}
        <View className="mt-6">
          <SectionHeader title="AI Insights" action="See all >" onAction={() => router.push('/(tabs)/ai')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-2">
            {insights.map((it) => (
              <View key={it.id} className="w-72 rounded-card border border-hairline bg-surface p-4">
                <View className="mb-1.5 flex-row items-center gap-1.5">
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color={colors.brand.DEFAULT} />
                  <Text className="text-[15px] font-bold text-royal">{it.title}</Text>
                </View>
                <Text className="text-[13px] leading-5 text-ink-muted">{it.body}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Budget Overview */}
        <View className="mt-6">
          <SectionHeader title="Budget Overview" action={summary.month} onAction={() => router.push('/(tabs)/budget')} />
          <View className="gap-3.5">
            {budget.slice(0, 4).map((line) => {
              const cat = CATEGORY_BY_KEY[line.key];
              return (
                <View key={line.key} className="rounded-card border border-hairline bg-surface px-4 py-3">
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-[15px] font-semibold text-ink">{cat.label}</Text>
                    <Text className="text-[13px] font-medium text-ink-muted">
                      <Text className="font-bold text-ink">{peso(line.spent)}</Text>/{peso(line.budget)}
                    </Text>
                  </View>
                  <ProgressBar value={pct(line.spent, line.budget)} color={cat.color} height={7} />
                </View>
              );
            })}
          </View>
        </View>

        {/* Recent Logs */}
        <View className="mt-6">
          <SectionHeader title="Recent Logs" action="View all >" onAction={() => router.push('/(tabs)/log')} />
          <View className="divide-y divide-hairline">
            {recentLogs.map((entry) => (
              <LogRow key={entry.id} entry={entry} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function IconButton({ icon, badge, onPress }: { icon: any; badge?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className="h-10 w-10 items-center justify-center rounded-full bg-brand-50">
      <MaterialCommunityIcons name={icon} size={20} color={colors.brand.DEFAULT} />
      {badge ? <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-expense" /> : null}
    </Pressable>
  );
}

function BalanceSub({ label, amount, icon }: { label: string; amount: number; icon: any }) {
  return (
    <View className="flex-1 rounded-card bg-white/15 p-3">
      <View className="flex-row items-center gap-1">
        <MaterialCommunityIcons name={icon} size={14} color="#fff" />
        <Text className="text-[13px] text-white/80">{label}</Text>
      </View>
      <Text className="mt-1 text-lg font-bold text-white">{peso(amount)}</Text>
    </View>
  );
}
