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

export const PlaceSearchBox = ({ placeList }) => {
  const [searchfield, setSearchfield] = useState("");
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    setDATA(placeList);
  }, [placeList]);

  useEffect(() => {
    const filteredPlace = DATA.filter((place) => {
      return place.name.includes(searchfield);
    });
    console.log(filteredPlace);
    if (!searchfield || searchfield === "") {
      console.log("change state");
      setDATA(placeList);
    }
    // if no name matches to text output
    else if (!Array.isArray(filteredPlace) && !filteredPlace.length) {
      console.log("장소 없음");
      setDATA([]);
    }
    // if name matches then display
    else if (filteredPlace.length > 0) {
      console.log(filteredPlace);
      setDATA(filteredPlace);
    }
  }, [placeList, searchfield]);

  // const renderItem = ({ item }) => {
  //   const backgroundColor = item.pk === selectedpk ? "#6e3b6e" : "#f9c2ff";
  //   const color = item.pk === selectedpk ? "white" : "black";

  //   const Item = ({ item, onPress, backgroundColor, textColor }) => (
  //     <TouchableOpacity
  //       onPress={onPress}
  //       style={[styless.placeBox, backgroundColor]}
  //     >
  //       <Text>{item.name}</Text>
  //     </TouchableOpacity>
  //   );

  //   return (
  //     <Item
  //       item={item}
  //       onPress={() => setSelectedpk(item.pk)}
  //       backgroundColor={{ backgroundColor }}
  //       textColor={{ color }}
  //     />
  //   );
  // };

  const [selectedpk, setSelectedpk] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.pk === selectedpk ? "#6e3b6e" : "#f9c2ff";
    const color = item.pk === selectedpk ? "white" : "black";

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity
        onPress={onPress}
        style={[styless.placeBox, backgroundColor]}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );

    return (
      <Item
        item={item}
        onPress={() => setSelectedpk(item.pk)}
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
        renderItem={renderItem}
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
