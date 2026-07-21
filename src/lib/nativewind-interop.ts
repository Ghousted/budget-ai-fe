import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * NativeWind 4 only applies `className` to components it has registered; third-party
 * components are ignored unless mapped here. LinearGradient is used with layout
 * classes (rounding, padding, absolute positioning) across several screens, so route
 * its `className` through to the `style` prop.
 *
 * Import this module once, early (see the root _layout), so the registration runs
 * before any screen renders.
 */
cssInterop(LinearGradient, { className: 'style' });
