import { Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { categoryPalette } from '@/theme/tokens';

type Props = {
  value: string;
  onChange: (color: string) => void;
};

/** Row of the 8 category swatches; the selected one shows a white check. */
export function ColorPicker({ value, onChange }: Props) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {categoryPalette.map((color) => {
        const active = color === value;
        return (
          <Pressable
            key={color}
            onPress={() => onChange(color)}
            className="h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: color }}>
            {active ? <MaterialCommunityIcons name="check" size={18} color="#fff" /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}
