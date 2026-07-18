import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { ModalSheet } from '@/components/ui/ModalSheet';
import { goals } from '@/lib/mock';
import { colors } from '@/theme/tokens';

export default function DeleteGoal() {
  const { key } = useLocalSearchParams<{ key?: string }>();
  const goal = key ? goals.find((g) => g.key === key) : undefined;

  return (
    <ModalSheet onClose={() => router.back()}>
      <View className="items-center">
        <View className="mb-3 h-14 w-14 items-center justify-center rounded-full bg-expense/10">
          <MaterialCommunityIcons name="trash-can-outline" size={26} color={colors.expense} />
        </View>
        <Text className="text-lg font-bold text-ink">Remove Goal?</Text>
        <Text className="mb-5 mt-1 text-center text-sm text-ink-muted">
          Are you sure you want to remove {goal ? `"${goal.name}"` : 'this goal'}? This action can't be
          undone.
        </Text>
        <View className="w-full flex-row gap-3">
          <Button label="Cancel" variant="secondary" className="flex-1" onPress={() => router.back()} />
          <Button label="Remove" variant="destructive" className="flex-1" onPress={() => router.dismissAll()} />
        </View>
      </View>
    </ModalSheet>
  );
}
