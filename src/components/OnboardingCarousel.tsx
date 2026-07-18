import { ComponentProps, ReactNode, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { colors } from '@/theme/tokens';

type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type OnboardingSlide = {
  key: string;
  icon: MCIName;
  title: string;
  body: string;
  tint?: string;
};

type Props = {
  slides: OnboardingSlide[];
  doneLabel: string;
  onDone: () => void;
  onSkip?: () => void;
  /** Extra content shown above the buttons (e.g. a "Don't show again" toggle). */
  footer?: ReactNode;
};

export function OnboardingCarousel({ slides, doneLabel, onDone, onSkip, footer }: Props) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    scrollRef.current?.scrollTo({ x: clamped * width, animated: true });
    setIndex(clamped);
  };

  const isLast = index === slides.length - 1;

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      {/* Skip */}
      <View className="h-10 flex-row justify-end px-5">
        {onSkip && !isLast ? (
          <Pressable hitSlop={8} onPress={onSkip}>
            <Text className="text-sm font-semibold text-ink-muted">Skip</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        className="flex-1">
        {slides.map((s) => {
          const tint = s.tint ?? colors.brand.DEFAULT;
          return (
            <View key={s.key} style={{ width }} className="flex-1 items-center justify-center px-8">
              <View
                className="mb-8 h-40 w-40 items-center justify-center rounded-full"
                style={{ backgroundColor: tint + '18' }}>
                <View
                  className="h-24 w-24 items-center justify-center rounded-3xl"
                  style={{ backgroundColor: tint }}>
                  <MaterialCommunityIcons name={s.icon} size={52} color="#fff" />
                </View>
              </View>
              <Text className="text-center text-2xl font-bold text-ink">{s.title}</Text>
              <Text className="mt-3 text-center text-[15px] leading-6 text-ink-muted">{s.body}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Dots */}
      <View className="mb-5 flex-row justify-center gap-2">
        {slides.map((s, i) => (
          <View
            key={s.key}
            className={cn('h-2 rounded-full', i === index ? 'w-6 bg-brand' : 'w-2 bg-hairline')}
          />
        ))}
      </View>

      <View className="px-5" style={{ paddingBottom: insets.bottom + 16 }}>
        {footer}
        <View className={cn('flex-row gap-3', !!footer && 'mt-3')}>
          {index > 0 ? (
            <Button label="Back" variant="secondary" className="flex-1" onPress={() => goTo(index - 1)} />
          ) : null}
          <Button
            label={isLast ? doneLabel : 'Next'}
            className="flex-1"
            onPress={() => (isLast ? onDone() : goTo(index + 1))}
          />
        </View>
      </View>
    </View>
  );
}
