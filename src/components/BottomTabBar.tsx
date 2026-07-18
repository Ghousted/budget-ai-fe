import { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme/tokens';

type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

/**
 * Minimal structural shape of the props expo-router's `Tabs` passes to a custom
 * `tabBar`. Typed locally (rather than importing @react-navigation/bottom-tabs,
 * which isn't a direct dep) — the real props are assignable to this.
 */
type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: {
    emit: (event: { type: 'tabPress'; target?: string; canPreventDefault: true }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

type TabDef = {
  name: string;
  label: string;
  icon: MCIName;
  activeIcon?: MCIName;
  center?: boolean;
};

const TABS: TabDef[] = [
  { name: 'index', label: 'Home', icon: 'home-variant-outline', activeIcon: 'home-variant' },
  { name: 'budget', label: 'Budget', icon: 'chart-bar' },
  { name: 'log', label: 'Log', icon: 'plus', center: true },
  { name: 'goals', label: 'Goals', icon: 'bullseye-arrow' },
  { name: 'ai', label: 'AI', icon: 'robot-outline', activeIcon: 'robot' },
];

/** Custom 5-tab bar with the elevated blue "Log" action in the center. */
export function BottomTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row border-t border-hairline bg-surface pt-2"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 10 }}>
      {TABS.map((tab) => {
        const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
        const focused = state.index === routeIndex;
        const tint = focused ? colors.brand.DEFAULT : colors.ink.soft;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: state.routes[routeIndex]?.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(tab.name);
        };

        if (tab.center) {
          return (
            <Pressable key={tab.name} onPress={onPress} className="flex-1 items-center justify-center">
              <View className="h-11 w-11 items-center justify-center rounded-full bg-brand shadow-sm shadow-brand/40">
                <MaterialCommunityIcons name="plus" size={26} color="#fff" />
              </View>
              <Text className="mt-1 text-[10px] font-medium" style={{ color: tint }}>
                {tab.label}
              </Text>
            </Pressable>
          );
        }

        return (
          <Pressable key={tab.name} onPress={onPress} className="flex-1 items-center justify-center gap-1">
            <MaterialCommunityIcons name={focused ? tab.activeIcon ?? tab.icon : tab.icon} size={24} color={tint} />
            <Text className="text-[10px] font-medium" style={{ color: tint }}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
