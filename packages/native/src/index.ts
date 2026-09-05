/**
 * @noirly-dev/ui-native
 *
 * The Noirly design system for React Native. Reads the same seven palettes as
 * the web package from `@noirly-dev/ui/themes` and renders them as StyleSheet
 * tokens, so a palette edit lands on web and mobile together.
 */

export {
  NoirlyThemeProvider,
  useTheme,
  tokensFor,
  navigationTheme,
  navigationScreenOptions,
  radius,
  space,
  duration,
  font,
  alpha,
  mix,
  contrastRatio,
  luminance,
  NOIRLY_THEMES,
  DEFAULT_THEME_ID,
  type NoirlyThemeProviderProps,
  type NoirlyTokens,
  type NoirlyColors,
  type ColorScheme,
  type Elevation,
  type NavigationTheme,
  type ThemeDefinition,
  type ThemePalette,
} from "./theme/index";

export { Text, type TextProps, type TextVariant, type TextTone } from "./components/text";
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from "./components/button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardVariant,
} from "./components/card";
export { Badge, type BadgeProps, type BadgeTone } from "./components/badge";
export {
  Input,
  FormField,
  type InputProps,
  type FormFieldProps,
} from "./components/field";
export { Skeleton, SkeletonText, type SkeletonProps } from "./components/skeleton";
export { Stat, StatGroup, type StatProps, type StatTrend } from "./components/stat";
export {
  ListRow,
  ListSeparator,
  ListSectionHeader,
  type ListRowProps,
} from "./components/list";
export {
  Avatar,
  Separator,
  Eyebrow,
  EmptyState,
  type AvatarProps,
  type EmptyStateProps,
} from "./components/misc";
export { Tabs, type TabsProps, type TabItem } from "./components/tabs";
export { SwipeRow, type SwipeRowProps } from "./components/swipe-row";
export {
  Screen,
  PageHeader,
  type ScreenProps,
  type PageHeaderProps,
} from "./components/screen";
