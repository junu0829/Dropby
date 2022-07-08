import React, { useEffect, useState } from "react";

import { styles, PlaceSearchBoxContainer } from "../map.screen.styles";

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
import { getPlaceData } from "../../../../services/maps/placeData";
import {
  getAreaDrops,
  getPlaceDrops,
} from "../../../../services/drops/GetDrops";

//assets
import dropLine from "../../../../../assets/Global/dropPath.png";
import building_01 from "../../../../../assets/images/symbols_xxhdpi/building_01.png";
import icon_search from "../../../../../assets/Global/icon_search";
import btn_arrow from "../../../../../assets/Buttons/btn_arrow";
import dropBg from "../../../../../assets/images/dropPng/drawable-xxhdpi/pin.png";
import HeartIcon from "../../../../../assets/HeartIcon";
export const PlaceBox = ({
  navigation,
  selectedPlace = {},
  activePolygon = {},
}) => {
  const [searchfield, setSearchfield] = useState("");
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
    console.log(DATA);
  }, []);

  const [selectedpk, setSelectedpk] = useState(null);
  const renderPlace = ({ item }) => {
    const Drop = ({ item, textColor }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedpk(item.pk);
        }}
      >
        <View style={styless.dropBox}>
          <View style={styless.SymbolContainer}>
            <ImageBackground source={dropBg} style={styless.dropemoji}>
              <Text style={styless.emoji}>{item.emoji.icon}</Text>
            </ImageBackground>
          </View>
          <View style={styless.dropContentContainer}>
            <View style={styless.dropTitleContainer}>
              <View style={styless.dropTitleContainer2}>
                <Text style={styless.dropTitle}>{item.title}</Text>
              </View>
              <View style={styless.DropTimeContainer}>
                <Text style={styless.dropTime}>{item.createdAt}</Text>
              </View>
            </View>
            <View style={styless.dropContentContainer}>
              <Text style={styless.dropContent}>{item.content}</Text>
              <View style={styless.dropLike}>
                <SvgXml xml={HeartIcon} width={15} height={15}></SvgXml>
                <Text style={styless.dropLikeNum}>12</Text>
              </View>
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
        style={styless.placeListBox}
        horizontal={true}
        data={DATA}
        renderItem={renderPlace}
        keyExtractor={(item) => item.pk}
      ></FlatList>

      <View style={styless.FeedButtonContainer}>
        <TouchableOpacity
          onPress={(item) => {
            setSelectedpk(item.pk);
            navigation.navigate("AreaFeedScreen", activePolygon);
          }}
          style={styless.FeedButton}
        >
          <Text style={styless.buttonText}>게시판 더 보기 </Text>
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

const styless = StyleSheet.create({
  dropBox: {
    width: 280,
    height: 130,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 5,
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
    backgroundColor: "#ffffff",

    alignItems: "center",
  },
  dropemoji: {
    width: 26,
    height: 36,
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
  },
  DropTimeContainer: {
    flex: 4.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
    marginTop: 10,
    alignItems: "center",
  },

  dropTime: {
    fontSize: 9,
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
    marginTop: 10,
  },
  dropLikeNum: {
    fontSize: 11,
    fontFamily: theme.fonts.bold,

    marginLeft: 2,
  },
});
