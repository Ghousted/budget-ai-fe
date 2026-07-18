import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { gradients } from '@/theme/tokens';

/** Branded splash. Fades the mark in, then advances to the intro onboarding. */
export default function Splash() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(() => router.replace('/onboarding/intro'), 1600);
    return () => clearTimeout(t);
  }, [opacity, scale]);

  return (
    <View className="flex-1 items-center justify-center bg-brand">
      <StatusBar style="light" />
      <LinearGradient colors={gradients.balanceCard} className="absolute inset-0" />
      <Animated.View style={{ opacity, transform: [{ scale }] }} className="items-center gap-4">
        <View className="h-24 w-24 items-center justify-center rounded-3xl bg-white/15">
          <MaterialCommunityIcons name="robot-happy" size={60} color="#fff" />
        </View>
        <Text className="text-3xl font-extrabold tracking-tight text-white">Budget AI</Text>
        <Text className="text-sm text-white/70">Smarter money, powered by AI</Text>
      </Animated.View>
    </View>
  );
}
