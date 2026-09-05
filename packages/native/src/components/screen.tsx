import type { ReactNode } from "react";
import { ScrollView, StatusBar, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/provider";
import { Eyebrow } from "./misc";
import { Text } from "./text";

export interface ScreenProps {
  children: ReactNode;
  /** Wraps the content in a ScrollView. Off for a screen that owns its own list. */
  scroll?: boolean;
  /** Applies the bottom safe-area inset. Off when a tab bar already covers it. */
  edgeToEdgeBottom?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Page container.
 *
 * Insets are applied as padding rather than by wrapping in `SafeAreaView`, so a
 * background or a header can still run to the physical edge while the text
 * inside it stays clear of the notch.
 *
 * `scroll` is opt-in: a screen whose body is a FlatList must not be inside a
 * ScrollView — nesting the two breaks virtualisation and RN warns about it — so
 * the default renders a plain View.
 */
export function Screen({
  children,
  scroll = false,
  edgeToEdgeBottom = false,
  style,
  contentStyle,
}: ScreenProps) {
  const tokens = useTheme();
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: insets.top,
    paddingBottom: edgeToEdgeBottom ? 0 : insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
      // Lets a tap outside a focused field dismiss the keyboard without
      // swallowing the first tap on a button inside the scroll view.
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, contentStyle]}>{children}</View>
  );

  return (
    <View style={[styles.flex, { backgroundColor: tokens.color.bg }, padding, style]}>
      <StatusBar
        barStyle={tokens.scheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      {body}
    </View>
  );
}

export interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  lead?: string;
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Eyebrow, display title, one line of lead, then a hairline — the same shape as
 * the web `PageHeader`. The rule is what makes the band read as a header
 * without boxing the title inside a card.
 */
export function PageHeader({ title, eyebrow, lead, action, style }: PageHeaderProps) {
  const tokens = useTheme();
  return (
    <View style={[styles.header, style]}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Text variant="pageTitle" style={eyebrow ? styles.titleSpaced : undefined}>
            {title}
          </Text>
          {lead ? (
            <Text variant="copy" tone="secondary" style={styles.lead}>
              {lead}
            </Text>
          ) : null}
        </View>
        {action ? <View>{action}</View> : null}
      </View>
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: tokens.color.hairline }} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    gap: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  titleSpaced: {
    marginTop: 10,
  },
  lead: {
    marginTop: 6,
  },
});
