import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { ModalSheet } from '@/components/ui/ModalSheet';
import { TextField } from '@/components/ui/TextField';
import { colors } from '@/theme/tokens';

export default function ForgotPassword() {
  return (
    <ModalSheet onClose={() => router.back()}>
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-ink">Forgot your Password?</Text>
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={20} color={colors.ink.soft} />
        </Pressable>
      </View>
      <Text className="mb-4 text-xs text-ink-muted">
        Enter your email to receive a password reset link.
      </Text>
      <TextField placeholder="your@email.com" autoCapitalize="none" keyboardType="email-address" />
      <View className="mt-4">
        <Button label="Request Password Reset" onPress={() => router.replace('/(auth)/verify-email')} />
      </View>
    </ModalSheet>
  );
}
