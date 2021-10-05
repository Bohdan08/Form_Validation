import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type InputField = {
  // left and right icones are enums with more than 200 possible values
  leftIcon: any;
  rightIcon: any;
  inputStyle: { [key: string]: string };
  containerStyle: { [key: string]: string };

  iconColor: string | undefined;
  placeholderTextColor: string | undefined;
  // placeholder?: string;
  // autoCapitalize?: string;
  // keyboardType?: string;
  // textContentType?: string;
  autoFocus?: boolean;
  // value?: string;
  handlePasswordVisibility: () => any;
};

const InputField = ({
  leftIcon,
  iconColor = "#000",
  rightIcon,
  inputStyle,
  containerStyle,
  placeholderTextColor = "#444",
  handlePasswordVisibility,
  ...rest
}: InputField & any) => (
  <View style={[styles.container, containerStyle]}>
    {leftIcon ? (
      <MaterialCommunityIcons
        name={leftIcon}
        size={20}
        color={iconColor}
        style={styles.leftIcon}
      />
    ) : null}
    <TextInput
      {...rest}
      placeholderTextColor={placeholderTextColor}
      style={[styles.input, inputStyle]}
    />
    {rightIcon ? (
      <TouchableOpacity onPress={handlePasswordVisibility}>
        <MaterialCommunityIcons
          name={rightIcon}
          size={20}
          color={iconColor}
          style={styles.rightIcon}
        />
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    flexDirection: "row",
    padding: 12,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: "100%",
    fontSize: 18,
  },
  rightIcon: {
    alignSelf: "center",
    marginLeft: 10,
  },
});

export default InputField;
