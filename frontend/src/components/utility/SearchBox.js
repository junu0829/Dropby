import React from "react";
import icon_search from "../../../assets/Global/icon_search";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { SvgXml } from "react-native-svg";
import { theme } from "../../infrastructure/theme";

export const SearchBox = ({ setSearchfield, searchBoxHint }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <TextInput
          placeholder={searchBoxHint}
          onChangeText={(text) => {
            setSearchfield(text);
          }}
          backgroundColor={theme.colors.bg.secondary}
          style={styles.searchBox}
        ></TextInput>
        <View style={styles.searchIcon}>
          <SvgXml xml={icon_search} width={17.5} height={18.5}></SvgXml>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    position: "absolute",
    zIndex: 999,
    top: 12,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  searchBox: {
    zIndex: 995,
    fontSize: 14,
    fontFamily: theme.fonts.body,
    width: 320,

    backgroundColor: "#ffffff",
    height: 43,
    borderRadius: 50,
    paddingLeft: 12,

    ...Platform.select({
      ios: {
        shadowColor: "rgba(50, 50, 50,0.5)",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
