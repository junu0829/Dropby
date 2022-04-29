import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../../../infrastructure/theme";

// value: 버튼 이름
// onPress: 버튼 눌렀을 때 함수
// width, height: 버튼의 크기
// style prop을 통해 margin등의 스타일링 가능

export const LoginButton = ({ value, onPress, width, height, style }) => {
  // console.log(style);
  return (
    <TouchableOpacity
      // pressed 상태에 따라 스타일 바꾸기
      style={[
        styles.button,
        { width: width, height: height, borderRadius: height / 2 },
        style,
      ]}
      onPress={() => onPress()}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },

  buttonText: {
    color: "white",
    fontSize: theme.fontSizes.button,
    fontWeight: "900",
  },
});
