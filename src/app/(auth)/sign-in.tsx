import { useState } from 'react';
import { Text, View } from 'react-native';
import { Link, router } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Logo } from '@/components/Logo';
import { GoogleIcon } from '@/components/GoogleIcon';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 0
          ? "Can't reach the server. Is the API running?"
          : 'Sign in failed. Please check your details and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

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

        <Link href="/(auth)/forgot-password" asChild>
          <Text className="self-end text-sm font-semibold text-brand">Forgot Password?</Text>
        </Link>

        {error ? <Text className="text-center text-[13px] font-medium text-expense">{error}</Text> : null}

        <Button label="Sign In" onPress={handleSignIn} loading={loading} />

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
          <Link href="/(auth)/sign-up" asChild>
            <Text className="text-sm font-semibold text-brand">Create Account</Text>
          </Link>
        </View>
      </View>
    </Screen>
  );
}
