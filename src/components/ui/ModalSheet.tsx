import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/lib/cn';

type Props = {
  onClose: () => void;
  /** Where the card anchors: centered, or flush to the bottom/top edge. */
  position?: 'center' | 'bottom' | 'top';
  children: ReactNode;
  className?: string;
};

/**
 * Dark-scrim overlay used by route-based transparent modals. Tapping the
 * backdrop calls onClose; taps on the card are swallowed.
 */
export function ModalSheet({ onClose, position = 'center', children, className }: Props) {
  const insets = useSafeAreaInsets();
  const justify = position === 'bottom' ? 'justify-end' : position === 'top' ? 'justify-start' : 'justify-center';
  const edgeStyle =
    position === 'bottom'
      ? { paddingBottom: insets.bottom + 16, marginHorizontal: -20 }
      : position === 'top'
        ? { marginTop: insets.top + 8, marginHorizontal: -20 }
        : undefined;
  const shape =
    position === 'bottom' ? 'rounded-t-sheet' : position === 'top' ? 'rounded-b-sheet' : 'rounded-sheet';

  return (
    <Pressable onPress={onClose} className={cn('flex-1 bg-black/60 px-5', justify)}>
      <Pressable
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onPress={() => {}}
        style={edgeStyle}
        className={cn('bg-surface p-5', shape, className)}>
        {children}
      </Pressable>
    </Pressable>
  );
}
