import { ReactNode } from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/lib/cn';

type Props = ViewProps & {
  children: ReactNode;
  /** Wrap content in a ScrollView. */
  scroll?: boolean;
  /** Apply the standard 20px horizontal gutter. Default true. */
  padded?: boolean;
  /** Respect the top safe-area inset. Default true. */
  topInset?: boolean;
  className?: string;
  contentClassName?: string;
  /** Pinned footer that sits above the safe area (e.g. a primary button). */
  footer?: ReactNode;
};

/**
 * Standard screen frame: white background, safe-area aware, optional scroll and
 * a pinned footer. Screens compose this instead of repeating SafeArea plumbing.
 */
export function Screen({
  children,
  scroll = false,
  padded = true,
  topInset = true,
  className,
  contentClassName,
  footer,
  ...rest
}: Props) {
  const insets = useSafeAreaInsets();
  const gutter = padded ? 'px-5' : '';

  const body = scroll ? (
    <ScrollView
      className={cn('flex-1', className)}
      contentContainerClassName={cn(gutter, contentClassName)}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View className={cn('flex-1', gutter, className)}>{children}</View>
  );

  return (
    <View
      className="flex-1 bg-surface"
      style={{ paddingTop: topInset ? insets.top : 0 }}
      {...rest}>
      {body}
      {footer ? (
        <View
          className="border-t border-hairline bg-surface px-5 pt-3"
          style={{ paddingBottom: insets.bottom + 12 }}>
          {footer}
        </View>
      ) : null}
    </View>
  );
}
