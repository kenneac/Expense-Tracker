import React from "react";
import {
  View,
  type ViewProps,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { COLORS } from "@/constants/colors";

type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const colorScheme = useColorScheme();

  const backgroundColor =
    colorScheme === "dark"
      ? darkColor ?? COLORS.background
      : lightColor ?? COLORS.background;

  return (
    <View
      style={[{ backgroundColor }, styles.container, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});