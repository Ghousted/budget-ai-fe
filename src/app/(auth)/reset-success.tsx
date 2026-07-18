import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { gradients } from '@/theme/tokens';

export default function ResetSuccess() {
  return (
    <View className="flex-1 items-center justify-center bg-brand-950 px-6">
      <StatusBar style="light" />
      <LinearGradient colors={gradients.hero} className="absolute inset-0" />

      <View className="w-full items-center rounded-sheet bg-surface px-6 py-8">
        {/* Award medal: gold disc + check over two blue ribbon tails */}
        <View className="mb-5 h-24 w-20 items-center">
          <View className="absolute bottom-0 left-4 h-9 w-4 rotate-[18deg] rounded-sm bg-brand" />
          <View className="absolute bottom-0 right-4 h-9 w-4 -rotate-[18deg] rounded-sm bg-brand" />
          <View className="h-16 w-16 items-center justify-center rounded-full bg-amber-400">
            <MaterialCommunityIcons name="check" size={34} color="#fff" />
          </View>
        </View>

        <Text className="mb-6 text-center text-[15px] leading-6 text-ink-soft">
          You have successfully created a new password, kindly click the button below to sign in with
          your new password now.
        </Text>

        <Button label="Sign in now" onPress={() => router.replace('/(auth)/sign-in')} />
      </View>
    </View>
  );
}
