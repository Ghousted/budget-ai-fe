import { ActivityIndicator, Pressable, PressableProps, Text, View } from 'react-native';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size = 'md' | 'lg';

type Props = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  /** Optional leading element (e.g. an icon or the Google mark). */
  leading?: React.ReactNode;
  className?: string;
  textClassName?: string;
};

const containerByVariant: Record<Variant, string> = {
  primary: 'bg-brand active:bg-brand-600',
  secondary: 'bg-track border border-hairline active:bg-hairline',
  ghost: 'bg-transparent active:bg-track',
  destructive: 'bg-expense active:opacity-90',
};

const textByVariant: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-ink-soft',
  ghost: 'text-brand',
  destructive: 'text-white',
};

const sizeContainer: Record<Size, string> = {
  md: 'h-12 rounded-field px-4',
  lg: 'h-[54px] rounded-field px-5',
};

export function Button({
  label,
  variant = 'primary',
  size = 'lg',
  loading = false,
  leading,
  disabled,
  className,
  textClassName,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      disabled={isDisabled}
      className={cn(
        'w-full flex-row items-center justify-center',
        sizeContainer[size],
        containerByVariant[variant],
        isDisabled && 'opacity-50',
        className,
      )}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'destructive' ? '#fff' : '#2563EB'} />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {leading}
          <Text className={cn('text-base font-semibold', textByVariant[variant], textClassName)}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
