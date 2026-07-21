import '@/global.css';

import type { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/lib/auth';

export const unstable_settings = {
  initialRouteName: 'index',
};

const isWeb = Platform.OS === 'web';

/**
 * On web, React Native fills the whole browser window. This app is a phone UI,
 * so on web we center it inside a device-sized frame; on native we render the
 * navigator directly (full screen).
 */
function AppShell({ children }: { children: ReactNode }) {
  if (!isWeb) return <>{children}</>;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5E7EB' }}>
      <View
        style={{
          width: '100%',
          maxWidth: 402,
          height: '100%',
          maxHeight: 874,
          backgroundColor: '#fff',
          borderRadius: 28,
          overflow: 'hidden',
          // Web-only visual polish; RN Web maps boxShadow from these props.
          shadowColor: '#0F172A',
          shadowOpacity: 0.18,
          shadowRadius: 40,
          shadowOffset: { width: 0, height: 20 },
        }}>
        {children}
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          <AppShell>
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
          </AppShell>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
