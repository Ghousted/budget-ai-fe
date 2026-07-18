import '@/global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fff' } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="settings" />
          {/* Transparent overlays (bottom sheets / dialogs). */}
          {(['category-form', 'goal-form', 'add-funds', 'delete-goal', 'notifications'] as const).map((name) => (
            <Stack.Screen key={name} name={name} options={{ presentation: 'transparentModal', animation: 'fade' }} />
          ))}
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
