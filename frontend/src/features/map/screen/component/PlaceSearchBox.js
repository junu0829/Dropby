import React, { useEffect, useState } from "react";

import { styles, PlaceSearchBoxContainer } from "../map.screen.styles";

import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

import { SvgXml } from "react-native-svg";

//Components

import { Text } from "../../../../components/typography/text.component";
import { theme } from "../../../../infrastructure/theme";

//assets

export const PlaceSearchBox = ({
  placeList = {},
  setSelectedPlace,
  setSelectedPlaceName,
}) => {
  const [searchfield, setSearchfield] = useState("");
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    setDATA(placeList);
  }, [placeList]);

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

  //item변수를 place로 이름을 바꾸려하면 에러가 생긴다. 왜그럴까?

  const [selectedpk, setSelectedpk] = useState(null);
  const renderPlace = ({ item }) => {
    const backgroundColor = item.pk === selectedpk ? "#6e3b6e" : "#f9c2ff";
    const color = item.pk === selectedpk ? "white" : "black";

    const onPress = (item) => {
      setSelectedpk(item.pk);
      navigation.navigate("PlaceFeedScreen");
    };

    const Place = ({ item, backgroundColor, textColor }) => (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={[styless.placeBox, backgroundColor]}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );

    return (
      <Place
        item={item}
        onPress={() => {
          setSelectedpk(item.pk);
          setSelectedPlace(item.pk);
          setSelectedPlaceName(item.name);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <PlaceSearchBoxContainer>
      <TextInput
        placeholder="장소를 입력해보세요"
        onChangeText={(text) => {
          setSearchfield(text);
        }}
        backgroundColor={theme.colors.bg.secondary}
      ></TextInput>
      <FlatList
        horizontal={true}
        data={DATA}
        renderItem={renderPlace}
        keyExtractor={(item) => item.pk}
      ></FlatList>
    </PlaceSearchBoxContainer>
  );
};

export const styless = StyleSheet.create({
  placeBox: {
    width: 80,
    backgroundColor: "blue",
  },
});
