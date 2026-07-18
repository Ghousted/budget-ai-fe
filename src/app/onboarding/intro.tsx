import { router } from 'expo-router';

import { OnboardingCarousel, type OnboardingSlide } from '@/components/OnboardingCarousel';
import { colors } from '@/theme/tokens';

// Titles are from the Figma "Opening - Onboarding" frames; body copy is
// approximate pending exact copy from the design (Figma export blocked).
const SLIDES: OnboardingSlide[] = [
  {
    key: 'control',
    icon: 'wallet-outline',
    title: 'Take Control of Your Finances',
    body: 'Track every peso, see where your money goes, and stay on top of your budget effortlessly.',
    tint: colors.brand.DEFAULT,
  },
  {
    key: 'budget',
    icon: 'chart-donut',
    title: 'Smarter Budgeting with Budget AI',
    body: 'Set monthly budgets by category and get gentle nudges before you overspend.',
    tint: colors.cat.purple,
  },
  {
    key: 'goals',
    icon: 'bullseye-arrow',
    title: 'Reach Your Financial Goals',
    body: 'Save toward what matters — an emergency fund, a trip, a new laptop — and watch your progress grow.',
    tint: colors.income,
  },
];

export default function Intro() {
  return (
    <OnboardingCarousel
      slides={SLIDES}
      doneLabel="Get Started"
      onSkip={() => router.replace('/(auth)/sign-in')}
      onDone={() => router.replace('/(auth)/sign-in')}
    />
  );
}
