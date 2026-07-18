import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ModalSheet } from '@/components/ui/ModalSheet';
import { colors } from '@/theme/tokens';

type Note = { id: string; icon: any; color: string; title: string; body: string; when: string; unread?: boolean };

const NOTES: Note[] = [
  { id: 'n1', icon: 'alert-circle-outline', color: colors.expense, title: 'Budget Alert', body: "You've used 93% of your Bills budget.", when: '2h ago', unread: true },
  { id: 'n2', icon: 'flag-checkered', color: colors.income, title: 'Goal Milestone', body: 'Emergency Fund reached 68%!', when: '5h ago', unread: true },
  { id: 'n3', icon: 'robot-happy', color: colors.brand.DEFAULT, title: 'New AI Insight', body: 'Peso found a way to save ₱1,200 this month.', when: '1d ago' },
  { id: 'n4', icon: 'calendar-clock', color: colors.cat.amber, title: 'Payment Reminder', body: 'Globe postpaid is due in 3 days.', when: '1d ago' },
];

export default function Notifications() {
  return (
    <ModalSheet onClose={() => router.back()} position="top" className="max-h-[70%]">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-royal">Notifications</Text>
        <Pressable hitSlop={10} onPress={() => router.back()} className="h-8 w-8 items-center justify-center rounded-full bg-track">
          <MaterialCommunityIcons name="close" size={18} color={colors.ink.soft} />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="grow-0">
        {NOTES.map((n) => (
          <View key={n.id} className="flex-row items-start gap-3 border-b border-hairline py-3 last:border-0">
            <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: n.color + '22' }}>
              <MaterialCommunityIcons name={n.icon} size={20} color={n.color} />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-[15px] font-semibold text-ink">{n.title}</Text>
                {n.unread ? <View className="h-2 w-2 rounded-full bg-brand" /> : null}
              </View>
              <Text className="text-[13px] leading-5 text-ink-muted">{n.body}</Text>
            </View>
            <Text className="text-xs text-ink-faint">{n.when}</Text>
          </View>
        ))}
      </ScrollView>
    </ModalSheet>
  );
}
