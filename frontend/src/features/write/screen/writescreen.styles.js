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

  containerMiddle: {
    height: "48%",
    width: "100%",

    alignItems: "center",
  },

  textContainer: {
    padding: 15,
    alignItems: "center",
    width: 320,
    height: "100%",
    marginTop: 40,
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
    height: 25,
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
