import { useCallback, type ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../theme/provider";
import { Text } from "./text";

export interface SwipeRowProps {
  children: ReactNode;
  /** Label on the revealed action. Keep it to one word. */
  actionLabel?: string;
  onAction: () => void;
  destructive?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ACTION_WIDTH = 96;
/** Past this the row snaps open on release rather than springing back. */
const OPEN_THRESHOLD = ACTION_WIDTH * 0.5;
const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/**
 * Swipe-to-reveal for a list row.
 *
 * `activeOffsetX` is the important part: without it the pan claims the gesture
 * the instant a finger moves, and a vertical flick through a long list gets
 * eaten by whichever row happened to be under the thumb. Requiring ~12pt of
 * *horizontal* travel before activating lets the parent ScrollView win the
 * vertical case, which is what makes the list still feel like a list.
 *
 * Everything runs on the UI thread — the gesture writes a shared value and the
 * row reads it — so it keeps up even while the list is fetching. `runOnJS` is
 * used once, to hand the confirmed action back to React.
 */
export function SwipeRow({
  children,
  actionLabel = "Delete",
  onAction,
  destructive = true,
  style,
}: SwipeRowProps) {
  const tokens = useTheme();
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const fire = useCallback(() => {
    onAction();
  }, [onAction]);

  const pan = Gesture.Pan()
    .activeOffsetX([-12, 12])
    // Never claim a vertical drag; that belongs to the list.
    .failOffsetY([-8, 8])
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      const next = startX.value + event.translationX;
      // Left only, and never further than the action it reveals.
      translateX.value = Math.min(0, Math.max(-ACTION_WIDTH, next));
    })
    .onEnd(() => {
      const shouldOpen = translateX.value < -OPEN_THRESHOLD;
      translateX.value = withTiming(shouldOpen ? -ACTION_WIDTH : 0, {
        duration: 280,
        easing: EASE,
      });
    });

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }), [translateX]);

  const close = () => {
    translateX.value = withTiming(0, { duration: 200, easing: EASE });
  };

  const actionStyle = useAnimatedStyle(() => ({
    // Fades in with the drag so a half-open row does not show a solid slab.
    opacity: Math.min(1, Math.abs(translateX.value) / OPEN_THRESHOLD),
  }), [translateX]);

  return (
    <View style={[styles.wrap, style]}>
      <Animated.View
        style={[
          styles.action,
          {
            width: ACTION_WIDTH,
            backgroundColor: destructive ? tokens.color.destructive : tokens.color.accent,
          },
          actionStyle,
        ]}
      >
        <Text
          variant="button"
          uppercase
          weight="600"
          onPress={() => {
            close();
            fire();
          }}
          style={{ color: destructive ? tokens.color.bg : tokens.color.accentInk }}
        >
          {actionLabel}
        </Text>
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View style={[{ backgroundColor: tokens.color.bg }, rowStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    overflow: "hidden",
  },
  action: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
