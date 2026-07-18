import { View, ViewProps } from 'react-native';

import { cn } from '@/lib/cn';

type Props = ViewProps & {
  /** Show the hairline border. Default true. */
  bordered?: boolean;
  className?: string;
};

/** White rounded surface used for inputs, list rows and content blocks. */
export function Card({ bordered = true, className, children, ...rest }: Props) {
  return (
    <View
      className={cn(
        'rounded-card bg-surface p-4',
        bordered && 'border border-hairline',
        className,
      )}
      {...rest}>
      {children}
    </View>
  );
}
