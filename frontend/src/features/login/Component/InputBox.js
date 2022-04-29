import { View, TextInput, StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";

export const InputBox = ({ placeholderText, handleWhat }) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#02B5AA"
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
    width: 280,
    height: 38,
    opacity: 0.9,
    marginTop: 10,
    borderColor: theme.colors.bg.a,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    left: 50,
    fontFamily: theme.fonts.body,
  },
});
