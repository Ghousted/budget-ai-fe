import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Logo } from '@/components/Logo';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { colors } from '@/theme/tokens';

export default function SignUp() {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = agreed && fullName.trim().length > 0 && email.trim().length > 0 && password.length >= 8;

  const handleSignUp = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    setError(null);
    try {
      await signUp(fullName.trim(), email.trim(), password);
      router.replace('/onboarding/setup');
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 0
          ? "Can't reach the server. Is the API running?"
          : 'Sign up failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll contentClassName="pb-10">
      <View className="items-center pb-6 pt-12">
        <Logo size={64} />
      </View>

      <View className="gap-4">
        <TextField label="Full Name" placeholder="John Doe" value={fullName} onChangeText={setFullName} />
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
          helper="Password should be at least 8 characters"
          value={password}
          onChangeText={setPassword}
        />

        <Pressable className="flex-row items-center gap-2.5 py-1" onPress={() => setAgreed((v) => !v)}>
          <View
            className="h-5 w-5 items-center justify-center rounded border-2 border-brand"
            style={agreed ? { backgroundColor: colors.brand.DEFAULT } : undefined}>
            {agreed ? <MaterialCommunityIcons name="check" size={14} color="#fff" /> : null}
          </View>
          <Text className="text-sm text-ink-muted">
            Continue to accept our{' '}
            <Link href="/(auth)/terms" asChild>
              <Text className="font-semibold text-brand">Terms & Privacy Policy</Text>
            </Link>
          </Text>
        </Pressable>

        {error ? <Text className="text-center text-[13px] font-medium text-expense">{error}</Text> : null}

        <Button label="Sign Up" disabled={!canSubmit} loading={loading} onPress={handleSignUp} />

        <View className="flex-row justify-center pt-2">
          <Text className="text-sm text-ink-muted">Already have an account? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <Text className="text-sm font-semibold text-brand">Sign In</Text>
          </Link>
        </View>
      </View>
    </Screen>
  );
}
