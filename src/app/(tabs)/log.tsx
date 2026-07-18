import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { cn } from '@/lib/cn';
import { CATEGORIES } from '@/theme/categories';
import { colors } from '@/theme/tokens';

type EntryType = 'expense' | 'income';
type Method = 'manual' | 'scan' | 'voice';

export default function LogEntry() {
  const [type, setType] = useState<EntryType>('expense');
  const [method, setMethod] = useState<Method>('manual');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const showTabs = type === 'expense';
  const showManualForm = type === 'income' || method === 'manual';

  return (
    <Screen scroll contentClassName="pb-8">
      <View className="pb-4 pt-3">
        <Text className="text-2xl font-bold text-brand-800">Log Entry</Text>
        <Text className="text-sm text-ink-muted">Track every peso</Text>
      </View>

      <SegmentedControl
        segments={[
          { key: 'expense', label: 'Expense' },
          { key: 'income', label: 'Income' },
        ]}
        value={type}
        onChange={(k) => setType(k as EntryType)}
        selectedBg={type === 'expense' ? colors.expense : colors.income}
      />

      {showTabs ? (
        <SegmentedControl
          className="mt-3"
          segments={[
            { key: 'manual', label: 'Manual', icon: 'keyboard-outline' },
            { key: 'scan', label: 'Scan', icon: 'scan-helper' },
            { key: 'voice', label: 'Voice', icon: 'microphone' },
          ]}
          value={method}
          onChange={(k) => setMethod(k as Method)}
        />
      ) : null}

      <View className="mt-5 gap-4">
        {showManualForm ? (
          <>
            <Card>
              <Text className="mb-1 text-[13px] text-ink-muted">Amount (₱)</Text>
              <View className="flex-row items-center">
                <Text className="text-3xl font-bold text-brand">₱</Text>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  placeholderTextColor={colors.ink.faint}
                  className="ml-1 flex-1 text-3xl font-semibold text-ink"
                />
              </View>
            </Card>

            <Card>
              <Text className="mb-1 text-[13px] text-ink-muted">Note (Optional)</Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="e.g. Jollibee with team"
                placeholderTextColor={colors.ink.faint}
                className="text-base text-ink"
              />
            </Card>

            {type === 'expense' ? (
              <View>
                <Text className="mb-2 text-sm text-ink-muted">Category</Text>
                <View className="flex-row flex-wrap gap-y-3">
                  {CATEGORIES.map((c) => {
                    const active = category === c.key;
                    return (
                      <View key={c.key} className="w-1/4 px-1">
                        <Pressable
                          onPress={() => setCategory(c.key)}
                          className={cn(
                            'items-center justify-center rounded-xl border py-3',
                            active ? 'border-brand bg-brand-50' : 'border-hairline bg-surface',
                          )}>
                          <MaterialCommunityIcons
                            name={c.icon}
                            size={22}
                            color={active ? colors.brand.DEFAULT : colors.ink.soft}
                          />
                          <Text
                            numberOfLines={1}
                            className={cn('mt-1 text-[11px]', active ? 'font-semibold text-brand' : 'text-ink-soft')}>
                            {c.short}
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}

            <Button label={type === 'income' ? 'Save Income' : 'Save Entry'} className="mt-2" />
          </>
        ) : method === 'scan' ? (
          <ScanView />
        ) : (
          <VoiceView />
        )}
      </View>
    </Screen>
  );
}

function ScanView() {
  return (
    <View className="items-center">
      <View className="aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sheet bg-brand-950">
        <CornerBrackets />
        <MaterialCommunityIcons name="receipt" size={40} color="rgba(255,255,255,0.25)" />
        <Text className="absolute bottom-6 text-xs text-white/70">Point camera at receipt</Text>
      </View>
      <Text className="mt-5 text-lg font-bold text-brand">OCR Receipt Scanner</Text>
      <Text className="mt-1 text-[13px] text-ink-muted">Auto-extracts amount, merchant, and date</Text>
      <Button label="Capture Receipt" className="mt-5" leading={<MaterialCommunityIcons name="camera" size={18} color="#fff" />} />
    </View>
  );
}

function CornerBrackets() {
  const base = 'absolute h-8 w-8 border-brand';
  return (
    <>
      <View className={cn(base, 'left-4 top-4 rounded-tl-xl border-l-4 border-t-4')} />
      <View className={cn(base, 'right-4 top-4 rounded-tr-xl border-r-4 border-t-4')} />
      <View className={cn(base, 'bottom-4 left-4 rounded-bl-xl border-b-4 border-l-4')} />
      <View className={cn(base, 'bottom-4 right-4 rounded-br-xl border-b-4 border-r-4')} />
    </>
  );
}

function VoiceView() {
  const examples = ['💡 "Spent ₱180 on Grab"', '💡 "Received ₱5,000 salary"', '💡 "₱89 Globe load"'];
  return (
    <View className="items-center pt-6">
      <Pressable className="h-20 w-20 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/40">
        <MaterialCommunityIcons name="microphone" size={34} color="#fff" />
      </Pressable>
      <Text className="mt-4 text-base font-bold text-ink">Tap to speak</Text>
      <View className="mt-8 gap-2.5">
        {examples.map((e) => (
          <Text key={e} className="text-center text-[15px] text-ink-soft">
            {e}
          </Text>
        ))}
      </View>
    </View>
  );
}
