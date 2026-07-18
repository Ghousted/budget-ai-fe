import { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { router } from 'expo-router';

import { OnboardingCarousel, type OnboardingSlide } from '@/components/OnboardingCarousel';
import { colors } from '@/theme/tokens';

// Feature titles are from the Figma "Onboarding" carousel frames; body copy is
// approximate pending exact copy from the design (Figma export blocked).
const SLIDES: OnboardingSlide[] = [
  { key: 'privacy', icon: 'shield-check', title: 'Privacy-First Finance', body: 'Your financial data stays yours. We never sell it — ever.', tint: colors.income },
  { key: 'insights', icon: 'lightbulb-on', title: 'AI-Powered Insights', body: 'Peso analyzes your spending and surfaces ways to save, automatically.', tint: colors.brand.DEFAULT },
  { key: 'budgeting', icon: 'chart-bar', title: 'Smart Budgeting', body: 'Category budgets with live progress, so you always know what’s left.', tint: colors.cat.purple },
  { key: 'goals', icon: 'bullseye-arrow', title: 'Goal Tracking', body: 'Set savings goals and add funds anytime, with visual progress rings.', tint: colors.cat.orange },
  { key: 'voice', icon: 'microphone', title: 'Log by Voice', body: 'Just say “Spent ₱180 on Grab” and Budget AI logs it for you.', tint: colors.cat.pink },
];

export default function Setup() {
  const [dontShow, setDontShow] = useState(false);

  return (
    <OnboardingCarousel
      slides={SLIDES}
      doneLabel="Get Started"
      onSkip={() => router.replace('/(tabs)')}
      onDone={() => router.replace('/(tabs)')}
      footer={
        <View className="flex-row items-center justify-center gap-2">
          <Switch
            value={dontShow}
            onValueChange={setDontShow}
            trackColor={{ true: colors.brand.DEFAULT, false: '#D1D5DB' }}
            thumbColor="#fff"
          />
          <Text className="text-sm text-ink-muted">Don’t show this again</Text>
        </View>
      }
    />
  );
}
