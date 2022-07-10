import { View, TextInput, StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";

export const InputBox = ({ placeholderText, handleWhat }) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#8b8b8b"
        placeholder={placeholderText}
        onChangeText={(What) => handleWhat(What)}
        value={null}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: theme.colors.bg.white,
    width: 260,
    height: 40,
    opacity: 0.9,
    marginTop: 10,
    borderColor: "#e4e4e4",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    zIndex: 991,
  },
  input: {
    fontSize: 13,
    left: 18,
    fontFamily: theme.fonts.body,
    zIndex: 992,
  },
});
