import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";

type ButtonType = {
  title: string;
  backgroundColor: string | undefined;
  titleColor: string | undefined;
  titleSize: number | undefined;
  width?: string | undefined;
  containerStyle: { [key: string]: string | number };
  onPress: () => any;
};

const Button = ({
  title,
  backgroundColor = "#000",
  titleColor = "#fff",
  titleSize = 14,
  onPress,
  width = "100%",
  containerStyle,
}: ButtonType) => (
  <Pressable
    onPress={onPress}
    style={(args) => {
      if (args.pressed) {
        return [
          styles.base,
          {
            opacity: 0.5,
            backgroundColor,
            width,
          },
          containerStyle,
        ];
      }

      return [
        styles.base,
        {
          opacity: 1,
          backgroundColor,
          width,
        },
        containerStyle,
      ];
    }}
  >
    <Text style={[styles.text, { color: titleColor, fontSize: titleSize }]}>
      {title}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
  },
  base: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
    paddingHorizontal: 12,
  },
});

export default Button;
