import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../theme/provider";
import { Text } from "./text";

export type CardVariant = "default" | "flat" | "raised";

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * The panel.
 *
 * The web `.surface` draws its edge as an *inset* box-shadow so the hairline
 * sits inside the radius. React Native has no inset shadow, so the edge is a
 * real 1px border here — which is also why `variant` never combines a border
 * with a heavy shadow the way the broken web version did: on Android the
 * `elevation` shadow is drawn outside the border and the two read as a double
 * edge at anything above e1.
 */
export function Card({ children, variant = "default", style }: CardProps) {
  const tokens = useTheme();
  const { color } = tokens;

  const shadow =
    variant === "raised" ? tokens.elevation.e2 : variant === "flat" ? null : tokens.elevation.e1;

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: variant === "flat" ? color.surface : color.surface,
          borderColor: variant === "raised" ? color.hairlineStrong : color.hairline,
          borderRadius: tokens.radius.lg,
        },
        shadow,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <Text variant="sectionTitle">{children}</Text>;
}

export function CardDescription({ children }: { children: ReactNode }) {
  return (
    <Text variant="copy" tone="secondary">
      {children}
    </Text>
  );
}

export function CardContent({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.content, style]}>{children}</View>;
}

/** Actions row, separated by a hairline rather than boxed off. */
export function CardFooter({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const tokens = useTheme();
  return (
    <View
      style={[
        styles.footer,
        { borderTopColor: tokens.color.hairline, borderTopWidth: StyleSheet.hairlineWidth },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    gap: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
