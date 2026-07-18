import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { ColorPicker } from '@/components/ColorPicker';
import { IconPicker } from '@/components/IconPicker';
import { ModalSheet } from '@/components/ui/ModalSheet';
import { TextField } from '@/components/ui/TextField';
import { budget } from '@/lib/mock';
import { CATEGORY_BY_KEY } from '@/theme/categories';
import { colors } from '@/theme/tokens';

function Label({ children }: { children: string }) {
  return <Text className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide text-royal">{children}</Text>;
}

export default function CategoryForm() {
  const { mode, key } = useLocalSearchParams<{ mode?: string; key?: string }>();
  const editing = mode === 'edit';
  const existing = editing && key ? CATEGORY_BY_KEY[key] : undefined;
  const existingLine = editing && key ? budget.find((b) => b.key === key) : undefined;

  const [name, setName] = useState(existing?.label ?? '');
  const [amount, setAmount] = useState(existingLine ? String(existingLine.budget) : '');
  const [icon, setIcon] = useState<any>(existing?.icon ?? 'silverware-fork-knife');
  const [color, setColor] = useState(existing?.color ?? colors.cat.red);

  return (
    <ModalSheet onClose={() => router.back()} position="bottom" className="max-h-[90%]">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-royal">{editing ? 'Edit Category' : 'New Category'}</Text>
        <Pressable hitSlop={10} onPress={() => router.back()} className="h-8 w-8 items-center justify-center rounded-full bg-track">
          <MaterialCommunityIcons name="close" size={18} color={colors.ink.soft} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="grow-0">
        <Label>Icon</Label>
        <IconPicker value={icon} onChange={setIcon} color={color} />

        <Label>Category Name</Label>
        <TextField placeholder="e.g. Groceries" value={name} onChangeText={setName} />

        <Label>Monthly Budget</Label>
        <TextField
          placeholder="0.00"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          prefix={<Text className="mr-1 text-base font-bold text-brand">₱</Text>}
        />

        <Label>Color</Label>
        <ColorPicker value={color} onChange={setColor} />
      </ScrollView>

      <View className="mt-5">
        <Button label={editing ? 'Save Changes' : 'Add Category'} onPress={() => router.back()} />
      </View>
    </ModalSheet>
  );
}
