import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../theme/provider";
import { Text } from "./text";

export type StatTrend = "up" | "down" | "flat";

export interface StatProps {
  label: string;
  value: string;
  /** Change over the comparison period, e.g. "4.2%". */
  delta?: string;
  trend?: StatTrend;
  caption?: string;
  style?: StyleProp<ViewStyle>;
}

const ARROW: Record<StatTrend, string> = { up: "↑", down: "↓", flat: "→" };

/**
 * `trend` is deliberately separate from the sign of `delta`: in a ledger,
 * spending going *up* is not good news, so the caller says which direction is
 * positive rather than the component guessing from a minus sign.
 */
export function Stat({ label, value, delta, trend = "flat", caption, style }: StatProps) {
  return (
    <View style={[styles.stat, style]}>
      <Text variant="monoLabel" tone="muted">
        {label}
      </Text>
      <Text variant="statValue">{value}</Text>
      {delta || caption ? (
        <View style={styles.footer}>
          {delta ? (
            <Text
              variant="meta"
              weight="600"
              tone={trend === "up" ? "positive" : trend === "down" ? "negative" : "muted"}
            >
              {ARROW[trend]} {delta}
            </Text>
          ) : null}
          {caption ? (
            <Text variant="meta" tone="muted">
              {caption}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

/**
 * A row of stats divided by hairlines rather than boxed into separate cards.
 *
 * The web version uses a 1px grid gap over a hairline-coloured background,
 * which RN cannot do — flex `gap` paints nothing. Dividers are drawn as
 * borders on each cell except the first instead.
 */
export function StatGroup({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const tokens = useTheme();
  const items = Array.isArray(children) ? children : [children];

  return (
    <View
      style={[
        styles.group,
        {
          backgroundColor: tokens.color.surface,
          borderColor: tokens.color.hairline,
          borderRadius: tokens.radius.lg,
        },
        style,
      ]}
    >
      {items.map((child, index) => (
        <View
          key={index}
          style={[
            styles.cell,
            index > 0 && {
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: tokens.color.hairline,
            },
          ]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    gap: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
  },
  group: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  cell: {
    padding: 18,
  },
});
