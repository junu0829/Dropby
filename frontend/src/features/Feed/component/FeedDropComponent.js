import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SvgXml } from "react-native-svg";
import dropIcon from "../../../../assets/dropIcon";
import CommentIcon from "../../../../assets/CommentIcon";
import HeartIcon from "../../../../assets/HeartIcon";
import pictureIcon from "../../../../assets/pictureIcon";

import { theme } from "../../../infrastructure/theme";

export const FeedDropComponent = ({ navigation, feedDrop, place = {} }) => {
  //touchable 되게 만들고 눌렀을 때 드롭 디테일 페이지로 넘기기.
  const onPress = () => {
    navigation.navigate("DetailScreen", { place, feedDrop });
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.dropContainer}>
          <View style={styles.dropIconContainer}>
            <SvgXml xml={dropIcon} width={30} height={30} />
          </View>

          <View style={styles.dropMainContainer}>
            <Text style={styles.dropTitle}>{feedDrop.content}</Text>
            <Text style={styles.content}>{feedDrop.content}</Text>
          </View>
          <View style={styles.dropInfoContainer}>
            <Text style={styles.createdAt}>{feedDrop.createdAt}</Text>
            <View style={styles.dropInfoIcons}>
              <SvgXml xml={pictureIcon} width={20} height={20} />
              <SvgXml xml={CommentIcon} width={20} height={20} />
              <SvgXml xml={HeartIcon} width={20} height={20} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  dropContainer: {
    padding: 20,
    flexDirection: "row",
    borderBottomWidth: 0.5,
  },
  dropMainContainer: {
    width: "65%",
    marginLeft: 5,
  },
  dropInfoContainer: {
    alignContent: "flex-start",
  },
  dropInfoIcons: {
    flexDirection: "row",
  },
  dropTitle: {
    color: "black",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 12,
    justifyContent: "center",
  },

  content: {
    color: "black",
    fontSize: 10,
  },

  createdAt: {
    color: "black",
    fontFamily: theme.fonts.body,
    fontSize: 8,
  },
});
