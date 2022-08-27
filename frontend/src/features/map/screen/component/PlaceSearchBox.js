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
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

import { SvgXml } from "react-native-svg";

import { Platform } from "react-native";
//Components

import { Text } from "../../../../components/typography/text.component";
import { theme } from "../../../../infrastructure/theme";
import { getPlaceData } from "../../../../services/maps/placeData";
import { getAreaDrops } from "../../../../services/drops/GetDrops";

//assets
import dropLine from "../../../../../assets/Global/dropPath.png";
import building_01 from "../../../../../assets/images/symbols_xxhdpi/building_01.png";
import icon_search from "../../../../../assets/Global/icon_search";
import btn_arrow from "../../../../../assets/Buttons/btn_arrow";
import { SearchBox } from "../../../../components/utility/SearchBox";

export const PlaceSearchBox = ({
  placeList = {},
  setPlaceList,
  selectedPlace,
  setSelectedPlace,
  navigation,
  activePolygon,
}) => {
  const [searchfield, setSearchfield] = useState("");
  const [DATA, setDATA] = useState([]);

  //searchField 구현을 위해 DATA를 나눔.
  useEffect(async () => {
    await getPlaceData(activePolygon.pk, setPlaceList);
  }, [activePolygon]);
  useEffect(() => {
    setDATA(placeList);
  }, []);

  useEffect(() => {
    const filteredPlace = DATA.filter((place) => {
      return place.name.includes(searchfield);
    });

    if (!searchfield || searchfield === "") {
      setDATA(placeList);
    }
    // if no name matches to text output
    else if (!Array.isArray(filteredPlace) && !filteredPlace.length) {
      setDATA([]);
    }
    // if name matches then display
    else if (filteredPlace.length > 0) {
      setDATA(filteredPlace);
    }
  }, [placeList, searchfield]);

  const [selectedpk, setSelectedpk] = useState(null);

  const renderPlace = ({ item }) => {
    const Place = ({ item, textColor }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedpk(item.pk);
          setSelectedPlace(item);
        }}
        style={styles.placeBox}
      >
        <View style={styles.SymbolContainer}>
          <Image source={building_01} style={styles.symbol}></Image>
        </View>
        <View style={styles.PlaceInfoContainer}>
          <View style={styles.PlaceNameContainer}>
            <View style={styles.PlaceNameContainer2}>
              <Text style={styles.PlaceName}>{item.name}</Text>
            </View>
            <View style={styles.PlaceDropNumContainer}>
              <ImageBackground source={dropLine} style={styles.PlaceDropNum}>
                <Text style={styles.PlaceDropNumber}>99</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.PlaceAddressContainer}>
            <Text style={styles.PlaceAddress}>
              서울 성북구 개운사길 60-42(개운사길 5가)
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return <Place item={item}></Place>;
  };

  return (
    <PlaceSearchBoxContainer>
      <SearchBox
        searchBoxHint={"장소를 검색해보세요"}
        setSearchfield={setSearchfield}
      ></SearchBox>
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
            navigation.navigate("AreaFeedScreen", activePolygon);
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
  placeBoxTO: {
    ...Platform.select({
      android: {
        elevation: 3,
        backgroundColor: "black",
      },
    }),
  },
  placeBox: {
    width: 200,
    height: 90,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
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

  FlatListContainer: {
    paddingLeft: 20,
  },
  placeListBox: {
    width: "100%",
    marginTop: 10,
    height: 90,
  },

  FeedButtonContainer: {
    width: "80%",
    bottom: 40,
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

  buttonText: {
    fontSize: 11,
    fontFamily: theme.fonts.bold,
    color: "#ffffff",
  },
});
