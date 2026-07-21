import { useState } from 'react';
import { Text, View } from 'react-native';
import { Link, router } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Logo } from '@/components/Logo';
import { GoogleIcon } from '@/components/GoogleIcon';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen scroll contentClassName="pb-10">
      <View className="items-center pb-8 pt-14">
        <Logo size={72} />
      </View>

      <View className="gap-5">
        <TextField
          label="Email"
          placeholder="your@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Link href="/(auth)/forgot-password" className="self-end text-sm font-semibold text-brand">
          Forgot Password?
        </Link>

        <Button label="Sign In" onPress={() => router.replace('/(tabs)')} />

        <View className="flex-row items-center gap-3 py-1">
          <View className="h-px flex-1 bg-hairline" />
          <Text className="text-xs text-ink-faint">or continue with</Text>
          <View className="h-px flex-1 bg-hairline" />
        </View>

        <Button
          label="Continue With Google"
          variant="secondary"
          onPress={() => router.replace('/(tabs)')}
          leading={<GoogleIcon size={18} />}
        />

        <View className="flex-row justify-center pt-2">
          <Text className="text-sm text-ink-muted">New to Budget AI? </Text>
          <Link href="/(auth)/sign-up" className="text-sm font-semibold text-brand">
            Create Account
          </Link>
        </View>
      </View>
    </Screen>
  );
}
