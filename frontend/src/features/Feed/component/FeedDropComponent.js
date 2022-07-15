import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ImageBackground,
} from "react-native";

import { SvgXml } from "react-native-svg";
import dropIcon from "../../../../assets/dropIcon";
import CommentIcon from "../../../../assets/CommentIcon";
import HeartIcon from "../../../../assets/HeartIcon";
import pictureIcon from "../../../../assets/pictureIcon";

import { theme } from "../../../infrastructure/theme";
import dropBg from "../../../../assets/images/dropPng/drawable-xxxhdpi/pin.png";
import ico_heart from "../../../../assets/images/dropPng/ico_heart";
import ico_speech from "../../../../assets/images/dropPng/ico_speech";
import ico_photo from "../../../../assets/images/dropPng/ico_photo";
import { elapsedTime } from "../../../infrastructure/elapsedTime";

export const FeedDropComponent = ({ navigation, feedDrop, place = {} }) => {
  //touchable 되게 만들고 눌렀을 때 드롭 디테일 페이지로 넘기기.
  const onPress = () => {
    navigation.navigate("DetailScreen", { place, feedDrop });
  };

  const Drop = ({ feedDrop, textColor }) => (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{ alignItems: "center", flex: 1 }}
    >
      <View style={styles.dropBox}>
        <View style={styles.SymbolContainer}>
          <ImageBackground source={dropBg} style={styles.dropemoji}>
            <Text style={styles.emoji}>{feedDrop.emoji.icon}</Text>
          </ImageBackground>
        </View>
        <View style={styles.dropContentContainer}>
          <View style={styles.dropTitleContainer}>
            <View style={styles.dropTitleContainer2}>
              <Text style={styles.placeTitle}>{feedDrop.Place.name}</Text>
              <Text style={styles.dropTitle}>{feedDrop.title}</Text>
            </View>
            <View style={styles.DropTimeContainer}>
              <Text style={styles.dropTime}>
                {elapsedTime(feedDrop.createdAt)}
              </Text>
            </View>
          </View>
          <View style={styles.dropContentContainer}>
            <Text style={styles.dropContent}>{feedDrop.content}</Text>
            <View style={styles.dropLike}>
              <SvgXml xml={ico_heart} width={15} height={15}></SvgXml>
              <Text style={styles.dropLikeNum}>12</Text>
              <SvgXml xml={ico_speech} width={15} height={15}></SvgXml>
              <Text style={styles.dropLikeNum}>5</Text>
              <SvgXml xml={ico_photo} width={15} height={15}></SvgXml>
              <Text style={styles.dropLikeNum}>1</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#EEEEEE",
          borderBottomWidth: 1,
          width: "90%",
        }}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <Drop feedDrop={feedDrop}></Drop>
    </>
  );
};

const styles = StyleSheet.create({
  dropBox: {
    marginTop: 15,
    marginBottom: 15,
    width: "95%",
    flex: 1,

    backgroundColor: "#ffffff",
    borderRadius: 30,

    flexDirection: "row",
    alignItems: "center",

    zIndex: 999,
  },
  SymbolContainer: {
    flex: 1.5,
    height: "60%",
    backgroundColor: "#ffffff",

    alignItems: "center",
  },
  dropemoji: {
    width: 32,
    height: 44,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  // emoji: {},
  dropContentContainer: {
    flex: 10,
  },
  dropTitleContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  placeTitle: {
    fontSize: 13,
    fontFamily: theme.fonts.bold,
    marginTop: 10,

    color: "#996afc",
  },
  dropTitle: {
    fontSize: 19,
    fontFamily: theme.fonts.bold,
    marginTop: 10,

    color: "#2e2e2e",
    width: 200,
  },

  dropTitleContainer2: { flex: 7 },
  // eslint-disable-next-line no-dupe-keys
  dropContentContainer: { flex: 6 },
  dropContent: {
    fontSize: 15,
    fontFamily: theme.fonts.body,
    marginTop: 10,
    marginLeft: 2,
    color: "#6b6b6b",
    width: 200,
  },
  DropTimeContainer: {
    flex: 4.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 30,
    marginTop: 10,

    alignItems: "center",
  },

  dropTime: {
    fontSize: 11,
    color: "#6b6b6b",
  },

  searchIcon: {
    width: 50,
    position: "absolute",
    zIndex: 999,
    right: 0,
    top: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    fontFamily: theme.fonts.bold,
  },
  placeListBox: {
    width: "100%",
    marginTop: 10,
    height: 90,
    marginLeft: "20%",
  },
  FeedButton: {
    width: 120,
    height: 30,
    backgroundColor: "rgba(153,	106,252, 0.8)",
    borderRadius: 50,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  FeedButtonContainer: {
    width: "80%",
    bottom: 40,
  },
  buttonText: {
    fontSize: 11,
    fontFamily: theme.fonts.bold,
    color: "#ffffff",
  },
  dropLike: {
    flexDirection: "row",
    marginTop: 21,
  },
  dropLikeNum: {
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    color: "#2E2E2E",
    marginTop: -1,
    marginLeft: 5,
    marginRight: 20,
  },
});
