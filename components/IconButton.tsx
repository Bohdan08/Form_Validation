import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type IconButtonType = {
  color: string;
  size: number | undefined;
  name:
    | "form"
    | "link"
    | "picture"
    | "table"
    | "filter"
    | "key"
    | "stepforward"
    | "stepbackward"
    | "forward"
    | "banckward"
    | "caretright"
    | "caretleft"
    | "caretdown"
    | "caretup"
    | "logout"
    | "rightcircle";
  onPress: () => any;
};

const IconButton = ({ color, size, onPress, name }: IconButtonType) => (
  <Pressable
    style={(args) => {
      if (args.pressed) {
        return [
          styles.base,
          {
            opacity: 0.5,
            backgroundColor: "blue",
          },
        ];
      }

      return [styles.base, { opacity: 1, backgroundColor: "blue" }];
    }}
    onPress={onPress}
  >
    <AntDesign name={name} size={size} color={color} />
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IconButton;
