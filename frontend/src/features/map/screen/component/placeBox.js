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

export const PlaceBox = ({
  navigation,
  selectedPlace = {},
  activePolygon = {},
}) => {
  const [searchfield, setSearchfield] = useState("");
  const [DATA, setDATA] = useState([]);

  // searchField 구현을 위해 DATA를 나눔.
  // useEffect(async () => {
  //   await getPlaceData(activePolygon.pk, setPlaceList);
  // }, [activePolygon]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await getPlaceDrops(activePolygon, selectedPlace, setDATA);
    console.log(DATA);
  }, [DATA, activePolygon, selectedPlace]);

  const [selectedpk, setSelectedpk] = useState(null);
  const renderPlace = ({ item }) => {
    const Drop = ({ item, textColor }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedpk(item.pk);
        }}
      >
        <View style={styless.placeBox}>
          <View style={styless.SymbolContainer}>
            <Image source={building_01} style={styless.symbol}></Image>
          </View>
          <View style={styless.PlaceInfoContainer}>
            <View style={styless.PlaceNameContainer}>
              <View style={styless.PlaceNameContainer2}>
                <Text style={styless.PlaceName}>{item.name}</Text>
              </View>
              <View style={styless.PlaceDropNumContainer}>
                <ImageBackground source={dropLine} style={styless.PlaceDropNum}>
                  <Text style={styless.PlaceDropNumber}>99</Text>
                </ImageBackground>
              </View>
            </View>
            <View style={styless.PlaceAddressContainer}>
              <Text style={styless.PlaceAddress}>
                서울 성북구 개운사길 60-42(개운사길 5가)
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );

    return <Drop item={item}></Drop>;
  };

  return (
    <PlaceSearchBoxContainer>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TextInput
          placeholder="장소를 입력해보세요"
          onChangeText={(text) => {
            setSearchfield(text);
          }}
          backgroundColor={theme.colors.bg.secondary}
          style={styless.searchBox}
        ></TextInput>
        <View style={styless.searchIcon}>
          <SvgXml xml={icon_search} width={17.5} height={18.5}></SvgXml>
        </View>
      </View>

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
  placeBox: {
    width: 200,
    height: 90,
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
    flex: 3,
    height: "50%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    width: 40,
    height: 40,
  },
  PlaceInfoContainer: {
    flex: 8,
  },
  PlaceNameContainer: {
    flex: 4,
    flexDirection: "row",
  },
  PlaceName: {
    fontSize: 13,
    fontFamily: theme.fonts.bold,
    marginTop: 10,
    marginLeft: 2,
    color: "#2e2e2e",
    width: 100,
    height: 30,
  },

  PlaceNameContainer2: { flex: 7 },
  PlaceAddressContainer: { flex: 6 },
  PlaceAddress: {
    fontSize: 10,
    fontFamily: theme.fonts.body,
    marginTop: 10,
    marginLeft: 2,
    color: "#2e2e2e",
    width: 100,
    height: 40,
  },
  PlaceDropNumContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
    alignItems: "center",
  },
  PlaceDropNum: {
    width: 16,
    height: 21.9,
  },
  PlaceDropNumber: {
    fontSize: 9,
    alignSelf: "center",
    fontFamily: theme.fonts.bold,
    marginTop: 9.5,
    color: "#996afc",
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
});
