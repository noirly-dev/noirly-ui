import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../theme/provider";
import { alpha } from "../theme/color";
import { Text } from "./text";

export type BadgeTone = "neutral" | "accent" | "positive" | "negative";

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  /** Leading status dot. For live state — online, syncing, overdue. */
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Status, not tags. Mirrors the web `.pill`. */
export function Badge({ label, tone = "neutral", dot = false, style }: BadgeProps) {
  const tokens = useTheme();
  const { color } = tokens;

  const fg =
    tone === "accent"
      ? color.accent
      : tone === "positive"
        ? color.positive
        : tone === "negative"
          ? color.negative
          : color.textSecondary;

  const bg = tone === "neutral" ? alpha(color.text, 0.05) : alpha(fg, 0.12);
  const border = tone === "neutral" ? color.hairline : alpha(fg, 0.3);

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: bg, borderColor: border, borderRadius: tokens.radius.xs },
        style,
      ]}
    >
      {dot ? <View style={[styles.dot, { backgroundColor: fg }]} /> : null}
      <Text variant="monoLabel" style={{ color: fg }} weight="600">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
