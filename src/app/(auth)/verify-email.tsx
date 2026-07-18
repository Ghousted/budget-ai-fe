import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { gradients } from '@/theme/tokens';

const LEN = 5;

export default function VerifyEmail() {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);
  const showError = code.length === LEN && code !== '12345';

  return (
    <View className="flex-1 bg-brand-950">
      <StatusBar style="light" />
      <LinearGradient colors={gradients.hero} className="absolute left-0 right-0 top-0 h-1/2" />

      <View className="flex-1 justify-end">
        <View
          className="rounded-t-[32px] bg-surface px-5 pt-8"
          style={{ minHeight: '74%', paddingBottom: insets.bottom + 20 }}>
          <Text className="text-2xl font-bold text-royal">Verify Email</Text>
          <Text className="mt-1 text-sm text-ink-muted">
            Verify your email address below to proceed.
          </Text>

          <Text className="mb-4 mt-8 text-center text-sm text-ink-muted">
            Enter the <Text className="font-semibold text-ink">5 digits code</Text> sent to your email
            address <Text className="font-semibold text-ink">y*****@mail.com</Text> below.
          </Text>

          {/* OTP: five display boxes over one hidden input */}
          <Pressable onPress={() => inputRef.current?.focus()} className="flex-row justify-between">
            {Array.from({ length: LEN }).map((_, i) => {
              const focused = i === code.length;
              return (
                <View
                  key={i}
                  className={cn(
                    'h-14 w-[56px] items-center justify-center rounded-lg bg-track',
                    showError && 'border border-expense',
                    focused && !showError && 'border border-brand',
                  )}>
                  <Text className="text-xl font-bold text-ink">{code[i] ?? ''}</Text>
                </View>
              );
            })}
          </Pressable>
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={(t) => setCode(t.replace(/[^0-9]/g, '').slice(0, LEN))}
            keyboardType="number-pad"
            maxLength={LEN}
            className="absolute h-0 w-0 opacity-0"
            autoFocus
          />
          {showError ? (
            <Text className="mt-1.5 text-[11px] text-expense">The code you entered is incorrect.</Text>
          ) : null}

          <Text className="mt-6 text-center text-sm text-ink-muted">
            Code expires in <Text className="font-semibold text-ink">1:43s</Text>
          </Text>
          <View className="mt-1 flex-row justify-center">
            <Text className="text-sm text-ink-muted">Didn't get code? </Text>
            <Pressable onPress={() => setCode('')}>
              <Text className="text-sm font-semibold text-brand">Reset Code</Text>
            </Pressable>
          </View>

          <View className="mt-8">
            <Button label="Verify email address" onPress={() => router.replace('/(auth)/create-password')} />
          </View>

          <View className="mt-4 flex-row justify-center">
            <Text className="text-sm text-ink-muted">Already have an account? </Text>
            <Link href="/(auth)/sign-in" className="text-sm font-semibold text-brand">
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
