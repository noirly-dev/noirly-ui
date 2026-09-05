import { useEffect } from "react";
import { StyleSheet, View, type DimensionValue, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "../theme/provider";
import { alpha } from "../theme/color";

export interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A sweep, not a pulse.
 *
 * A pulsing opacity keeps dragging the eye back to the placeholder while the
 * reader is trying to look at whatever has already loaded; one pass of light
 * reads as progress and then leaves.
 *
 * The animation is cancelled on unmount. A `withRepeat(-1)` left running keeps
 * the shared value alive and, on a list that mounts and drops rows quickly,
 * quietly accumulates timers.
 */
export function Skeleton({ width = "100%", height = 14, radius, style }: SkeletonProps) {
  const tokens = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.bezier(0.83, 0, 0.17, 1) }),
      -1,
      false,
    );
    return () => cancelAnimation(progress);
  }, [progress]);

  const sweep = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [-1, 1]) * 220 }],
    opacity: interpolate(progress.value, [0, 0.5, 1], [0, 1, 0]),
  }), [progress]);

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius ?? tokens.radius.sm,
          backgroundColor: alpha(tokens.color.text, 0.06),
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: alpha(tokens.color.text, 0.07) },
          sweep,
        ]}
      />
    </View>
  );
}

/** Placeholder for a run of prose. The last line is short, as real text is. */
export function SkeletonText({ lines = 3, style }: { lines?: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ gap: 8 }, style]}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} height={12} width={i === lines - 1 ? "40%" : "100%"} />
      ))}
    </View>
  );
}
