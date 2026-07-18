import { useState } from 'react';
import { Modal, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/lib/cn';
import { user } from '@/lib/mock';
import { colors } from '@/theme/tokens';

const CURRENCIES = ['PHP (₱)', 'USD ($)', 'EUR (€)'];
const LANGUAGES = ['English (EN)', 'Tagalog', 'Cebuano'];

export default function Settings() {
  const insets = useSafeAreaInsets();
  const [push, setPush] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('PHP (₱)');
  const [language, setLanguage] = useState('English (EN)');
  const [picker, setPicker] = useState<null | 'currency' | 'language'>(null);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center gap-3 px-5 pb-2 pt-1">
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.ink.DEFAULT} />
        </Pressable>
        <View>
          <Text className="text-2xl font-bold text-royal">Settings</Text>
          <Text className="text-xs text-ink-muted">Preferences & account</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10">
        {/* Profile */}
        <View className="mt-2 flex-row items-center gap-3 rounded-card border border-hairline p-4">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-brand">
            <Text className="text-lg font-bold text-white">{user.firstName[0]}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-ink">{user.fullName}</Text>
            <Text className="text-xs text-ink-muted">{user.email}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.ink.faint} />
        </View>

        <Group title="Notifications">
          <Row icon="bell-outline" label="Push Notifications" toggle value={push} onToggle={setPush} />
          <Row icon="lightbulb-on-outline" label="AI Insights" toggle value={aiInsights} onToggle={setAiInsights} last />
        </Group>

        <Group title="Privacy & Security">
          <Row icon="fingerprint" label="Biometric Login" toggle value={biometric} onToggle={setBiometric} />
          <Row icon="shield-lock-outline" label="Two-Factor Auth" chevron />
          <Row icon="lock-reset" label="Change Password" chevron last />
        </Group>

        <Group title="App Preferences">
          <Row icon="cash-multiple" label="Currency" pill={currency} onPress={() => setPicker('currency')} />
          <Row icon="translate" label="Language" pill={language} onPress={() => setPicker('language')} />
          <Row icon="weather-night" label="Dark Mode" toggle value={darkMode} onToggle={setDarkMode} last />
        </Group>

        <Pressable
          onPress={() => router.replace('/(auth)/sign-in')}
          className="mt-6 flex-row items-center justify-center gap-2 rounded-field border border-expense/30 bg-expense/5 py-3.5">
          <MaterialCommunityIcons name="logout" size={18} color={colors.expense} />
          <Text className="text-base font-semibold text-expense">Log Out</Text>
        </Pressable>
      </ScrollView>

      <SelectModal
        visible={picker === 'currency'}
        title="Currency"
        options={CURRENCIES}
        selected={currency}
        onSelect={(v) => { setCurrency(v); setPicker(null); }}
        onClose={() => setPicker(null)}
      />
      <SelectModal
        visible={picker === 'language'}
        title="Language"
        options={LANGUAGES}
        selected={language}
        onSelect={(v) => { setLanguage(v); setPicker(null); }}
        onClose={() => setPicker(null)}
      />
    </View>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mt-6">
      <Text className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">{title}</Text>
      <View className="overflow-hidden rounded-card border border-hairline">{children}</View>
    </View>
  );
}

type RowProps = {
  icon: any;
  label: string;
  toggle?: boolean;
  chevron?: boolean;
  pill?: string;
  value?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
  last?: boolean;
};

function Row({ icon, label, toggle, chevron, pill, value, onToggle, onPress, last }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn('flex-row items-center gap-3 px-4 py-3.5', !last && 'border-b border-hairline')}>
      <MaterialCommunityIcons name={icon} size={20} color={colors.ink.soft} />
      <Text className="flex-1 text-[15px] text-ink">{label}</Text>
      {toggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ true: colors.brand.DEFAULT, false: '#D1D5DB' }}
          thumbColor="#fff"
        />
      ) : null}
      {pill ? (
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-medium text-brand">{pill}</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.ink.faint} />
        </View>
      ) : null}
      {chevron ? <MaterialCommunityIcons name="chevron-right" size={20} color={colors.ink.faint} /> : null}
    </Pressable>
  );
}

function SelectModal({
  visible, title, options, selected, onSelect, onClose,
}: {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} className="flex-1 justify-end bg-black/60">
        <Pressable
          onPress={() => {}}
          className="rounded-t-sheet bg-surface px-5 pt-5"
          style={{ paddingBottom: insets.bottom + 16 }}>
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-royal">{title}</Text>
            <Pressable hitSlop={10} onPress={onClose} className="h-8 w-8 items-center justify-center rounded-full bg-track">
              <MaterialCommunityIcons name="close" size={18} color={colors.ink.soft} />
            </Pressable>
          </View>
          {options.map((opt) => {
            const active = opt === selected;
            return (
              <Pressable
                key={opt}
                onPress={() => onSelect(opt)}
                className={cn(
                  'my-1 flex-row items-center justify-between rounded-field px-4 py-3.5',
                  active ? 'bg-brand-50' : 'bg-track',
                )}>
                <Text className={cn('text-[15px]', active ? 'font-semibold text-brand' : 'text-ink')}>{opt}</Text>
                {active ? <MaterialCommunityIcons name="check" size={20} color={colors.brand.DEFAULT} /> : null}
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
