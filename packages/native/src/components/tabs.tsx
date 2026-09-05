import { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../theme/provider";
import { Text } from "./text";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onSelect: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

interface Measurement {
  x: number;
  width: number;
}

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

/**
 * Underlined tabs, not a segmented control — the same call the web layer made.
 * A filled segmented control competes with the primary button for attention.
 *
 * The marker is one absolutely-positioned view driven by Reanimated rather than
 * a border on each tab, so switching tabs slides instead of cutting, and the
 * animation never touches layout. Positions come from each tab's `onLayout`,
 * which is the only way to know the widths of text that has not been measured
 * yet.
 */
export function Tabs({ items, activeId, onSelect, style }: TabsProps) {
  const tokens = useTheme();
  const [layouts, setLayouts] = useState<Record<string, Measurement>>({});
  const markerX = useSharedValue(0);
  const markerWidth = useSharedValue(0);

  const measure = useCallback(
    (id: string) => (event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setLayouts((prev) => {
        const previous = prev[id];
        if (previous && previous.x === x && previous.width === width) return prev;
        const next = { ...prev, [id]: { x, width } };

        if (id === activeId) {
          // First measurement of the active tab: place the marker without
          // animating, or it slides in from the left edge on mount.
          const settled = markerWidth.value !== 0;
          markerX.value = settled ? withTiming(x, { duration: 280, easing: EASE }) : x;
          markerWidth.value = settled
            ? withTiming(width, { duration: 280, easing: EASE })
            : width;
        }
        return next;
      });
    },
    [activeId, markerWidth, markerX],
  );

  const select = useCallback(
    (id: string) => {
      const target = layouts[id];
      if (target) {
        markerX.value = withTiming(target.x, { duration: 280, easing: EASE });
        markerWidth.value = withTiming(target.width, { duration: 280, easing: EASE });
      }
      onSelect(id);
    },
    [layouts, markerWidth, markerX, onSelect],
  );

  const markerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: markerX.value }],
    width: markerWidth.value,
  }), [markerX, markerWidth]);

  return (
    <View style={[{ borderBottomColor: tokens.color.hairline }, styles.wrap, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <Pressable
                key={item.id}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                onLayout={measure(item.id)}
                onPress={() => select(item.id)}
                style={styles.tab}
              >
                <Text variant="label" tone={active ? "default" : "muted"} weight="500">
                  {item.label}
                  {typeof item.count === "number" ? `  ${item.count}` : ""}
                </Text>
              </Pressable>
            );
          })}
          <Animated.View
            pointerEvents="none"
            style={[styles.marker, { backgroundColor: tokens.color.accent }, markerStyle]}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    position: "relative",
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  marker: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 2,
    borderRadius: 1,
  },
});
