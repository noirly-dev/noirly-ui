import type { ReactNode } from "react";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../theme/provider";
import { alpha } from "../theme/color";
import { Text } from "./text";

export interface ListRowProps {
  title: string;
  /** Second line under the title. */
  subtitle?: string;
  /** Right-hand value. Rendered mono and tabular, like the web `[data-numeric]`. */
  value?: string;
  valueTone?: "default" | "positive" | "negative" | "muted";
  caption?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * The React Native answer to the web `DataTable`.
 *
 * A table is the wrong primitive on a phone — columns cannot shed width, so a
 * four-column row either wraps into nonsense or scrolls sideways. The same
 * information becomes a row with a leading mark, a two-line identity on the
 * left and the figure on the right, which is what the web table degrades to at
 * its smallest breakpoint anyway.
 */
export function ListRow({
  title,
  subtitle,
  value,
  valueTone = "default",
  caption,
  leading,
  trailing,
  onPress,
  style,
}: ListRowProps) {
  const tokens = useTheme();

  const body = (
    <>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.identity}>
        <Text variant="label" weight="600" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="meta" tone="muted" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {value || caption ? (
        <View style={styles.figure}>
          {value ? (
            <Text variant="meta" tone={valueTone} weight="600" style={styles.tabular}>
              {value}
            </Text>
          ) : null}
          {caption ? (
            <Text variant="meta" tone="muted">
              {caption}
            </Text>
          ) : null}
        </View>
      ) : null}
      {trailing ? <View style={styles.leading}>{trailing}</View> : null}
    </>
  );

  if (!onPress) {
    return <View style={[styles.row, style]}>{body}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      // A press highlight rather than a scale: rows sit flush against each
      // other, and scaling one lifts it over its neighbours' hairlines.
      style={({ pressed }) => [
        styles.row,
        pressed && { backgroundColor: alpha(tokens.color.text, 0.04) },
        style,
      ]}
    >
      {body}
    </Pressable>
  );
}

/** Hairline between rows. Renders nothing before the first row. */
export function ListSeparator() {
  const tokens = useTheme();
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: tokens.color.hairline,
        marginLeft: 16,
      }}
    />
  );
}

/** Mono section label above a run of rows. */
export function ListSectionHeader({ label }: { label: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text variant="monoLabel" tone="muted">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 60,
  },
  leading: {
    alignItems: "center",
    justifyContent: "center",
  },
  identity: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  figure: {
    alignItems: "flex-end",
    gap: 2,
  },
  tabular: {
    fontVariant: ["tabular-nums"],
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
});
