import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from "react-native";
import { useTheme } from "../theme/provider";
import type { NoirlyTokens } from "../theme/tokens";

export type TextVariant =
  | "displayXl"
  | "displayLg"
  | "pageTitle"
  | "sectionTitle"
  | "statValue"
  | "lede"
  | "body"
  | "copy"
  | "label"
  | "eyebrow"
  | "meta"
  | "monoLabel"
  | "button";

export type TextTone =
  | "default"
  | "secondary"
  | "muted"
  | "accent"
  | "positive"
  | "negative"
  | "destructive"
  | "inverse";

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  tone?: TextTone;
  /** Uppercases eyebrow-style labels without the caller restating it. */
  uppercase?: boolean;
  weight?: TextStyle["fontWeight"];
}

function toneColor(tone: TextTone, tokens: NoirlyTokens): string {
  const { color } = tokens;
  switch (tone) {
    case "secondary":
      return color.textSecondary;
    case "muted":
      return color.textMuted;
    case "accent":
      return color.accent;
    case "positive":
      return color.positive;
    case "negative":
      return color.negative;
    case "destructive":
      return color.destructive;
    case "inverse":
      return color.accentInk;
    default:
      return color.text;
  }
}

/** Variants that are uppercase by definition in this system. */
const ALWAYS_UPPER: ReadonlySet<TextVariant> = new Set(["eyebrow", "monoLabel"]);

/**
 * Every piece of text in the system.
 *
 * Variants map one-to-one onto the web type scale (`.display-lg`, `.lede`,
 * `.meta`, `.eyebrow`, …) so a screen reads the same in both codebases. The
 * `style` prop still wins, since it is applied last.
 */
export function Text({
  variant = "body",
  tone = "default",
  uppercase,
  weight,
  style,
  ...props
}: TextProps) {
  const tokens = useTheme();
  const base = tokens.type[variant];
  const upper = uppercase ?? ALWAYS_UPPER.has(variant);

  return (
    <RNText
      {...props}
      style={[
        base,
        { color: toneColor(tone, tokens) },
        upper && { textTransform: "uppercase" as const },
        weight ? { fontWeight: weight } : null,
        style,
      ]}
    />
  );
}
