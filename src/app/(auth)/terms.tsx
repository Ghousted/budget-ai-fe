import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ModalSheet } from '@/components/ui/ModalSheet';
import { colors } from '@/theme/tokens';

const SECTIONS: { heading: string; body: string }[] = [
  { heading: 'Your Account', body: 'You are responsible for keeping your account information secure and providing accurate financial data.' },
  { heading: 'Your Data', body: 'Budget AI collects information such as your profile, financial records, goals, and preferences to provide personalized budgeting features and AI-powered insights.' },
  { heading: 'Privacy', body: 'Your personal information is used only to improve your experience and operate the app. We do not sell your personal data to third parties.' },
  { heading: 'Security', body: 'Your data is protected using industry-standard security measures. Always keep your login credentials confidential.' },
  { heading: 'AI Disclaimer', body: 'Budget AI provides budgeting recommendations and financial insights for informational purposes only. It does not replace professional financial, legal, or tax advice.' },
  { heading: 'Updates', body: 'These Terms & Privacy may be updated from time to time. Continued use of Budget AI means you accept any changes.' },
];

export default function Terms() {
  return (
    <ModalSheet onClose={() => router.back()} className="max-h-[85%]">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-royal">Terms and Privacy Policy</Text>
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={20} color={colors.ink.soft} />
        </Pressable>
      </View>
      <Text className="mb-3 text-xs text-ink-muted">
        <Text className="font-semibold text-ink-soft">Last Updated:</Text> July 2026
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} className="grow-0">
        <Text className="mb-3 text-sm leading-5 text-ink-soft">
          Welcome to <Text className="font-semibold">Budget AI</Text>. By creating an account or using
          the app, you agree to the following terms.
        </Text>
        {SECTIONS.map((s) => (
          <View key={s.heading} className="mb-3">
            <Text className="mb-1 text-sm font-bold text-ink">{s.heading}</Text>
            <Text className="text-sm leading-5 text-ink-soft">{s.body}</Text>
          </View>
        ))}
        <Text className="mb-1 text-sm font-bold text-ink">Contact</Text>
        <Text className="text-sm leading-5 text-ink-soft">
          For questions or support, please contact us at{' '}
          <Text className="text-brand underline">support@budgetai.app</Text>
        </Text>
      </ScrollView>
    </ModalSheet>
  );
}
