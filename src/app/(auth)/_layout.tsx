import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen name="forgot-password" options={{ presentation: 'transparentModal', animation: 'fade' }} />
      <Stack.Screen name="terms" options={{ presentation: 'transparentModal', animation: 'fade' }} />
    </Stack>
  );
}
