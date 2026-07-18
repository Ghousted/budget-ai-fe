import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Logo } from '@/components/Logo';
import { colors } from '@/theme/tokens';

export default function SignUp() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Screen scroll contentClassName="pb-10">
      <View className="items-center pb-6 pt-12">
        <Logo size={64} />
      </View>

      <View className="gap-4">
        <TextField label="Full Name" placeholder="John Doe" />
        <TextField label="Email" placeholder="your@email.com" autoCapitalize="none" keyboardType="email-address" />
        <TextField
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          helper="Password should be at least 8 characters"
        />

        <Pressable className="flex-row items-center gap-2.5 py-1" onPress={() => setAgreed((v) => !v)}>
          <View
            className="h-5 w-5 items-center justify-center rounded border-2 border-brand"
            style={agreed ? { backgroundColor: colors.brand.DEFAULT } : undefined}>
            {agreed ? <MaterialCommunityIcons name="check" size={14} color="#fff" /> : null}
          </View>
          <Text className="text-sm text-ink-muted">
            Continue to accept our{' '}
            <Link href="/(auth)/terms" className="font-semibold text-brand">
              Terms & Privacy Policy
            </Link>
          </Text>
        </Pressable>

        <Button label="Sign Up" disabled={!agreed} onPress={() => router.replace('/onboarding/setup')} />

        <View className="flex-row justify-center pt-2">
          <Text className="text-sm text-ink-muted">Already have an account? </Text>
          <Link href="/(auth)/sign-in" className="text-sm font-semibold text-brand">
            Sign In
          </Link>
        </View>
      </View>
    </Screen>
  );
}
