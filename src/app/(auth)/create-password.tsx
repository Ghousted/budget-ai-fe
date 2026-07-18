import { View } from 'react-native';
import { router } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Logo } from '@/components/Logo';
import { Text } from 'react-native';

export default function CreatePassword() {
  return (
    <Screen scroll contentClassName="pb-10">
      <View className="items-center pb-8 pt-12">
        <Logo size={64} />
      </View>

      <Text className="text-2xl font-bold text-royal">Create new password</Text>
      <Text className="mb-6 mt-1 text-sm text-ink-faint">Create new password to proceed</Text>

      <View className="gap-4">
        <TextField
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry
          helper="Password should be at least 8 characters"
        />
        <TextField label="Confirm Password" placeholder="Confirm new password" secureTextEntry />
        <View className="mt-2">
          <Button label="Reset Password" onPress={() => router.replace('/(auth)/reset-success')} />
        </View>
      </View>
    </Screen>
  );
}
