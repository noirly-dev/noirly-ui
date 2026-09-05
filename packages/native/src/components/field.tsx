import { useState, type ReactNode } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../theme/provider";
import { alpha } from "../theme/color";
import { Text } from "./text";

export interface InputProps extends Omit<TextInputProps, "style"> {
  leading?: ReactNode;
  trailing?: ReactNode;
  invalid?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The focus treatment sits on the wrapper, not the `TextInput`, so a field with
 * a leading icon lights up as one object — the same reason the web version
 * moved its ring onto `.field`.
 *
 * Focus is local state rather than a Reanimated value on purpose: it drives a
 * border colour, which is a paint-only change React handles fine, and keeping
 * it in JS means `onFocus`/`onBlur` stay ordinary props the caller can wrap.
 */
export function Input({
  leading,
  trailing,
  invalid = false,
  onFocus,
  onBlur,
  style,
  ...props
}: InputProps) {
  const tokens = useTheme();
  const [focused, setFocused] = useState(false);
  const { color } = tokens;

  const borderColor = invalid ? color.destructive : focused ? color.accent : color.hairline;

  return (
    <View
      style={[
        styles.field,
        {
          backgroundColor: focused ? color.surface : alpha(color.text, 0.03),
          borderColor,
          borderRadius: tokens.radius.sm,
        },
        style,
      ]}
    >
      {leading ? <View style={styles.affix}>{leading}</View> : null}
      <TextInput
        {...props}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        placeholderTextColor={color.textMuted}
        // selectionColor is the caret and the selection highlight; without it
        // both fall back to the platform blue and break the palette.
        selectionColor={color.accent}
        style={[styles.input, tokens.type.body, { color: color.text }]}
      />
      {trailing ? <View style={styles.affix}>{trailing}</View> : null}
    </View>
  );
}

export interface FormFieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
  /** Replaces the hint when present. */
  error?: string;
  required?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Label, control, one line of help.
 *
 * `error` replaces `hint` rather than stacking under it — two help lines under
 * one input shift every field below it the moment validation fires.
 */
export function FormField({
  label,
  children,
  hint,
  error,
  required = false,
  style,
}: FormFieldProps) {
  const help = error ?? hint;
  return (
    <View style={[styles.formField, style]}>
      <Text variant="monoLabel" tone="muted">
        {label}
        {required ? " *" : ""}
      </Text>
      {children}
      {help ? (
        <Text variant="meta" tone={error ? "destructive" : "muted"}>
          {help}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    // RN adds vertical padding on Android by default, which makes the field
    // taller than minHeight and misaligns the affixes.
    paddingVertical: 0,
  },
  affix: {
    alignItems: "center",
    justifyContent: "center",
  },
  formField: {
    gap: 6,
  },
});
