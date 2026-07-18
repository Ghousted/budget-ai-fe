import { Redirect } from 'expo-router';

/**
 * App entry. During the design phase this runs the full flow:
 * splash → intro onboarding → auth → (setup walkthrough) → tabs.
 * Later this is where we'll branch on stored auth / first-launch state.
 */
export default function Index() {
  return <Redirect href="/splash" />;
}
