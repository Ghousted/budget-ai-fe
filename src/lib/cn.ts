/** Tiny classname joiner (clsx-lite) for composing NativeWind class strings. */
export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
