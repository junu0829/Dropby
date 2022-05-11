import React, { useState } from "react";

import { styles, PlaceSearchBoxContainer } from "../map.screen.styles";

import { View, TouchableOpacity, TextInput, FlatList } from "react-native";

import { SvgXml } from "react-native-svg";

//Components

import { Text } from "../../../../components/typography/text.component";
import { theme } from "../../../../infrastructure/theme";

//assets

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

export const PlaceSearchBox = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const [searchfield, setSearchfield] = useState("");
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
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      ></FlatList>
    </PlaceSearchBoxContainer>
  );
};
