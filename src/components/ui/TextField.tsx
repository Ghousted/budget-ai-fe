import { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { cn } from '@/lib/cn';
import { colors } from '@/theme/tokens';

type Props = TextInputProps & {
  label?: string;
  helper?: string;
  error?: string;
  /** Leading node rendered inside the field (e.g. a ₱ glyph). */
  prefix?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
};

/**
 * Labeled text field. Fill is light-gray, fully rounded, borderless — matching
 * the auth/log inputs in the design. Labels use a teal-green tint.
 */
export const TextField = forwardRef<TextInput, Props>(function TextField(
  { label, helper, error, prefix, containerClassName, inputClassName, ...rest },
  ref,
) {
  return (
    <View className={cn('w-full', containerClassName)}>
      {label ? (
        <Text className="mb-1.5 text-[13px] font-medium text-emerald-700">{label}</Text>
      ) : null}
      <View
        className={cn(
          'w-full flex-row items-center rounded-field bg-track px-4',
          error && 'border border-expense',
        )}>
        {prefix}
        <TextInput
          ref={ref}
          className={cn('flex-1 py-3.5 text-base text-ink', inputClassName)}
          placeholderTextColor={colors.ink.faint}
          {...rest}
        />
      </View>
      {error ? (
        <Text className="mt-1 text-[11px] text-expense">{error}</Text>
      ) : helper ? (
        <Text className="mt-1 text-[11px] text-ink-faint">{helper}</Text>
      ) : null}
    </View>
  );
});
