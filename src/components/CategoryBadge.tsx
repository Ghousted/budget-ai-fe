import { ComponentProps } from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type Props = {
  icon: MCIName;
  color: string;
  size?: number;
  /** 'soft' = tinted circle + colored icon; 'solid' = filled circle + white icon. */
  variant?: 'soft' | 'solid';
};

/** Rounded category glyph. Adds ~22% alpha to the color for the soft tint. */
export function CategoryBadge({ icon, color, size = 40, variant = 'soft' }: Props) {
  const iconSize = Math.round(size * 0.5);
  const soft = variant === 'soft';
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: soft ? color + '22' : color,
      }}>
      <MaterialCommunityIcons name={icon} size={iconSize} color={soft ? color : '#fff'} />
    </View>
  );
}
