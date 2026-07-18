import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { ColorPicker } from '@/components/ColorPicker';
import { IconPicker } from '@/components/IconPicker';
import { ModalSheet } from '@/components/ui/ModalSheet';
import { TextField } from '@/components/ui/TextField';
import { goals } from '@/lib/mock';
import { colors } from '@/theme/tokens';

function Label({ children }: { children: string }) {
  return <Text className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide text-royal">{children}</Text>;
}

export default function GoalForm() {
  const { mode, key } = useLocalSearchParams<{ mode?: string; key?: string }>();
  const editing = mode === 'edit';
  const existing = editing && key ? goals.find((g) => g.key === key) : undefined;

  const [name, setName] = useState(existing?.name ?? '');
  const [target, setTarget] = useState(existing ? String(existing.target) : '');
  const [date, setDate] = useState(existing?.targetLabel ?? '');
  const [icon, setIcon] = useState<any>(existing?.icon ?? 'shield-check');
  const [color, setColor] = useState(existing?.color ?? colors.cat.green);

  return (
    <ModalSheet onClose={() => router.back()} position="bottom" className="max-h-[90%]">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-royal">{editing ? 'Edit Goal' : 'New Goal'}</Text>
        <Pressable hitSlop={10} onPress={() => router.back()} className="h-8 w-8 items-center justify-center rounded-full bg-track">
          <MaterialCommunityIcons name="close" size={18} color={colors.ink.soft} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="grow-0">
        <Label>Icon</Label>
        <IconPicker value={icon} onChange={setIcon} color={color} />

        <Label>Goal Name</Label>
        <TextField placeholder="e.g. Japan Trip" value={name} onChangeText={setName} />

        <Label>Target Amount</Label>
        <TextField
          placeholder="0.00"
          keyboardType="decimal-pad"
          value={target}
          onChangeText={setTarget}
          prefix={<Text className="mr-1 text-base font-bold text-brand">₱</Text>}
        />

        <Label>Target Date</Label>
        <TextField placeholder="e.g. Dec 2025" value={date} onChangeText={setDate} />

        <Label>Color</Label>
        <ColorPicker value={color} onChange={setColor} />

        {editing ? (
          <Pressable
            onPress={() => router.replace({ pathname: '/delete-goal', params: { key: key ?? '' } })}
            className="mt-5 flex-row items-center justify-center gap-1.5 py-1">
            <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.expense} />
            <Text className="text-sm font-semibold text-expense">Delete Goal</Text>
          </Pressable>
        ) : null}
      </ScrollView>

      <View className="mt-5">
        <Button label={editing ? 'Save Changes' : 'Add Goal'} onPress={() => router.back()} />
      </View>
    </ModalSheet>
  );
}
