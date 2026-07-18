import { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '@/theme/tokens';

type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const ICONS: MCIName[] = [
  'silverware-fork-knife', 'car', 'flash', 'medical-bag', 'movie-open', 'home-variant', 'camera',
  'shopping', 'airplane', 'book-open-variant', 'dumbbell', 'controller-classic', 'paw', 'bookmark',
];

type Props = {
  value: MCIName;
  onChange: (icon: MCIName) => void;
  /** Selected tint. */
  color: string;
};

export function IconPicker({ value, onChange, color }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {ICONS.map((icon) => {
        const active = icon === value;
        return (
          <Pressable
            key={icon}
            onPress={() => onChange(icon)}
            className="h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              borderColor: active ? color : colors.hairline,
              backgroundColor: active ? color + '22' : '#fff',
            }}>
            <MaterialCommunityIcons name={icon} size={20} color={active ? color : colors.ink.soft} />
          </Pressable>
        );
      })}
    </View>
  );
}

export { ICONS };
