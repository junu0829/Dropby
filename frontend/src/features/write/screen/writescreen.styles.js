import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";
const utils = StyleSheet.create({
  ////////////////////////
  margin15: {
    margin: 15,
  },

  /////////////////////
  backgroundWhite: {
    backgroundColor: "white",
  },

  borderTopGray: {
    borderTopWidth: 1,
    borderColor: "lightgrey",
  },
  borderWhite: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: "white",
  },
  ////////////
});

const styles = StyleSheet.create({
  containerTop: {
    alignItems: "center",
    marginTop: 20,
  },

  textContainer: {
    padding: 15,
    alignItems: "center",
    width: 320,
    height: "48%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#e4e4e4",
    borderRadius: 20,
  },

  enter: {
    width: 300,
    fontSize: 20,
    fontWeight: "500",
    color: "#9A9A9A",
    textAlign: "center",
    flexShrink: 1,
  },

  enter2: {
    width: 300,
    fontSize: 15,
    fontWeight: "500",
    color: "#9A9A9A",
    textAlign: "center",
    flexShrink: 1,
  },

  containerLow: {
    backgroundColor: theme.colors.bg.secondary,
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addPicture: {
    marginRight: 70,
  },
  LockButtonUnlocked: {
    marginLeft: 70,
  },
});
export { styles, utils };
