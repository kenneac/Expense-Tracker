import { Text, type TextProps, StyleSheet, useColorScheme } from "react-native";

import { COLORS } from "@/constants/colors";

type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "link" | "subtitle" | "error";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...otherProps
}: ThemedTextProps) {
  const colorScheme = useColorScheme();

  const color =
    colorScheme === "dark"
      ? darkColor ?? COLORS.text
      : lightColor ?? COLORS.text;

  return (
    <Text
      style={[
        { color },
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        type === "error" && styles.error,
        style,
      ]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  error: {
    color: COLORS.expense,
    fontWeight: "500",
  },
});