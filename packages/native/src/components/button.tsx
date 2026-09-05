import { useCallback, type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "../theme/provider";
import { Text } from "./text";

export type ButtonVariant = "solid" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "style" | "children"> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Rendered before the label. Size it yourself; 16pt suits `md`. */
  icon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

const HEIGHT: Record<ButtonSize, number> = { sm: 34, md: 46, lg: 52 };
const PADDING: Record<ButtonSize, number> = { sm: 14, md: 22, lg: 26 };

/** Expo's ease-out-expo, matching `--ease-out-expo` on the web. */
const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * The press feedback runs on the UI thread through Reanimated rather than on
 * `Pressable`'s `pressed` state. State-driven scaling re-renders the tree on
 * every touch and lands a frame or two late on a busy list; a shared value
 * animates entirely off the JS thread, so it stays honest while the list is
 * still fetching.
 */
export function Button({
  label,
  variant = "solid",
  size = "md",
  icon,
  loading = false,
  fullWidth = false,
  disabled,
  onPressIn,
  onPressOut,
  style,
  ...props
}: ButtonProps) {
  const tokens = useTheme();
  const pressed = useSharedValue(0);
  const isDisabled = disabled || loading;

  const handlePressIn = useCallback<NonNullable<PressableProps["onPressIn"]>>(
    (event) => {
      pressed.value = withTiming(1, { duration: tokens.duration.fast, easing: EASE });
      onPressIn?.(event);
    },
    [onPressIn, pressed, tokens.duration.fast],
  );

  const handlePressOut = useCallback<NonNullable<PressableProps["onPressOut"]>>(
    (event) => {
      pressed.value = withTiming(0, { duration: tokens.duration.base, easing: EASE });
      onPressOut?.(event);
    },
    [onPressOut, pressed, tokens.duration.base],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - pressed.value * 0.03 }],
  }), [pressed]);

  const { color } = tokens;
  const surface: ViewStyle =
    variant === "solid"
      ? { backgroundColor: color.text }
      : variant === "destructive"
        ? { backgroundColor: "transparent", borderWidth: 1, borderColor: color.destructive }
        : { backgroundColor: "transparent", borderWidth: 1, borderColor: color.hairlineStrong };

  const labelTone =
    variant === "solid" ? "inverse" : variant === "destructive" ? "destructive" : "default";

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(isDisabled), busy: loading }}
      disabled={isDisabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.base,
        surface,
        {
          height: HEIGHT[size],
          paddingHorizontal: PADDING[size],
          borderRadius: tokens.radius.pill,
          opacity: isDisabled ? 0.5 : 1,
        },
        fullWidth && styles.fullWidth,
        animatedStyle,
        style,
      ]}
      {...props}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text
        variant="button"
        tone={labelTone}
        uppercase
        weight="600"
        // `solid` paints the label in accent-ink over --text, which is the same
        // pairing the palette already contrast-checked for buttons.
        style={variant === "solid" ? { color: color.bg } : undefined}
      >
        {loading ? "…" : label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
