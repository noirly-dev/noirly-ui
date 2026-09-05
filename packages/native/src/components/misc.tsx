import type { ReactNode } from "react";
import {
  Image,
  StyleSheet,
  View,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../theme/provider";
import { Text } from "./text";

/* ---------------------------------- Avatar -------------------------------- */

export interface AvatarProps {
  /** Full name. Initials come from it, and it is the accessibility label. */
  name: string;
  uri?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

/** First and last initial — "Aneesh Pissay" reads better as AP than AN. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]![0]!;
  const last = parts.length > 1 ? parts[parts.length - 1]![0]! : "";
  return (first + last).toUpperCase();
}

export function Avatar({ name, uri, size = 28, style }: AvatarProps) {
  const tokens = useTheme();
  // Typed as the intersection RN allows on both View and Image. `styles.avatar`
  // carries `overflow: "hidden"`, which ImageStyle accepts but ViewStyle types
  // more loosely (it also allows "scroll"), so the two cannot share one object.
  const shape = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: tokens.color.accentSoft,
    borderColor: tokens.color.hairline,
    borderWidth: StyleSheet.hairlineWidth,
  } as const;

  if (uri) {
    return (
      <Image
        source={{ uri }}
        accessibilityLabel={name}
        accessible
        style={[shape, { overflow: "hidden" }, style as StyleProp<ImageStyle>]}
      />
    );
  }

  return (
    <View accessible accessibilityLabel={name} style={[styles.avatar, shape, style]}>
      <Text
        variant="monoLabel"
        weight="700"
        style={{ color: tokens.color.accent, fontSize: Math.max(9, size * 0.36) }}
      >
        {initials(name)}
      </Text>
    </View>
  );
}

/* -------------------------------- Separator ------------------------------- */

export function Separator({
  orientation = "horizontal",
  style,
}: {
  orientation?: "horizontal" | "vertical";
  style?: StyleProp<ViewStyle>;
}) {
  const tokens = useTheme();
  return (
    <View
      style={[
        orientation === "horizontal"
          ? { height: StyleSheet.hairlineWidth, alignSelf: "stretch" }
          : { width: StyleSheet.hairlineWidth, alignSelf: "stretch" },
        { backgroundColor: tokens.color.hairline },
        style,
      ]}
    />
  );
}

/* -------------------------------- Eyebrow --------------------------------- */

/**
 * The web `.eyebrow` draws its leading rule with a `::before`. RN has no
 * pseudo-elements, so the rule is a real sibling view.
 */
export function Eyebrow({ children, style }: { children: string; style?: StyleProp<ViewStyle> }) {
  const tokens = useTheme();
  return (
    <View style={[styles.eyebrow, style]}>
      <View style={{ width: 22, height: 1, backgroundColor: tokens.color.hairlineStrong }} />
      <Text variant="eyebrow" tone="muted">
        {children}
      </Text>
    </View>
  );
}

/* ------------------------------- EmptyState ------------------------------- */

export interface EmptyStateProps {
  title: string;
  description?: string;
  /** A ~20pt glyph. Sits in an accent-tinted mark. */
  icon?: ReactNode;
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function EmptyState({ title, description, icon, action, style }: EmptyStateProps) {
  const tokens = useTheme();
  return (
    <View style={[styles.empty, style]}>
      {icon ? (
        <View
          style={[
            styles.emptyMark,
            {
              backgroundColor: tokens.color.accentSoft,
              borderColor: tokens.color.hairline,
              borderRadius: tokens.radius.md,
            },
          ]}
        >
          {icon}
        </View>
      ) : null}
      <Text variant="sectionTitle" style={styles.centered}>
        {title}
      </Text>
      {description ? (
        <Text variant="copy" tone="secondary" style={[styles.centered, styles.emptyCopy]}>
          {description}
        </Text>
      ) : null}
      {action ? <View style={styles.emptyAction}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  eyebrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 44,
  },
  emptyMark: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 2,
  },
  centered: {
    textAlign: "center",
  },
  emptyCopy: {
    maxWidth: 320,
  },
  emptyAction: {
    marginTop: 6,
  },
});
