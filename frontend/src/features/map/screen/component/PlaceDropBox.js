import React, { useEffect, useState } from "react";

import { PlaceSearchBoxContainer } from "../map.screen.styles";

import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

import { SvgXml } from "react-native-svg";

import { Platform } from "react-native";
//Components

import { Text } from "../../../../components/typography/text.component";
import { theme } from "../../../../infrastructure/theme";

import { getPlaceDrops } from "../../../../services/drops/GetDrops";

//assets

import btn_arrow from "../../../../../assets/Buttons/btn_arrow";
import dropBg from "../../../../../assets/images/dropPng/drawable-xxhdpi/pin.png";
import HeartIcon from "../../../../../assets/HeartIcon";
import { elapsedTime } from "../../../../infrastructure/elapsedTime";

export const PlaceDropBox = ({ navigation, selectedPlace = {} }) => {
  const [DATA, setDATA] = useState([
    {
      content: "test content",
      createdAt: "2022-06-03T10:54:33.000Z",
      creatorPk: 2,
      emoji: {
        emoji_version: "0.7",
        icon: "😀",
        name: "중립적 인면",
        pk: 1,
        skinToneSupport: false,
        slug: "neutral_face",
        unicode_version: "0.7",
      },
      emojiPk: 1,
      images: [],
      isPrivate: false,
      pk: 7,
      placePk: 1,
      title: "test title",
    },
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await getPlaceDrops(selectedPlace.areaPk, selectedPlace.pk, setDATA);
  }, []);

  const [selectedpk, setSelectedpk] = useState(null);
  const renderPlace = ({ item }) => {
    const Drop = ({ item, textColor }) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate({
            name: "DetailScreen",
            params: { place: selectedPlace, drop: item },
          });
        }}
        style={styles.dropBox}
      >
        <View style={styles.SymbolContainer}>
          <ImageBackground source={dropBg} style={styles.dropemoji}>
            <Text style={styles.emoji}>{item.emoji.icon}</Text>
          </ImageBackground>
        </View>
        <View style={styles.dropContentContainer}>
          <View style={styles.dropTitleContainer}>
            <View style={styles.dropTitleContainer2}>
              <Text style={styles.dropTitle}>{item.title}</Text>
            </View>
            <View style={styles.DropTimeContainer}>
              <Text style={styles.dropTime}>{elapsedTime(item.createdAt)}</Text>
            </View>
          </View>
          <View style={styles.dropContentContainer}>
            <Text style={styles.dropContent}>{item.content}</Text>
            <View style={styles.dropLike}>
              <SvgXml xml={HeartIcon} width={15} height={15}></SvgXml>
              <Text style={styles.dropLikeNum}>{item.likesCount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );

    return <Drop item={item}></Drop>;
  };

  return (
    <PlaceSearchBoxContainer>
      <FlatList
        contentContainerStyle={styles.FlatListContainer}
        style={styles.placeListBox}
        horizontal={true}
        data={DATA}
        renderItem={renderPlace}
        keyExtractor={(item) => item.pk}
      ></FlatList>

      <View style={styles.FeedButtonContainer}>
        <TouchableOpacity
          onPress={(item) => {
            setSelectedpk(item.pk);
            navigation.navigate("PlaceFeedScreen", selectedPlace);
          }}
          style={styles.FeedButton}
        >
          <Text style={styles.buttonText}>게시판 더 보기 </Text>
          <SvgXml
            xml={btn_arrow}
            width={15}
            height={5}
            style={{ justifySelf: "flex-end", marginBottom: 5 }}
          ></SvgXml>
        </TouchableOpacity>
      </View>
    </PlaceSearchBoxContainer>
  );
};

const styles = StyleSheet.create({
  dropBox: {
    width: 280,
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 8,
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
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
    zIndex: 999,
  },
  SymbolContainer: {
    flex: 2,
    height: "60%",
    alignItems: "center",
  },
  dropemoji: {
    width: 26,
    height: 36,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  emoji: { marginBottom: 2 },

  dropContentContainer: {
    flex: 10,
  },
  dropTitleContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dropTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    marginTop: 10,

    color: "#2e2e2e",
    width: 100,
  },

  dropTitleContainer2: { flex: 7 },
  // eslint-disable-next-line no-dupe-keys
  dropContentContainer: { flex: 6 },
  dropContent: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    marginTop: 5,
    marginLeft: 2,
    color: "#2e2e2e",
    width: 170,
    height: 32,
    fontWeight: "600",
  },

  DropTimeContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
    marginTop: 10,
    alignItems: "center",
  },

  dropTime: {
    fontSize: 9,
    fontWeight: "700",
    color: "#808080",
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
  searchBox: {
    zIndex: 995,
    fontSize: 14,
    fontFamily: theme.fonts.body,
    width: "80%",

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
  FlatListContainer: {
    paddingLeft: 20,
  },
  placeListBox: {
    width: "100%",
    marginTop: 10,
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
    marginTop: 10,
  },
  dropLikeNum: {
    fontSize: 11,
    fontFamily: theme.fonts.bold,

    marginLeft: 2,
  },
});
