import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { ModalSheet } from '@/components/ui/ModalSheet';
import { TextField } from '@/components/ui/TextField';
import { peso, pct } from '@/lib/format';
import { goals } from '@/lib/mock';
import { colors } from '@/theme/tokens';

export default function AddFunds() {
  const { key } = useLocalSearchParams<{ key?: string }>();
  const goal = key ? goals.find((g) => g.key === key) : undefined;
  const [amount, setAmount] = useState('');

  return (
    <ModalSheet onClose={() => router.back()} position="bottom">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-royal">Add Funds</Text>
        <Pressable hitSlop={10} onPress={() => router.back()} className="h-8 w-8 items-center justify-center rounded-full bg-track">
          <MaterialCommunityIcons name="close" size={18} color={colors.ink.soft} />
        </Pressable>
      </View>

      {goal ? (
        <View className="mb-4 flex-row items-center gap-3 rounded-card bg-track p-3">
          <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: goal.color + '22' }}>
            <MaterialCommunityIcons name={goal.icon as any} size={20} color={goal.color} />
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-semibold text-ink">{goal.name}</Text>
            <Text className="text-xs text-ink-muted">
              {peso(goal.saved)} of {peso(goal.target)} · {pct(goal.saved, goal.target)}%
            </Text>
          </View>
        </View>
      ) : null}

      <Text className="mb-2 text-xs font-bold uppercase tracking-wide text-royal">Amount</Text>
      <TextField
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
        prefix={<Text className="mr-1 text-base font-bold text-brand">₱</Text>}
      />

      <View className="mt-5">
        <Button label="Add Funds" onPress={() => router.back()} />
      </View>
    </ModalSheet>
  );
}
